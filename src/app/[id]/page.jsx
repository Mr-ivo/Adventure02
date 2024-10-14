'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../Navbar/Navbar"; // Assuming Navbar component exists
import styles from "./page.module.css"; // Use specific styles for detail page

const Page = ({ params }) => {
  const [item, setItem] = useState(null);
  const { id } = params; // Get the id from dynamic routing

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/posts/${id}`); // Fetch only the image data by id
      if (res.ok) {
        const data = await res.json();
        console.log(data); // Log the fetched data to the console
        setItem(data);
      } else {
        console.error("Failed to fetch data");
      }
    };

    if (id) {
      getData(); // Fetch data only if id is available
    }
  }, [id]);

  useEffect(() => {
    // Log the item to the console whenever it changes
    console.log("Current item:", item);
  }, [item]); // This will log whenever `item` is updated

  if (!item) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <>
      <Navbar />
      <div className={styles.detailContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={item.img}
            alt={item.title}
            width={800}
            height={600}
            className={styles.detailImage}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{item.title || "Image Title"}</h1>
          <p className={styles.description}>{item.description || "No description available."}</p>
        </div>
      </div>
    </>
  );
};

export default Page;





