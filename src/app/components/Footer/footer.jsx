import React from 'react'
import styles from "./footer.module.css"
import Link from 'next/link'
import { AiOutlineMail, AiOutlineTikTok, AiOutlineWhatsApp } from 'react-icons/ai';
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';

function Footer() {
  return (
    <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <div className={styles.footerSection}>
        <h2 className={styles.footerTitle}>About Us</h2>
        <p className={styles.footerText}>
          Welcome to our blog! Here we share the latest insights, tutorials, and stories. Stay tuned for more updates.
        </p>
      </div>
  
      <div className={styles.footerSection}>
        <h2 className={styles.footerTitle}>Quick Links</h2>
        <ul className={styles.footerLinks}>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/privacy">Privacy Policy</Link></li>
        </ul>
      </div>
  
      <div className={styles.footerSection}>
        <h2 className={styles.footerTitle}>Follow Us</h2>
        <div className={styles.socialIcons}>
          <Link href="https://facebook.com">
            <Facebook />
          </Link>
          <Link href="https://twitter.com">
            <Twitter />
          </Link>
          <Link href="https://instagram.com">
            <Instagram />
          </Link>
          <Link href="https://linkedin.com">
            <Linkedin />
          </Link>
        </div>
      </div>
    </div>
  
    <div className={styles.footerBottom}>
      <p>&copy; 2024 Your Blog. All Rights Reserved.</p>
    </div>
  </footer>
  
  )
}

export default Footer