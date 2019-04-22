import { firestore } from "firebase/app";
import FieldValue = firestore.FieldValue;
import DocumentReference = firestore.DocumentReference;

import { User } from "./User";

interface StampDocument {
  name: string;
  note: string;
  userRef: DocumentReference;
  createdAt: FieldValue | Date;
}

class Stamp implements StampDocument {
  public static getColRef() {
    return firestore().collection(`stamps`);
  }

  public static async create(name: string, createdAt: Date, note?: string) {
    const ownRef = User.getOwnRef();
    const newStampDoc: StampDocument = {
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
    const ref = Stamp.getColRef().where("userRef", "==", ownRef);
    return ref.get();
  }

  public constructor(
    readonly name: string,
    readonly note: string,
    readonly userRef: DocumentReference,
    readonly createdAt: FieldValue | Date,
    readonly ref: DocumentReference
  ) {}
}

export { Stamp, StampDocument };
