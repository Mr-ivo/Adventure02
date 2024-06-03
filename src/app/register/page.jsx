'use client'
import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


export default function Page() {
    // navigate user to login page
const navigation = useRouter();
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const handleSubmit = async (e) => { 
  e.preventDefault();

  //create an instance of Notyf

  const notyf = new Notyf({
    duration: 1000,
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type:'success',
        message: 'Account has been created',
      },
      {
        type: 'error',
        message: 'Please fill out the form',
      },
      {
        type: 'warning',
        message: 'User already exists',
      },
    ],
  })


  try {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username,
        email,
        password,

      }),
    
    });

  if (res.status === 201) {
    navigation.push("/login?success=Account has been created");
  }else if (res.status === 400){
    notyf.error('User not found')
  }else{
    notyf.error('please fill out the form')
  }
} catch (error) {
    console.log(error);
  
}
};
  return (
    <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.contact}>Register</h3>
            <input
            placeholder='User Name'
            className={styles.input} 
            required
            onChange={(e)=>setUsername(e.target.value)}
            />
            <input
            type='email'
            placeholder='Email Address'
            className={styles.input} 
            required
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type='password'
            placeholder='Password'
            className={styles.input} 
            required
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className={styles.button}>
               Register</button>
            <Link className={styles.sec} href="/login">Already have an account ? Login</Link>

        </form>

    </div>
  )
}

