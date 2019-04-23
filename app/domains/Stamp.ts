import { firestore } from "firebase/app";
import DocumentData = firestore.DocumentData;
import FieldValue = firestore.FieldValue;
import DocumentReference = firestore.DocumentReference;
import Timestamp = firestore.Timestamp;

import { User } from "./User";

interface StampDocument extends DocumentData {
  name: string;
  note: string;
  userRef: DocumentReference;
  createdAt: FieldValue | Date;
}

class Stamp implements StampDocument {
  public static getColRef() {
    return firestore().collection(`my_stamps`);
  }

  public static async create(name: string, createdAt: Date, note?: string) {
    const ownRef = User.getOwnRef();
    const newStampDoc: StampDocument & { createdAt: Date } = {
      name,
      note,
      createdAt,
      userRef: ownRef
    };
    const newStampRef = await Stamp.getColRef().add(newStampDoc);

    return new Stamp(
      newStampDoc.name,
      newStampDoc.note,
      newStampDoc.userRef,
      newStampDoc.createdAt,
      newStampRef
    );
  }

  public static async getOwns(): Promise<any> {
    const ownRef = User.getOwnRef();
    const query = Stamp.getColRef().where("userRef", "==", ownRef);
    const querySnap = await query.get();

    return querySnap.docs.map(docSnap => {
      const doc = docSnap.data() as StampDocument;

      return new Stamp(
        doc.name,
        doc.note,
        doc.userRef,
        (doc.createdAt as Timestamp).toDate(),
        Stamp.getColRef().doc(docSnap.id)
      );
    });
  }

  public constructor(
    readonly name: string,
    readonly note: string,
    readonly userRef: DocumentReference,
    readonly createdAt: Date,
    readonly ref: DocumentReference
  ) {}
}

export { Stamp, StampDocument };
