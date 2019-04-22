import { firestore, auth, User as FirebaseUser } from "firebase/app";
import FieldValue = firestore.FieldValue;

interface UserDocument {
  createdAt: FieldValue | Date;
}

class User implements UserDocument {
  public static getColRef() {
    return firestore().collection(`users`);
  }

  public static async exists(id: string): Promise<boolean> {
    const snap = await User.getColRef()
      .doc(id)
      .get();
    return snap.exists;
  }

  public static async create(user: FirebaseUser) {
    if (await User.exists(user.uid)) {
      console.log("already registered.");
      return;
    }

    await User.getColRef()
      .doc(user.uid)
      .set({
        createdAt: firestore.FieldValue.serverTimestamp()
      });
    console.log("new user is created.");
  }

  public static getOwnRef() {
    const user = auth().currentUser;
    return firestore()
      .collection(`users`)
      .doc(`${user.uid}`);
  }

  public constructor(readonly createdAt: FieldValue | Date) {}
}

export { User, UserDocument };
