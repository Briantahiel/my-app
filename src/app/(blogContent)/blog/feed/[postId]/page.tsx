"use client";
import { useAuth } from "@/context";
import styles from "../../../blog.module.css";

export default function PostDetails({
  params,
}: {
  params: { postId: string };
}) {
  const { posts } = useAuth();
  const post = posts.find((post) => post.id === params.postId);

  return (
    <>
      <div className={styles.container}>
        {post ? (
          <>
            <h1 className={styles.title}>{post.titulo}</h1>
            <p className={styles.description}>{post.descripcion}</p>
            <p className={styles.category}>Categoría: {post.categoria}</p>
            <p className={styles.author}>Autor: {post.nombreUsuario}</p>
          </>
        ) : (
          <p className={styles.notFound}>El post no fue encontrado.</p>
        )}
      </div>
    </>
  );
}
