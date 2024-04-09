import BlogLayout from "../../blogLayout";
import styles from "../../blog.module.css";

export default function tutoriales() {
  return (
    <BlogLayout>
      <div className={styles.container}>
        <h2>Sección tutoriales</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id suscipit
        mauris. Aenean eleifend, dolor sit amet lobortis eleifend, mi nisl
        iaculis mi, eu molestie odio enim id mauris. Cras sodales tortor non mi
        sodales, vel feugiat tortor consequat. Duis fringilla quam a ultricies
        malesuada. Duis ut mauris at sapien fringilla efficitur. Suspendisse
        potenti. Sed nec pretium quam. Vestibulum at lacinia lorem. Integer quis
        tristique mi. Vestibulum eu nunc fringilla, accumsan risus vel, vehicula
        mauris. Cras auctor tortor vitae nibh fermentum, nec vehicula nunc
        aliquet. Curabitur quis tincidunt magna. Nam eu felis vitae eros
        volutpat fermentum.
      </div>
    </BlogLayout>
  );
}
