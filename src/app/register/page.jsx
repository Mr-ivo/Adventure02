"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Notyf } from "notyf";
import { signIn, useSession } from "next-auth/react";
import "notyf/notyf.min.css";
import Navbar from "../Navbar/Navbar";
import styles from "./page.module.css";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notyf, setNotyf] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setNotyf(
      new Notyf({
        duration: 3000,
        position: {
          x: "right",
          y: "top",
        },
      })
    );
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      setShowProfile(true);
    }
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register the user
      const registerRes = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log(formData);
      if (registerRes.status === 201) {
        notyf.success("Account created successfully");

        // Automatically sign in the user after successful registration
        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          notyf.error("Error signing in after registration");
        } else {
          setShowProfile(true);
        }
        // router.push("/login")
      } else if (registerRes.status === 400) {
        notyf.error("User already exists");
      } else {
        notyf.error("Please check your input and try again");
      }
    } catch (error) {
      console.error(error);
      notyf.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (showProfile && session) {
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
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile picture"
                    className={styles.profileImage}
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className={styles.profilePlaceholder}>
                    <User size={40} />
                  </div>
                )}
              </div>
              <h2 className={styles.welcomeText}>
                Welcome, {session.user.name || formData.username}!
              </h2>
              <p className={styles.userEmail}>{session.user.email}</p>
              <div className={styles.actionButtons}>
                <button
                  className={styles.dashboardButton}
                  onClick={() => router.push("/dashboard")}
                >
                  Go to Dashboard
                  <ArrowRight size={18} />
                </button>
                <button
                  className={styles.logoutButton}
                  onClick={() => signOut()}
                >
                  <LogOut size={18} />
                  Sign out
                </button>
              </div>
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
          className={styles.container}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.formCard}>
            <h1 className={styles.title}>Create Account</h1>
            <p className={styles.subtitle}>
              Join us today! Please fill in your details
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <User className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={styles.input}
                  required
                  minLength={3}
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={styles.input}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputGroup}>
                <Lock className={styles.inputIcon} size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={styles.input}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.loading}>Creating account...</span>
                ) : (
                  <>
                    <span>Register</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className={styles.loginLink}>
              Already have an account?{" "}
              <Link href="/login" className={styles.link}>
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </>
  );
}
