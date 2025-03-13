import { NavLink } from "react-router-dom";
import styles from "./PageNavigator.module.css";

const PageNavigator: React.FC = () => {
  return (
    <div className={styles.navWrapper}>
      <nav className={styles.navigations}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink className={styles.navLink} to="/" end>
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink className={styles.navLink} to="/Users" end>
              Users
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink className={styles.navLink} to="/Products" end>
              Products
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink className={styles.navLink} to="/Reviews" end>
              Reviews
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default PageNavigator;