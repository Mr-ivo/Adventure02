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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/posts");

      if (!res.ok) {
        setError("Failed to fetch data");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setData(data);
      setFilteredCities(data); 
      setLoading(false);
    };

    getData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = data.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  return (
    <>
      <Navbar />
      <div className={styles.backgroundImage}></div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>

      <div className={styles.hope}></div>
      <div className={styles.container}>
        <div className={styles.grid}>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {filteredCities.map((item) => (
            <div className={styles.card} key={item._id}>
              <Link href={`/${item._id}`}>
                <Image
                  className={styles.image}
                  src={item.img}
                  alt={`Image of ${item.title}`}
                  width={400}
                  height={700}
                />
              </Link>
              <div className={styles.info}>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam minima eligendi.</p>
              </div>
              <h1>{item.info_title}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
