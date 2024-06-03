import React, { useContext } from 'react'
import styles from "./DarkModeToggle.module.css"
import {Moon,Sun} from 'react-feather'
import { ThemeContext } from '@/app/context/ThemeContext'

function DarkModeToggle() {
  const {toggleMode,mode} = useContext(ThemeContext)
  return (
    <div className={styles.container} onClick={()=>toggleMode()}>
      <div className={styles.icon}>
        <Moon color='gold' size={20} />
      </div>
      <div className={styles.icon}>
        <Sun color='gold' size={20} />
      </div>
      <div className={styles.ball} style={mode=='light'?{left:'2px'}:{right:'2px'}}>
      </div>

    </div>
  )
}

export default DarkModeToggle