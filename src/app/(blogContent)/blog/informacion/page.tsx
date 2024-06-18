import BlogLayout from "../../blogLayout";
import styles from "../../blog.module.css";

export default function recursos() {
  return (
    <BlogLayout>
      <div className={styles.container}>
        <h2>Más sobre el proyecto</h2>
        Este proyecto forma parte del proyecto de Hedy Software en el área de Desarrollo web con Nextjs
      </div>
    </BlogLayout>
  );
}
