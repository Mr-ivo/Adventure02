'use client'
import React from 'react';
import styles from './page.module.css'
import Navbar from '../Navbar/Navbar';

const categories = [
  {
    name: "City Guides",
    description: "Detailed guides for exploring Cameroon's major cities, including must-see attractions, local dining, and accommodation options.",
  },
  {
    name: "Cultural Experiences",
    description: "Articles focused on cultural events, traditions, festivals, and local customs that you can experience while visiting different cities.",
  },
  {
    name: "Outdoor Adventures",
    description: "Recommendations for outdoor activities like hiking, wildlife safaris, beach visits, and other adventures in and around Cameroon's cities.",
  },
  {
    name: "Food & Drink",
    description: "Insights into Cameroonian cuisine, including popular dishes, restaurant reviews, and street food must-tries.",
  },
  {
    name: "Travel Tips",
    description: "Practical advice for traveling in Cameroon, covering topics like transportation, safety, budgeting, and packing.",
  },
  {
    name: "Local Stories",
    description: "Personal stories and interviews with locals that provide a deeper understanding of life in Cameroon's cities.",
  },
];

const Categories = () => {
  return (
    <>
    <Navbar bg={"black"} />
    <div className={styles.container}>
      <section className={styles.intro}>
        <h1>Explore Our Categories</h1>
        <p>Welcome to the AdventureAwaitsBlog Categories page! Here, you can easily find articles, guides, and stories about the vibrant cities of Cameroon. Browse through our categories to discover unique experiences, travel tips, and hidden gems in each city.</p>
      </section>

      <section className={styles.list}>
        {categories.map((category, index) => (
          <div key={index} className={styles.item}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
          </div>
        ))}
      </section>
    </div>
    </>
  );
};

export default Categories;
