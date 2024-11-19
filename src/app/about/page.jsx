import React from 'react';
import Link from 'next/link';
import { Mail, Facebook, ArrowRight } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import styles from './page.module.css';

const Page = () => {
  const faqs = [
    {
      question: "How can I contribute to AdventureAwaitsBlog?",
      answer: "We welcome guest contributions! If you have a story to share, travel tips to offer, or photos to showcase, please contact us at nzoggeivo@gmail.com for more information."
    },
    {
      question: "Can I use your photos for my own purposes?",
      answer: "All photos on AdventureAwaitsBlog are either taken by our team or properly credited to the original source. If you would like to use any of our photos, please contact us for permission."
    }
  ];

  return (
    <>
      <Navbar bg="black" />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <h1 className={styles.title}>About Us</h1>
            <div className={styles.introText}>
              <p>Welcome to AdventureAwaitsBlog, your ultimate guide to exploring the vibrant cities of Cameroon. Our mission is to showcase the beauty, culture, and diversity of Cameroon cities through engaging content, stunning photography, and practical travel tips.</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Story</h2>
            <div className={styles.content}>
              <p>AdventureAwaitsBlog was founded by Ebong Thierry in April 2024. Inspired by seeing the beauty of our country Cameroon, our blog aims to help people discover the hidden treasures found throughout Cameroon. We believe in the importance of cultural exchange and fostering understanding between people of different backgrounds.</p>
              <p>Through our blog, we seek to bridge divides, celebrate similarities, and embrace the unique identities that make each city and community special.</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Focus</h2>
            <div className={styles.content}>
              <p>At AdventureAwaitsBlog, we focus on providing the best travel experience possible. Our goal is to ensure travelers have comprehensive knowledge about their destinations in Cameroon before they arrive.</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Join Our Community</h2>
            <div className={styles.content}>
              <p>We love hearing from our readers! Connect with us to stay updated on our latest posts, share your own experiences, and join the conversation.</p>
              <div className={styles.socialLinks}>
                <Link href="https://facebook.com" className={styles.socialLink}>
                  <Facebook size={20} />
                  <span>Follow us on Facebook</span>
                  <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className={styles.socialLink}>
                  <Mail size={20} />
                  <span>Contact via Email</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Testimonials</h2>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                UrbanCamerron has been an invaluable resource for planning my trip to Cameroon. The detailed travel guides and beautiful photography have inspired me to explore new destinations and immerse myself in the local culture.
              </p>
              <footer className={styles.testimonialAuthor}>
                - Kenna Caleb
              </footer>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              {faqs.map((faq, index) => (
                <div key={index} className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Page;