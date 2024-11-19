 "use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Navbar from "./Navbar/Navbar";
import Link from "next/link";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCities, setVisibleCities] = useState(12);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    
    const getData = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredCities = data.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setVisibleCities(12);
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Explore Cities in Cameroon</h1>
          <p className={styles.heroSubtitle}>
            Discover the beauty, culture, and history of various cities across Cameroon.
          </p>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for a city..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton}>Search</button>
      </form>

      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Cities</h2>
        {loading && <p className={styles.loadingText}>Loading...</p>}
        {error && <p className={styles.errorText}>{error}</p>}
        <div className={styles.grid}>
          {(showAll ? filteredCities : filteredCities.slice(0, visibleCities)).map(
            (city) => (
              <Link href={`/${city._id}`} key={city._id} className={styles.card}>
                <img
                  className={styles.image}
                  src={city.img}
                  alt={`Image of ${city.name}`}
                />
                <h3 className={styles.cardTitle}>{city.name}</h3>
                <p className={styles.cardDescription}>{city.description}</p>
              </Link>
            )
          )}
        </div>

        <div className={styles.buttonContainer}>
          {!showAll && filteredCities.length > visibleCities && (
            <button className={styles.button} onClick={handleShowAll}>
              View All Cities
            </button>
          )}
          {showAll && (
            <button className={styles.button} onClick={handleShowLess}>
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
