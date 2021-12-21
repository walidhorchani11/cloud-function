// Import the functions you need from the SDKs you need
import { initializeApp, getApp  } from "firebase/app";
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEVZ49EU-N8Ohps5mDdwd2VCdLM672-No",
  authDomain: "cloud-function-7a00f.firebaseapp.com",
  projectId: "cloud-function-7a00f",
  storageBucket: "cloud-function-7a00f.appspot.com",
  messagingSenderId: "591184595916",
  appId: "1:591184595916:web:808f9f891e40ed6b09ab69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// INItialise service like firestore
const db = getFirestore(app);

// // get collection  reference
// const refCol = collection(db,'books');

// // get docs
// let books = [];
// getDocs(refCol).then((snapshot) => {
// console.log("🚀 ~ file: index.js ~ line 28 ~ getDocs ~ snapshot", snapshot)
// snapshot.docs.forEach((doc) => {
//   books.push({...doc.data(), id: doc.id})
// })
// console.log('boooooooooks', books);
  
// }).catch((error)=> {
// console.log("🚀 ~ file: index.js ~ line 31 ~ getDocs ~ error", error)
  
// })

const getData = async(db, key) => {
  try {
    // reference to collection
    const refCol = collection(db,key);

    // get docs from ref collection
    const snapshots = await getDocs(refCol);
    console.log("🚀 ~ file: index.js ~ line 47 ~ getData ~ snapshots", snapshots)
    const data = snapshots.docs.map((doc)=> {
      return {...doc.data(), id: doc.id}
    })

    return data;
  } catch (error) {
  console.log("🚀 ~ file: index.js ~ line 53 ~ getData ~ error", error)
    
  }

  
}

getData(db, 'books').then((res) => {
console.log("🚀 ~ file: index.js ~ line 63 ~ getData ~ books data", res)

})


// getData(db, 'cars').then((res) => {
//   console.log("🚀 ~ file: index.js ~ line 63 ~ getData ~ cars data", res)
  
//   })

const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 5001);

const saveComment = httpsCallable(functions, 'saveComment')
const btn = document.getElementById('id1');
btn.addEventListener('click', () => {
  saveComment().then(() => console.log('banajir janjouna')).catch((error) => console.log('error', error))
})
