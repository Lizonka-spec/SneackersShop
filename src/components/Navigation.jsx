import { NavLink } from "react-router";
import styles from "../styles/nav.module.css";
import "../App.css";
import { PiSneakerMoveFill } from "react-icons/pi";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

export const Navigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo__content}>
        <img
          className={styles.logo}
          src="../../public/photo_2026-01-25_14-19-23.jpg"
          alt=""
        />
        <div className={styles.text__content}>
          <span className={styles.text__shopName}>REACT SNEACKERS</span>
          <span className={styles.text__bottom}>the best sneaker store</span>
        </div>
      </div>
      <nav className={styles.nav}>
        <NavLink className={styles.nav__links} to="/" end>
          Catalog <PiSneakerMoveFill />
        </NavLink>
        <NavLink className={styles.nav__links} to="/cart" end>
          Cart <FaShoppingCart />
        </NavLink>
        <NavLink className={styles.nav__links} to="/wishlist" end>
          Wishlist <FaHeart />
        </NavLink>
        <NavLink className={styles.nav__links} to="/auth">
          Account <MdAccountCircle />
        </NavLink>
      </nav>
    </header>
  );
};
