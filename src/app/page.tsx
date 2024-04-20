import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h4>Blogify</h4>
      <p>Blogify nace con la idea de permitir conectar con las personas, sus ideas e intereses. <br/>
        Buscando así crear una comunidad donde personas de todo el mundo puedan interacturar entre 
        si a través de sus historias, publicaciones y proyectos.
        En principio se permite a un usuario registrarse y así poder ingresar en la plataforma, compartir lo que tienen que 
        para contar y en un futuro permitir a esas personas comentar las publicaciones, opinar y 
        dejar su apoyo</p>
    </main>
  );
}
