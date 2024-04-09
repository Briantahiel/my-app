import Link from "next/link";
import styles from "../(blogContent)/blog.module.css";

export default function NavbarBlog() {
    return (
        <div className={styles.sidebar}>
        <h2>Blog</h2>
        <ul>
          <li>
            <Link href="/blog/tutoriales">
              Tutoriales
            </Link>
          </li>
          <li>
            <Link href="/blog/recursos">
              Recursos
            </Link>
          </li>
          <li>
            <Link href="/blog/proyectos">
              Proyectos
            </Link>
          </li>
          <li>
            <Link href="/blog/desarrollo">
              Desarrollo
            </Link>
          </li>
        </ul>
        </div>
    )
}