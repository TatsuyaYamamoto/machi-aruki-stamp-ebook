import { firestore } from "firebase/app";
import DocumentData = firestore.DocumentData;

interface StoreStampDocument extends DocumentData {
  name: string;
  description: string;
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
      stamps.push(new StoreStamp(doc.name, doc.description));
    }

    return stamps;
  }

  public constructor(readonly name: string, readonly description: string) {}
}

export { StoreStamp, StoreStampDocument };
