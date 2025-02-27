import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import styles from './NavBar.module.css';

const NavBar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className={`${styles.navbar} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.left}>
        <img src="/cvbuilder.jpg" alt="Logo" className={styles.logo} />
        <span className={styles.title}>CV Builder</span>
      </div>
      <div className={styles.right}>
        <button onClick={toggleDarkMode} className={styles.toggleButton}>
          {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;