'use client';
import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import styles from './LanguageSwitch.module.css';

const LanguageSwitch = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();

  return (
    <div className={styles.languageSwitch}>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className={styles.select}
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitch;