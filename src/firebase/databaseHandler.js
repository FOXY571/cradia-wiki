import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Fetches all documents from a specified Firestore collection and returns them as an array of objects, each containing the document ID and its data.
 *
 * @param {string} collectionName - The name of the Firestore collection to fetch.
 * @returns {Promise<Object[]>} A promise that resolves to an array of objects, where each object has an 'id' property (the document ID) and the rest of the document data as properties.
 */
export async function getCollection(collectionName) {
  const colRef = collection(db, collectionName)
  const snapshot = await getDocs(colRef)

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

/**
 * Fetches a single document from a specified Firestore collection by its ID and returns it as an object containing the document ID and its data.
 *
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} docId - The ID of the document to fetch.
 * @returns {Promise<Object|null>} A promise that resolves to an object with the document ID and data, or null if the document does not exist.
 */
export async function getDocument(collectionName, docId) {
  const docRef = doc(db, collectionName, docId)
  const snapshot = await getDoc(docRef)

  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}
