'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  Mountain, 
  Coffee, 
  Compass, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import styles from './page.module.css';

const categories = [
  {
    name: "City Guides",
    description: "Detailed guides for exploring Cameroon's major cities, including must-see attractions, local dining, and accommodation options.",
    icon: MapPin,
    color: "#3B82F6"
  },
  {
    name: "Cultural Experiences",
    description: "Articles focused on cultural events, traditions, festivals, and local customs that you can experience while visiting different cities.",
    icon: Users,
    color: "#8B5CF6"
  },
  {
    name: "Outdoor Adventures",
    description: "Recommendations for outdoor activities like hiking, wildlife safaris, beach visits, and other adventures in and around Cameroon's cities.",
    icon: Mountain,
    color: "#10B981"
  },
  {
    name: "Food & Drink",
    description: "Insights into Cameroonian cuisine, including popular dishes, restaurant reviews, and street food must-tries.",
    icon: Coffee,
    color: "#F59E0B"
  },
  {
    name: "Travel Tips",
    description: "Practical advice for traveling in Cameroon, covering topics like transportation, safety, budgeting, and packing.",
    icon: Compass,
    color: "#EF4444"
  },
  {
    name: "Local Stories",
    description: "Personal stories and interviews with locals that provide a deeper understanding of life in Cameroon's cities.",
    icon: BookOpen,
    color: "#EC4899"
  },
];

const Categories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Navbar bg="black" />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Explore Our Categories
            </motion.h1>
            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome to the AdventureAwaitsBlog Categories page! Here, you can easily find articles, 
              guides, and stories about the vibrant cities of Cameroon. Browse through our categories 
              to discover unique experiences, travel tips, and hidden gems in each city.
            </motion.p>
          </section>

          <motion.section 
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  className={styles.card}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={styles.cardHeader}>
                    <div 
                      className={styles.iconWrapper} 
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon size={24} color={category.color} />
                    </div>
                    <h2 className={styles.cardTitle}>{category.name}</h2>
                  </div>
                  <p className={styles.cardDescription}>{category.description}</p>
                  <button className={styles.exploreButton}>
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              );
            })}
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Categories;