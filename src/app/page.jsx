"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar/Navbar";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/posts");

      if (!res.ok) {
        setError("Failed to fetch data");
        setLoading(false);
        return; // Exit if fetch failed
      }

      const data = await res.json();
      setData(data);
      setLoading(false); // Set loading to false after data is fetched
    };

    getData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.backgroundImage}></div>
      <div className={styles.hope}>
        {/* <p className={styles.desc}>
          Join me for a journey Through Cameroon <br />
          vibrant cities.
        </p> */}
      </div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {data.map((item) => (
            <div className={styles.card} key={item._id}>
              <Link href={`/${item._id}`}>
                <Image
                  className={styles.image}
                  src={item.img}
                  alt={`Image of ${item.title}`} // Improved alt text
                  width={400}
                  height={700}
                />
              </Link>
              <div className={styles.info}>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam minima eligendi.</p>
              </div>
              <h1>{item.info_title}</h1>
              {/* <p className={styles.write}>{item.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
