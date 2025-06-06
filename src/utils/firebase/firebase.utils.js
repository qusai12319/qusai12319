import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  
} from 'firebase/auth'
import { getFirestore, doc,getDocs ,getDoc, setDoc,collection,writeBatch,query } from 'firebase/firestore'

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCS0ldOZN6HQp1lcnxWKMosj5WBFXE5zlw",
  authDomain: "crwn-clothing2-13f9d.firebaseapp.com",
  projectId: "crwn-clothing2-13f9d",
  storageBucket: "crwn-clothing2-13f9d.appspot.com",
  messagingSenderId: "445359758747",
  appId: "1:445359758747:web:f24b8b14a4afd9716e153e",
  measurementId: "G-86YRBMR5DV"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Auth and Firestore instances
export const auth = getAuth();
export const db = getFirestore();
//adding data to firebase
export const addCollectionAndDocuments=async (collectionKey,objectsToAdd)=>{
  const collectionRef=collection(db,collectionKey);
  const batch=writeBatch(db)
  objectsToAdd.forEach((object)=>{
    const docRef=doc(collectionRef,object.title.toLowerCase()  )
    batch.set(docRef,object)
  })
  await batch.commit()
}

export const getCategoriesAndDocuments=async()=>{
  const collectionRef=collection(db,'categories')
  const q=query(collectionRef);
  const querySnapshot=await getDocs(q)
  const categoryMap=querySnapshot.docs.reduce((acc,docSnapshot)=>{
    const {title,items}=docSnapshot.data();
    acc[title.toLowerCase()]=items;
    return acc
  },{})
  return categoryMap

}


// Google sign-in
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Create user document in Firestore
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating the document in Firestore:', error.message);
    }
  }

  return userDocRef;
};

// Email & password registration
export const createUserWithEmailAndPasswordAuth = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Email & password sign-in
export const signInWithEmailAndPasswordAuth = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out
export const signOutAuthUser = async () => await signOut(auth);

// Auth state listener
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
