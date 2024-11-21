 'use client';
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, LogOut, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Navbar from "../Navbar/Navbar";
import styles from "./page.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notyf, setNotyf] = useState(null);
  const [localUser, setLocalUser] = useState(null); // State for email-password users
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    setNotyf(new Notyf({
      duration: 3000,
      position: {
        x: 'right',
        y: 'top',
      },
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 200) {
        const userData = await res.json();
        setLocalUser(userData); // Store user data locally
        notyf.success('Successfully logged in');
        router.push("/");
      } else {
        notyf.error('Invalid credentials');
      }
    } catch (error) {
      notyf.error('Something went wrong');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfile = (user) => {
    const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "?";
    return (
      <motion.div
        className={styles.profileContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.profileCard}>
          <div className={styles.profileImageWrapper}>
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile picture"
                className={styles.profileImage}
                fill
                priority
              />
            ) : (
              <div className={styles.fallbackProfileImage}>{firstLetter}</div>
            )}
          </div>
          <h2 className={styles.welcomeText}>Welcome back!</h2>
          <p className={styles.userEmail}>{user.email}</p>
          <button
            className={styles.signOutButton}
            onClick={() => {
              setLocalUser(null); // Clear local user data
              signOut();
            }}
          >
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div>
      </motion.div>
    );
  };

  if (session || localUser) {
    const user = session ? session.user : localUser;
    return (
      <>
        <Navbar bg="black" />
        <main className={styles.main}>
          {renderProfile(user)}
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar bg="black" />
      <main className={styles.main}>
        <motion.div
          className={styles.loginContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.loginCard}>
            <h1 className={styles.title}>Welcome Back</h1>
            <p className={styles.subtitle}>Please sign in to continue</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.loading}>Logging in...</span>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className={styles.divider}>
              <span>or continue with</span>
            </div>

            <button
              className={styles.googleButton}
              onClick={() => signIn("google")}
              type="button"
            >
              <Image
                src="/google.webp"
                alt="Google"
                width={20}
                height={20}
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default Login;
