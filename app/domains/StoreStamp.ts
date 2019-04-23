import { firestore } from "firebase/app";
import DocumentData = firestore.DocumentData;

interface StoreStampDocument extends DocumentData {
  name: string;
  description: string;
  imageUrl: string;
  geopoint: firestore.GeoPoint;
}

class StoreStamp implements StoreStampDocument {
  public static getColRef() {
    return firestore().collection(`master_store_stamps`);
  }

  public static async getAll() {
    const query = await StoreStamp.getColRef().get();

    const stamps = [];
    for (const snap of query.docs) {
      const doc = snap.data() as StoreStampDocument;
      const { name, description, imageUrl, geopoint } = doc;

      stamps.push(new StoreStamp(name, description, imageUrl, geopoint));
    }

    return stamps;
  }

  public constructor(
    readonly name: string,
    readonly description: string,
    readonly imageUrl: string,
    readonly geopoint: firestore.GeoPoint
  ) {}
}

export { StoreStamp, StoreStampDocument };
