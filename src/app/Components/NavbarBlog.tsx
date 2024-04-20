"use client"
import Link from "next/link";
import styles from "../(blogContent)/blog.module.css";
import { useAuth } from "@/context";


export default function NavbarBlog() {
  const { user } = useAuth();
 
    return (
        <div className={styles.navbar}>
        <ul>
          <li>
            <Link href="/blog/feed">
              {user ? 'Publicar' : 'Posteos'}
            </Link>
          </li>
          <li>
            <Link href="/blog/informacion">
              Más Info
            </Link>
          </li>
        </ul>
        </div>
    )
}