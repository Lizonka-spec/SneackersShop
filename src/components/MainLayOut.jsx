import { Footer, Navigation } from "./index";
import styles from "../styles/main.module.css";
export const MainLayOut = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navigation />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
