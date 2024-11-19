"use client";

import React, { useState, useEffect, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, LogOut, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import Navbar from "../Navbar/Navbar";
import styles from "./page.module.css";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notyf, setNotyf] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  const { mode, toggleMode, user, setUser } = useContext(ThemeContext);
  useEffect(() => {
    setNotyf(
      new Notyf({
        duration: 3000,
        position: { x: "right", y: "top" },
      })
    );
  }, []);

  // Redirect logged-in users to home
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/authentication", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = res.json();
      localStorage.setItem("user", JSON.stringify(data.userData));
      notyf.success("Successfully logged in");
      router.push("/");
      if (!res.ok) {
        notyf.error("Invalid credentials");
      }
    } catch (error) {
      notyf.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render profile if user is already logged in
  if (session) {
    return (
      <>
        <Navbar bg="black" />
        <main className={styles.main}>
          <motion.div
            className={styles.profileContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.profileCard}>
              <div className={styles.profileImageWrapper}>
                <Image
                  src={session.user.image || "/default-avatar.png"}
                  alt="Profile picture"
                  className={styles.profileImage}
                  fill
                  priority
                />
              </div>
              <h2 className={styles.welcomeText}>Welcome back!</h2>
              <p className={styles.userEmail}>{session.user.email}</p>
              <button
                className={styles.signOutButton}
                onClick={() => signOut()}
              >
                <LogOut size={18} />
                <span>Sign out</span>
              </button>
            </div>
          </motion.div>
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
              <label htmlFor="email" className={styles.label}>
                Email Address
              </label>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputGroup}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  id="password"
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
                  <motion.span
                    className={styles.loading}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Logging in...
                  </motion.span>
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
              <Image src="/google.webp" alt="Google" width={20} height={20} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default Login;
