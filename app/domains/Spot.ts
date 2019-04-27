import { firestore } from "firebase/app";
import { firestore as adminFirestore } from "firebase-admin";

import DocumentData = firestore.DocumentData;
type DocumentReference =
  | firestore.DocumentReference
  | adminFirestore.DocumentReference;
type GeoPoint = firestore.GeoPoint | adminFirestore.GeoPoint;
type Db = firestore.Firestore | adminFirestore.Firestore;

import { Member } from "./Member";

interface MachiArukiStampInfo {
  member: Member;
  stampNumber: number;
  stampImageUrl: string;
}

interface SpotDocument extends DocumentData {
  name: string;
  geopoint: GeoPoint;
  machiArukiStampInfo: MachiArukiStampInfo;
}

interface ImportSpotData {
  name: string;
  geopoint: firestore.GeoPoint;
  machiArukiStampInfo: {
    member: Member;
    stampNumber: number;
    stampImageUrl: string;
  };
}

class Spot implements SpotDocument {
  public static getColRef(db: Db) {
    return db.collection(`spots`);
  }

  public static async getAll(db: Db) {
    const query = await Spot.getColRef(db).get();

    const stamps = [];
    for (const snap of query.docs) {
      const doc = snap.data() as SpotDocument;
      const { name, geopoint, machiArukiStampInfo } = doc;

      stamps.push(new Spot(snap.ref, name, geopoint, machiArukiStampInfo));
    }

    return stamps;
  }

  public static async import(data: ImportSpotData[], db: Db) {
    const batch = db.batch();
    console.log("create batch instance to import.");

    for (const spotData of data) {
      const { name, geopoint, machiArukiStampInfo } = spotData;
      const { member, stampNumber, stampImageUrl } = machiArukiStampInfo;
      console.log(`spot: ${name}`);

      // Spot
      const spotDoc: Partial<SpotDocument> = {
        name,
        geopoint,
        machiArukiStampInfo: { member, stampNumber, stampImageUrl }
      };
      console.log("create document data.", spotDoc);

      const spotSnap = await Spot.getColRef(db)
        .where("name", "==", name)
        .get();
      const spotRef = spotSnap.empty
        ? Spot.getColRef(db).doc()
        : spotSnap.docs[0].ref;

      if (spotSnap.empty) {
        console.log("query ref of is empty. create new doc ref.");

        // @ts-ignore
        batch.set(spotRef, spotDoc);
      } else {
        // @ts-ignore
        batch.update(spotRef, spotDoc);
      }

      console.log(`set update in batch transaction. spot: ${spotRef.path}`);
    }

    await batch.commit();
  }

  public constructor(
    readonly ref: DocumentReference,
    readonly name: string,
    readonly geopoint: firestore.GeoPoint,
    readonly machiArukiStampInfo: MachiArukiStampInfo
  ) {}
}

export { Spot, SpotDocument, ImportSpotData };
