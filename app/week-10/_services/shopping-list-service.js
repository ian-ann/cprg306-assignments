import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export const getItems  = async (userId ) => {

    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return itemsList;
};

export const addItems = async (item) => {

    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemRef = await addDoc(itemsCollection, item);
    return itemRef.id;
}