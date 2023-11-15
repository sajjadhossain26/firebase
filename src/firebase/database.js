import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from ".";

const db = getFirestore(firebaseApp);

// Create firebase data

export const createDoc = async (dbName, data) => {
  return await addDoc(collection(db, dbName), {
    ...data,
  });
};

// Get firebase data
export const getRealTimeData = async (dbName, stateName) => {
  onSnapshot(
    query(collection(db, dbName), orderBy("createdAt", "desc")),
    (snapshot) => {
      const dataList = [];
      snapshot.docs.forEach((item) => {
        dataList.push({ ...item.data(), id: item.id });
      });

      stateName(dataList);
    }
  );
};

// Delete firebase data

export const deleteData = async (dbName, id) => {
  await deleteDoc(doc(db, dbName, id));
};
