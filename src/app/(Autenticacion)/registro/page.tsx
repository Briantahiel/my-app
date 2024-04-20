"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import Link from "next/link";
import styles from "../../page.module.css";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Registrar usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Actualizar el perfil del usuario con el nombre de usuario
      await updateProfile(userCredential.user, { displayName });
      setEmail("");
      setPassword("");
      setDisplayName("");

      // Obtener el ID del usuario para utilizarlo en la colección donde almacenarás su nombre
      const userId = userCredential.user.uid;

      // Utilizar el UID como ID del documento en Firestore
      // Se crea la colección usuarios en firebase ya que la autenticación sólo permite email y password
      await setDoc(doc(db, "usuarios", userId), {
        correo: email,
        nombre: displayName,
        userId: userId,
      });

      console.log("Usuario registrado exitosamente:", userCredential.user);
      router.push("/blog");
    } catch (err) {
      console.error(err);
      alert(
        "Error al crear el usuario. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };
  return (
    <>
      <div className={styles.containerLoginRegister}>
        <h2 className={styles.title}>Registrate</h2>
        <label className={styles.formLabel}>
          Nombre:
          <input
            className={styles.formInput}
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label className={styles.formLabel}>
          Correo:
          <input
            className={styles.formInput}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.formLabel}>
          Contraseña:
          <input
            className={styles.formInput}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className={styles.submitBtn} onClick={handleRegister}>
          Registrarse
        </button>
        <p>
          Ya tienes cuenta?{" "}
          <Link href="/login" className={styles.registerLink}>
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
