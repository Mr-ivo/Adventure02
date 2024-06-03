import React from 'react'
import { FaStar, FaMoon } from 'react-icons'
import styles from "./toggle.module.css"

function toggle() {

    const myComponent = () => {
        const { theme,toggleTheme } = useTheme();  
  return (
    <div className={styles.theme-toggle} onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon classNames={styles.moon-icon} /> : <FaStar
         classNames={styles.star-icon} />}
          </div>

          
       
  
  );
};
};

export default toggle