import * as express from "express";
import { firestore } from "firebase-admin";
import { Base64 } from "js-base64";
import { parseString } from "xml2js";

const withCatching = (handler: express.RequestHandler) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.RequestHandler => {
  return handler(req, res, next).catch((e: Error) => {
    console.error(e);

    next(e);
  });
};

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({ root: true });
});

apiRouter.post(
  "/map",
  withCatching(async (req, res) => {
    const { kmlBase64 } = req.body;

    if (!kmlBase64) {
      console.log("received request has no knl file. return 400");
      res.status(400).json({
        message: "no kml file"
      });
      return;
    }

    const kmlJson = await base64ToJson(kmlBase64);
    console.log("base64 kml file is parsed.");

    await clearCollection(`master_store_stamps`);
    console.log(`clear master_store_stamps collection`);

    const stamps = [];

    for (const folder of kmlJson.kml.Document[0].Folder) {
      if (!folder.Placemark) {
        console.log("ignore folder element having no placemark");
        continue;
      }

      let stampNumber = 0;
      for (const placeMark of folder.Placemark) {
        stampNumber += 1;

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
          stampNumber,
          name,
          description,
          imageUrl,
          geopoint: new firestore.GeoPoint(latitude, longitude)
        });
      }
    }

    console.log(`${stamps.length} stamp docs are created`);

    const batch = firestore().batch();

    for (const stamp of stamps) {
      const newMasterStoreStampRef = firestore()
        .collection(`master_store_stamps`)
        .doc();
      batch.create(newMasterStoreStampRef, stamp);
    }

    await batch.commit();
    console.log(`creation of new master_store_stamps documents  `);

    res.json({});
  })
);

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
