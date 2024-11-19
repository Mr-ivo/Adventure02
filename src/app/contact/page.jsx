'use client';
import React, { useRef, useState, useEffect } from 'react';
import styles from '@/app/contact/page.module.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import emailjs from '@emailjs/browser';
import Navbar from '../Navbar/Navbar';

// Initialize Notyf outside of component but after client-side check
let notyf;

function ContactPage() {
  const form = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Initialize Notyf on component mount (client-side only)
  useEffect(() => {
    notyf = new Notyf({
      duration: 3000,
      position: {
        x: 'right',
        y: 'top',
      },
      types: [
        {
          type: 'success',
          background: '#4f46e5',
        },
        {
          type: 'error',
          background: '#dc2626',
        },
      ],
    });
  }, []);

  const validateForm = (data) => {
    const errors = {};
    
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject.trim()) {
      errors.subject = 'Phone number is required';
    }

    if (!data.Message.trim()) {
      errors.Message = 'Message is required';
    }

    return errors;
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!form.current) {
      setIsLoading(false);
      return;
    }

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData);

    // Validate form
    const errors = validateForm(data);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsLoading(false);
      notyf?.error('Please fill all required fields correctly');
      return;
    }

    // EmailJS configuration
    const emailConfig = {
      serviceId: 'service_ar788hf',
      templateId: 'template_2nsuien',
      publicKey: '2TVWSzqEMfuyltArc',
      templateParams: {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.Message,
      }
    };

    try {
      // Using emailjs.send instead of sendForm for better control
      const result = await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        emailConfig.templateParams,
        emailConfig.publicKey
      );

      console.log('Success:', result);
      if (result.status === 200) {
        notyf?.success('Message sent successfully!');
        form.current.reset();
        setFormErrors({});
      }
    } catch (error) {
      console.error('Failed:', error);
      notyf?.error(error.text || 'Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar bg={'black'} />
      <div className={styles.content}>
        <form 
          className={styles.form} 
          ref={form} 
          onSubmit={handleEmail} 
          noValidate
        >
          <div className={styles.innit}>
            <h3 className={styles.contact}>Contact us</h3>
            
            <div className={styles.inputGroup}>
              <input
                className={`${styles.input} ${formErrors.name ? styles.error : ''}`}
                type="text"
                name="name"
                placeholder="Your Name"
                aria-label="Your Name"
              />
              {formErrors.name && (
                <span className={styles.errorMessage}>{formErrors.name}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                className={`${styles.input} ${formErrors.email ? styles.error : ''}`}
                type="email"
                name="email"
                placeholder="Your Email Address"
                aria-label="Your Email Address"
              />
              {formErrors.email && (
                <span className={styles.errorMessage}>{formErrors.email}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                className={`${styles.input} ${formErrors.subject ? styles.error : ''}`}
                type="tel"
                name="subject"
                placeholder="Phone Number"
                aria-label="Phone Number"
              />
              {formErrors.subject && (
                <span className={styles.errorMessage}>{formErrors.subject}</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <textarea
                className={`${styles.textarea} ${formErrors.Message ? styles.error : ''}`}
                name="Message"
                placeholder="Your Message"
                rows={4}
                aria-label="Your Message"
              />
              {formErrors.Message && (
                <span className={styles.errorMessage}>{formErrors.Message}</span>
              )}
            </div>

            <button
              className={`${styles.button} ${isLoading ? styles.loading : ''}`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactPage;