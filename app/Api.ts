import * as express from "express";
import { firestore } from "firebase-admin";
import { Base64 } from "js-base64";
import { parseString } from "xml2js";

import { ImportSpotData, Spot } from "./domains/Spot";
import { from as fromName } from "./domains/Member";

import { withCatching } from "./utils/functions";

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
    console.log("base64 kml file is decoded.");

    const importData = parseKmlToImportSpotData(kmlJson);
    console.log(`${importData.length} spots docs are created`);

    await Spot.import(importData, firestore());
    console.log(`spots are imported`);

    res.json({});
  })
);

const parseKmlToImportSpotData = (kmlJson: any): ImportSpotData[] => {
  for (const folder of kmlJson.kml.Document[0].Folder) {
    if (!folder.Placemark) {
      console.log("ignore folder element having no placemark");
      continue;
    }

    const spots: ImportSpotData[] = [];
    let stampNumber = 0;
    for (const placeMark of folder.Placemark) {
      stampNumber += 1;

      const name = placeMark.name[0];
      const memberName = placeMark.description[0]
        .replace(/.*メンバー／/, "")
        .replace(/住所.+/, "")
        .replace(/<br>/, "")
        .trim();
      const member = fromName(memberName);

      const stampImageUrl = placeMark.ExtendedData[0].Data[0].value[0];
      const coordinates = placeMark.Point[0].coordinates[0].trim().split(",");
      const latitude = Number(coordinates[1]);
      const longitude = Number(coordinates[0]);

      spots.push({
        name,
        geopoint: new firestore.GeoPoint(latitude, longitude),
        machiArukiStampInfo: {
          member,
          stampNumber,
          stampImageUrl
        }
      });
    }

    return spots;
  }
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
