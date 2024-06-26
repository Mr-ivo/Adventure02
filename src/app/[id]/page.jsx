'use client'
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";


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
        <h1>{item.title}</h1>
      </div>
    ))}
  </div>
  )
}

export default Page