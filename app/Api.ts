import * as express from "express";
import { firestore } from "firebase-admin";
import { Base64 } from "js-base64";
import { parseString } from "xml2js";

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ root: true });
});

apiRouter.post("/map", async (req, res) => {
  // The raw bytes of the upload will be in req.rawBody. Send it to
  // busboy, and get a callback when it's finished.

  const { kmlBase64 } = req.body;

  if (!kmlBase64) {
    res.status(400).json({
      message: "no kml file"
    });
    return;
  }

  const kmlJson = await base64ToJson(kmlBase64);
  const stamps = [];

  await clearCollection(`master_store_stamps`);

  for (const folder of kmlJson.kml.Document[0].Folder) {
    if (!folder.Placemark) {
      console.log("this folder item has no placeMark element");
      continue;
    }

    for (const placeMark of folder.Placemark) {
      const name = placeMark.name[0];
      const description = placeMark.description[0]
        .replace(/<img.*\/>/, "")
        .replace(/<br>/g, " ")
        .trim();
      const imageUrl = placeMark.ExtendedData[0].Data[0].value[0];
      const coordinates = placeMark.Point[0].coordinates[0].trim().split(",");
      const latitude = Number(coordinates[1]);
      const longitude = Number(coordinates[0]);

      stamps.push({
        name,
        description,
        imageUrl,
        geopoint: new firestore.GeoPoint(latitude, longitude)
      });
    }
  }

  console.log(`${stamps.length} stamps is loaded.`);

  const batch = firestore().batch();

  for (const stamp of stamps) {
    const newMasterStoreStampRef = firestore()
      .collection(`master_store_stamps`)
      .doc();
    batch.create(newMasterStoreStampRef, stamp);
  }

  await batch.commit();

  res.json({ knl: true });
});

/**
 * Clear collection
 *
 * @link https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=ja
 */
const clearCollection = (collectionPath: string, batchSize = 100) => {
  const collectionRef = firestore().collection(collectionPath);
  const query = collectionRef.orderBy("__name__").limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, batchSize, resolve, reject);
  });
};

const deleteQueryBatch = (
  query: firestore.Query,
  batchSize: number,
  resolve: () => void,
  reject: () => void
) => {
  query
    .get()
    .then(snapshot => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      const batch = firestore().batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    })
    .then(numDeleted => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(query, batchSize, resolve, reject);
      });
    })
    .catch(reject);
};

const base64ToJson = (base64Text: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const kmlString = Base64.decode(base64Text);
    parseString(kmlString, (err: Error, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

export default apiRouter;
