 "use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import styles from "./page.module.css";

const getData = async (id) => {
  try {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) {
      console.error("HTTP Error:", res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch data", error);
    return null;
  }
};

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getData(id);
      setData(fetchedData);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) return;
        const fetchedProducts = await res.json();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Failed to fetch all products", err);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (data) {
      const filteredItems = products.filter(
        (item) => item.category === data.category && item._id !== data._id
      );
      setRelatedProducts(filteredItems);
    }
  }, [data, products]);

  useEffect(() => {
    if (data?.location) {
      const fetchWeather = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${data.location}&appid=http://localhost:3000/api/posts`
          );
          if (!res.ok) return;
          const weatherData = await res.json();
          setWeather(weatherData);
        } catch (err) {
          console.error("Failed to fetch weather data", err);
        }
      };
      fetchWeather();
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.detailContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={data?.img || "/placeholder.png"}
            alt={data?.title || "Image"}
            width={800}
            height={600}
            className={styles.detailImage}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{data?.title || ""}</h1>
          <p className={styles.description}>{data?.description}</p>
        </div>
        {weather && (
          <div className={styles.weatherWidget}>
            <h3>Current Weather in {data?.location}</h3>
            <p>
              {weather.weather[0].description}, {weather.main.temp}°C
            </p>
          </div>
        )}

        <div className={styles.mapSection}>
          <h3>Location Map</h3>
          <iframe
            src={`https://maps.google.com/maps?q=${data?.coordinates?.lat},${data?.coordinates?.lng}&z=12&output=embed`}
            title="City Map"
            className={styles.map}
          ></iframe>
        </div>
      </div>

      <h1 className={styles.relatedProductsTitle}>Related Cities</h1>
      <div className={styles.relatedProductsContainer}>
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item) => (
            <div
              key={item._id}
              className={styles.productCard}
              onClick={() => router.push(`/dynamic/${item._id}`)}
            >
              <Image
                src={item?.img || "/placeholder.png"}
                alt={item?.name || "Image"}
                width={300}
                height={300}
                className={styles.productImage}
              />
              <h3 className={styles.productTitle}>{item?.name}</h3>
            </div>
          ))
        ) : (
          <p>No related cities available.</p>
        )}
      </div>
    </>
  );
};

export default Page;
