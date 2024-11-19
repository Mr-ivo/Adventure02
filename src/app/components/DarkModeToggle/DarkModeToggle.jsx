"use client";
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { ThemeContext } from '@/app/context/ThemeContext';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = () => {
  const { toggleMode, mode } = useContext(ThemeContext);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <div 
      className={styles.toggle} 
      onClick={toggleMode}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div 
        className={styles.toggleTrack}
        animate={{
          backgroundColor: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(219, 234, 254)'
        }}
      >
        <div className={styles.iconWrapper}>
          <Sun 
            size={12} 
            className={styles.sunIcon}
            strokeWidth={3}
          />
        </div>
        <div className={styles.iconWrapper}>
          <Moon 
            size={12} 
            className={styles.moonIcon}
            strokeWidth={3}
          />
        </div>
        <motion.div
          className={styles.toggleThumb}
          layout
          transition={spring}
          animate={{
            backgroundColor: mode === 'dark' ? 'rgb(14, 165, 233)' : 'rgb(59, 130, 246)',
            x: mode === 'dark' ? 20 : 0,
          }}
        />
      </motion.div>
    </div>
  );
};

export default DarkModeToggle;