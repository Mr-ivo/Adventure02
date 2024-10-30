"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../Navbar/Navbar";
import styles from "./page.module.css";

const getData = async (id) => {
  try {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) {
      console.log("HTTP Error:", res.statusText);
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
  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(data);

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
    const getData = async () => {
      const res = await fetch("/api/posts");

      if (!res.ok) {
        // setError("Failed to fetch data");
        return;
      }
      const RecievedData = await res.json();
      setProducts(RecievedData);
    };

    getData();
  }, []);
  useEffect(() => {
    let filteredItems = products.filter((item) => item.name == data?.name);
    setRelatedProducts(filteredItems);
    console.log(filteredItems);
  }, [products]);

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
          <h1 className={styles.title}>{data?.title ||""}</h1>
          <p className={styles.description}>
            
            Douala, the vibrant economic capital of Cameroon is a bustling city rich in history and culture. Situated along the Atlantic coast Douala serves as the country primary port and gateway to Central Africa. It blends traditional African charm with modernity featuring diverse neighborhoods dynamic markets and an energetic nightlife. Visitors can explore historic landmarks such as the La Pagode building take in scenic views from the Wouri River or experience the bustling Mboppi market. Known for its hospitality Douala is a melting pot of cultures offering a wide variety of culinary experiences from fresh seafood to delicious Cameroonian street food.
          </p>
        </div>
      </div>
      <h1  className={styles.relatedProductsTitle}>Related Products</h1>
      <div className={styles.relatedProductsContainer}>
        {relatedProducts.map((item) => (
          <div key={item._id} className={styles.productCard}>
            <Image
              src={item?.img || ""}
              alt={item?.name || "Image"}
              width={300}
              height={300}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
