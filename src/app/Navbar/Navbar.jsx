'use client'
import React, { useState } from 'react'
import styles from './Navbar.module.css'
import Link from 'next/link'
import DarkModeToggle from '../components/DarkModeToggle/DarkModeToggle';

  

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Categories", href: "/categories" },
    { name: "Contact us ", href: "/contact" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
    
  ];

  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
  };

  return (
    <>
    <div className={styles.container}>
       <h1 className={styles.logo} ><Link href={"/"}>AdventureAwaitsBlog</Link></h1>
       <div className={`${styles.menuToggle} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div className={styles.hamburger}></div>
        </div>
        <DarkModeToggle />
       <div className={`${styles.linksContainer} ${isOpen ? styles.active : ''}`} onClick={toggleMenu}>
      
      
        
          
       <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
       {links.map((link,index) => (
                <Link href={link.href} className={styles.link} key={index}>{link.name}</Link>
            ))}
          </ul>
       </div>

    </div>
    </>
    
  )
}



export default Navbar
