"use client";
import Link from "next/link";
import styles from "../page.module.css";
import { useAuth } from "@/context";
import { auth } from "../firebase/firebaseConfig";
import Image from "next/image";
import logo from "../../../public/blogify.png";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
export default function Navbar() {
  const { user, signOut } = useAuth();
  const [isLoggedin, setIsLoggedin] = useState<any>(user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <>
    <nav className="navbar navbar-expand">
    <div className="container-fluid">
      <Image
        src={logo}
        alt="Descripción de la imagen"
        width={120}
        height={120}
        objectFit="cover"
      />
      <div id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto mb-lg-0">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
          </li>
          <li className="nav-item">
            {!isLoggedin ? (
              <Link href="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <button className={`btn btn-link ${styles['custom-button']}`} onClick={signOut}>
                Log out
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</>
  );
}
