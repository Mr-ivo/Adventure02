"use client";
import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "../components/DarkModeToggle/DarkModeToggle";
import styles from "./Navbar.module.css";
import { ThemeContext } from "../context/ThemeContext";

const menuItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Categories", path: "/categories" },
  { title: "Dashboard", path: "/dashboard" },
  { title: "Contact", path: "/contact" },
];

const NavLink = ({ href, title, onClick = () => {} }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.navLink} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <motion.div
        className={styles.linkContent}
        whileHover={{ x: 10 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <span className={styles.linkTitle}>{title}</span>
      </motion.div>
      <ChevronRight className={styles.linkIcon} size={16} />
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { data: session } = useSession(); // Get session data from NextAuth

  const { mode, toggleMode, user, setUser } = useContext(ThemeContext);
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      setIsScrolled(currentScrollY > 20);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.navContainer}>
        <motion.div
          className={styles.logoWrapper}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <span className={styles.logoText}>
              <span className={styles.urban}>urban</span>
              <span className={styles.cameroon}>Cameroon</span>
            </span>
          </Link>
        </motion.div>

        <div className={styles.desktopNav}>
          <div className={styles.mainLinks}>
            {menuItems.map((item) => (
              <NavLink key={item.path} href={item.path} title={item.title} />
            ))}
          </div>
          <div className={styles.navControls}>
            <div className={styles.darkModeWrapper}>
              <DarkModeToggle />
            </div>
            <div className={styles.authLinks}>
              {session ? (
                <>
                  <Link href="/profile" className={styles.profileWrapper}>
                    <Image
                      src={session.user.image || "/default-avatar.png"}
                      alt="User Profile"
                      className={styles.profileImage}
                      width={36}
                      height={36}
                    />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className={`${styles.authButton} ${styles.secondary}`}
                  >
                    Logout
                  </button>
                </>
              ) : !session ? (
                <>
                  <Link href="/login" className={styles.authButton}>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={`${styles.authButton} ${styles.primary}`}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <h1>{user.username}</h1>
              )}
            </div>
          </div>
        </div>

        <div className={styles.mobileControls}>
          <div className={styles.darkModeWrapper}>
            <DarkModeToggle />
          </div>
          <motion.button
            className={styles.menuButton}
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileLinks}>
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  href={item.path}
                  title={item.title}
                  onClick={toggleMenu}
                />
              ))}
              <div className={styles.mobileAuthLinks}>
                {session ? (
                  <>
                    <Link
                      href="/profile"
                      className={`${styles.mobileAuthButton}`}
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        toggleMenu();
                      }}
                      className={`${styles.mobileAuthButton} ${styles.secondary}`}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={styles.mobileAuthButton}
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={`${styles.mobileAuthButton} ${styles.primary}`}
                      onClick={toggleMenu}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
