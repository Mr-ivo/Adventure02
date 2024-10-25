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
    let filteredItems = products.filter((item) => item.name == data.name);
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
          <h1 className={styles.title}>{data?.title || "Image Title"}</h1>
          <p className={styles.description}>
            {data?.description || "No description available."}
          </p>
        </div>
      </div>
      <h1>Related Products</h1>
      <div>
        {relatedProducts.map((item) => (
          <div key={item._id}>
            <Image
              src={item?.img || ""}
              alt={item?.name || "Image"}
              width={100}
              height={100}
            />
            {/* <h2>{item?.descripto}</h2> */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
