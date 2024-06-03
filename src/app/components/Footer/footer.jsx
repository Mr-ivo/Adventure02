import React from 'react'
import styles from "./footer.module.css"
import Link from 'next/link'
import { AiOutlineMail, AiOutlineTikTok, AiOutlineWhatsApp } from 'react-icons/ai';
import { Facebook, Instagram } from 'react-feather';

function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles.container}>
        <div className={styles.icons}>
          <Link href="https://www.facebook.com/watty.mc?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer"><Facebook /></Link>
          <Link href="https://www.instagram.com/wattymc7?igsh=MWF1cWlsMHI2b2N3NA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer"><Instagram /></Link>
          <Link href="https://www.tiktok.com/@wattymc5?_t=8mJa7Ke6fFl&_r=1" target="_blank" rel="noopener noreferrer"><AiOutlineTikTok /></Link>
          <Link href="679373244" target="_blank" rel="noopener noreferrer"><AiOutlineWhatsApp /></Link>
          <Link href="mailto:your-nzoggeivo@gmail.com"><AiOutlineMail /></Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer