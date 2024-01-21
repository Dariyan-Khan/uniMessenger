// import { createContext, useEffect, useState } from "react";
// import { FIREBASE_AUTH, FIRESTORE_DB } from "../FirebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from 'firebase/firestore';

// export const FSContext = createContext();

// export const FSContextProvider = ({ children }) => {
//   const [currentFS, setCurrentFS] = useState({});

//   useEffect(() => {
//     const  unsub = onAuthStateChanged(FIREBASE_AUTH, (user) => {
//       if (user.emailVerified){
//         docRef = doc(FIRESTORE_DB, "users", user.uid);
//         getDoc(docRef).then((docSnap) => {
//           setCurrentFS(docSnap.data());
//         });
//       }
//     });

//     return () => {
//       unsub();
//     };
//   }, []);

//   return (
//     <FSContext.Provider value={{ currentFS }}>
//       {children}
//     </FSContext.Provider>
//   );
//};