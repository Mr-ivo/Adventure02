"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import Navbar from "./Navbar/Navbar";

const Page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/posts");

      const data = await res.json();
      setData(data);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
    };

    getData();
  }, []);

  return (
    <>
    <Navbar/>
      <div className={styles.backgroundImage}>
      </div>
      <div className={styles.hope}>
        {/* <p className={styles.desc}>
          Join me for a journey Through Cameroon <br />
          vibrant cities.
        </p> */}
      </div>
      <div className={styles.container}>
        {data.map((item) => (
          <div className={styles.card} key={item.id}>
            <Link href={`/${item.id}`}>
              <Image
                className={styles.image}
                src={item.img}
                alt={item.title}
                width={400}
                height={700}
              />
            </Link>
              <div className={styles.info}>
                <h1>image box</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam minima eligendi.</p>
              </div>
            <h1>{item.title}</h1>
            {/* <p className={styles.write}>{item.description}</p> */}
          </div>
        ))}
      </div>
    </>
  );
};
export default Page;
