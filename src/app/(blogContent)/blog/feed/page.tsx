"use client";
import { useEffect, useState } from "react";
import {
  collection,
  serverTimestamp,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseConfig";
import { useAuth } from "@/context";
import BlogLayout from "../../blogLayout";
import styles from "../../../page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categorias = [
  "Animales",
  "Arte",
  "Automóviles",
  "Ciencia",
  "Cine",
  "Deportes",
  "Diseño",
  "Economía",
  "Educación",
  "Entretenimiento",
  "Finanzas",
  "Fotografía",
  "Gastronomía",
  "Historia",
  "Literatura",
  "Medio Ambiente",
  "Moda",
  "Música",
  "Negocios",
  "Política",
  "Religión",
  "Salud",
  "Tecnología",
  "Viajes",
  "Otros",
];

export default function Posteos() {
  const { user, deletePost } = useAuth();
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [comentarios, setComentarios] = useState<boolean>(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribePosts = onSnapshot(collection(db, "posteos"), (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postData);
    });

    const unsubscribeUsers = onSnapshot(collection(db, "usuarios"), (snapshot) => {
      const userData = snapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    });

    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, []);

  const addData = async () => {
    if (!user) {
      alert("Debes iniciar sesión para cargar un post.");
      return;
    }

    if (!titulo || !descripcion || !categoria) {
      alert("Por favor, completa todos los campos antes de cargar el post.");
      return;
    }

    try {
      await addDoc(collection(db, "posteos"), {
        titulo: titulo,
        descripcion: descripcion,
        comentarios: comentarios,
        fecha: serverTimestamp(),
        categoria: categoria,
        userId: user.userId,
      });
      setTitulo("");
      setDescripcion("");
      setCategoria("");
      setComentarios(false);
      router.refresh();
      alert("Post cargado correctamente");
    } catch (error) {
      alert("Error al cargar el post: " + error);
    }
  };

  return (
    <BlogLayout>
      <div className={styles.container}>
        {user ? (
          <div className={styles.containerCreatePost}>
            <h2 className={styles.title}>Crear nuevo post</h2>
            <label className={styles.formLabel}>
              Título:
              <input
                className={styles.formInput}
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </label>
            <label className={styles.formLabel}>
              Descripción:
              <textarea
                className={styles.formInput}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </label>
            <label className={styles.formLabel}>
              Categoría:
              <select
                className={styles.formInput}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <button className={styles.submitBtn} onClick={addData}>
              Crear post
            </button>
          </div>
        ) : (
          <p className={styles.loginMessage}>
            Debes iniciar sesión para ver y postear.
          </p>
        )}
        <div>
          {posts.map((post) => (
            <div key={post.id} className={styles.container_post}>
              <h2>{post.titulo}</h2>
              <p>{post.descripcion}</p>
              <p>Categoría: {post.categoria}</p>
              <p>
                Autor:{" "}
                {users.find((u) => u.userId === post.userId)?.nombre || "Usuario desconocido"}
              </p>
              <Link href={`/blog/feed/${post.id}`} className={styles.link_padding}>
                Ver más
              </Link>
              {user && post.userId === user.userId ? (
                <button onClick={() => deletePost(post.id)}>Eliminar</button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </BlogLayout>
  );
}
