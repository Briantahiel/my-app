"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import styles from "../../../blog.module.css";

export default function PostDetails({ params }: { params: { postId: string } }) {
  const { posts } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [author, setAuthor] = useState<string>("Usuario desconocido");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPostAndAuthor = async () => {
      const post = posts.find((post) => post.id === params.postId);
      if (post) {
        const userDoc = await getDoc(doc(db, "usuarios", post.userId));
        if (userDoc.exists()) {
          setAuthor(userDoc.data().nombre);
        }
        setPost(post);
      }
      setIsLoading(false);
    };

    fetchPostAndAuthor();
  }, [params.postId, posts]);

  if (isLoading) {
    return <p className={styles.loading}>Cargando...</p>;
  }

  return (
    <div className={styles.container}>
      {post ? (
        <>
          <h1 className={styles.title}>{post.titulo}</h1>
          <p className={styles.description}>{post.descripcion}</p>
          <p className={styles.category}>Categoría: {post.categoria}</p>
          <p className={styles.author}>Autor: {author}</p>
        </>
      ) : (
        <p className={styles.notFound}>El post no fue encontrado.</p>
      )}
    </div>
  );
}
