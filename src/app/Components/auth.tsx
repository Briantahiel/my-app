
// Autenticación mediante Google
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { collection, addDoc } from "firebase/firestore";
// import { app, db } from "../firebase/firebaseConfig";

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(auth, provider);
//         const user = result.user;
//         await addDoc(collection(db, "usuarios"), {
//             uid: user.uid,
//             displayName: user.displayName
//         });

//         alert("Hola " + user.displayName);
//     } catch (error) {
//         console.error('Error al iniciar sesión con Google:', error);
//     }
// };

// export { auth, signInWithGoogle };

