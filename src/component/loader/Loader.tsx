import styles from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles["spinner"]}>
      <div className={`${styles["animation"]} ${styles["bounce1"]}`}></div>
      <div className={`${styles["animation"]} ${styles["bounce2"]}`}></div>
      <div className={styles["animation"]}></div>
    </div>
  );
};
