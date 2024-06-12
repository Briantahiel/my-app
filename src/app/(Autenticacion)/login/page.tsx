"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../../page.module.css";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      setEmail("");
      setPassword("");
      router.refresh();
      router.push("/blog");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className={styles.containerLoginRegister}>
      <h2 className={styles.title}>Inicia sesión</h2>
      <form onSubmit={handleLogin}>
        <label className={styles.formLabel}>
          Correo:
          <input
            className={styles.formInput}
            placeholder="email@example.com"
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
            placeholder="Mínimo 6 caracteres"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className={styles.submitBtn} type="submit">
          Logueate
        </button>
      </form>
      <p>
        No tienes cuenta?{" "}
        <Link href="/registro" className={styles.registerLink}>
          Registrate
        </Link>
      </p>
    </div>
  );
}
