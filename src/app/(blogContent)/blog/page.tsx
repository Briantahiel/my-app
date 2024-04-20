"use client";
import { useAuth } from "@/context";
import BlogLayout from "../blogLayout";
import { auth } from "@/app/firebase/firebaseConfig";
import styles from "../../page.module.css";
import Image from "next/image";
import background from "../../../../public/backgroundHome.jpg";

export default function Blog() {
  const { user, users, posts } = useAuth();
  const currentUser = auth.currentUser;

  return (
    <BlogLayout>
      <div className={styles.container_blog}>
        <div className={styles.container}>
          <h2 className={styles.title}>Blogify</h2>
          {currentUser && user ? (
            <>
              <h5 className={styles.welcomeMessage}>
                Hola {currentUser.displayName}!
              </h5>
              <p>
                Bienvenido a tu Blog, un lugar para compartir tus ideas y
                experiencias con el mundo.
              </p>
            </>
          ) : (
            <>
              <p>
                Explora los últimos posteos y sé parte de nuestra comunidad.
              </p>
              <p>Logueate y comienza a interactuar con la red</p>
            </>
          )}
        </div>
        <div>
          <Image
            src={background}
            alt="Descripción de la imagen"
            width={320}
            height={320}
            objectFit="cover"
          />
        </div>
      </div>
    </BlogLayout>
  );
}
