import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc} from "firebase/firestore";

    
export const getItems  = async (userId ) => {

    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemsSnapshot = await getDocs(itemsCollection);
    const itemsList = itemsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return itemsList;
};

export const addItems = async (userId, item) => {
    const { id, ...itemWithoutId } = item; // Exclude the id field
    const itemsCollection = collection(db, `users/${userId}/items`);
    const itemRef = await addDoc(itemsCollection, itemWithoutId);
    return itemRef;
}

export const deleteItem = async (userId, itemId) => {
    console.log(`Attempting to delete item with ID: ${itemId} for user: ${userId}`);
    const itemDoc = doc(db, `users/${userId}/items/${itemId}`);
    console.log(`Document reference: ${itemDoc.path}`);
    try {
        await deleteDoc(itemDoc);
        console.log(`Successfully deleted item with ID: ${itemId}`);
    } catch (error) {
        console.error(`Failed to delete item with ID: ${itemId}`, error);
    }
};