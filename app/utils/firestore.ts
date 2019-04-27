import { firestore } from "firebase/app";

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

export { clearCollection };
