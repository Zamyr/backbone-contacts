import styles from "../../styles/Header.module.css";
import { Container } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.nav}>
          <div>
            <Link href={"/"}>
              <p className={styles.menuTitle}>Backbone Contacts</p>
            </Link>
          </div>
          <div className={styles.linkBox}>
            <Link href={"/"}>Inicio</Link>
            <Link href={"/contacts/create"}>Create Contact</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
