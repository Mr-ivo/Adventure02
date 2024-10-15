"use client";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle/DarkModeToggle";
import Image from "next/image";

const links = [
  { name: "Home", href: "/" }, 
  { name: "About", href: "/about" },
  { name: "Categories", href: "/categories" },
  { name: "Contact us ", href: "/contact" },
  { name: "Login", href: "/login" },
  { name: "Register", href: "/register" },
];

const Navbar = ({ color, bg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      setIsScrollingUp(currentScrollY < lastScrollY);
      setIsScrolled(currentScrollY > 100);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        style={{
          background: bg,
        }}
        className={`${styles.container} ${isScrolled && styles.scrolled}`}
      >
        <h1 className={styles.logo}>
          <Link href={"/"}>
            <Image
              src={"/Screenshot__2_-removebg-preview.png"}
              width={500}
              height={500}
            />
          </Link>
        </h1>
        <div
          className={`${styles.menuToggle} ${isOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <div className={styles.hamburger}></div>
        </div>
        <DarkModeToggle />
        <div
          className={`${styles.linksContainer} ${isOpen ? styles.active : ""}`}
          onClick={toggleMenu}
        >
          <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
            {links.map((link, index) => (
              <Link
                style={{
                  color: color,
                }}
                href={link.href}
                className={styles.link}
                key={index}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
