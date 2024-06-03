'use client'
import React, { useRef } from 'react'
import styles from '@/app/contact/page.module.css'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css';
import emailjs from '@emailjs/browser';



function Page() {
  const form = useRef();
  const handleEmail = (e)=>{
    e.preventDefault();
  
    // alert('Please enter your email address')
    const notyf = new Notyf({
      duration: 1000,
      position: {
        x: 'right',
        y: 'top',
      }
    });

    emailjs.sendForm('service_ar788hf', 'template_2nsuien', form.current, {
      publicKey: '2TVWSzqEMfuyltArc',
    }).then(result=>{
      console.log(result);
      notyf.success('Email sent successfully')
    }).catch(error=>{
      console.log(error);
      notyf.error('Please fill out form and try again')
      
    })
    notyf.success('Thank you for contacting us')
  }
  return (
    <div className={styles.content}>
        <form className={styles.form} ref={form} onSubmit={handleEmail}  action="" method= "post">
           <div className={styles.innit}>
            <h3 className={styles.contact}>Contact us</h3>
            <div>
            <input className={styles.name} type="text" name="name" placeholder="Your Name" />
            </div>
            <div>
            <input className={styles.email} type="email" name="email" placeholder="Your Email  Address" />
            </div>
            <div>
            <input className={styles.tel} type="tel" name="subject" placeholder="Tel..." />
            </div>
            <div>
            <input className={styles.desc} type="text" name="Message" placeholder="description" />
            </div>
            <div>
            <input className={styles.send} type="submit" value="Send" />
            </div>

           </div>
        

        </form>
    </div>
    
  )
}

export default Page