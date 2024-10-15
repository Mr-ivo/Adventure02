'use client';
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

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getData(id);
            setData(fetchedData);
        };

        if (id) {
            fetchData();
        }
    }, [id]);

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
                    <p className={styles.description}>{data?.description || "No description available."}</p>
                </div>
            </div>
        </>
    );
};

export default Page;