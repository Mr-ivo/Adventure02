import React from 'react';
import styles from './page.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { revalidateTag } from 'next/cache';

   
  
 async function getData() {
  const res = await fetch("/api/posts", { next: {tags: ['collection']}})
  
  revalidateTag('collection')

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
const page = async () => {

    const data = await getData();
   
  return (
    <>

     <div className={styles.backgroundImage}>
     </div>
     <div className={styles.hope}>
     <p className={styles.desc}>
        Join me for a journey
          Through Cameroon <br />
           vibrant cities.
      </p>
     </div>
     <div className={styles.container}>
        {data.map(item => (
       <div className={styles.card} key={item.id}>
            <Link href={`/${item.id}`}>
              <Image
              className={styles.image}
                src={item.img}
                alt={item.title}
                width={400}
                height={400}
              />
            </Link>
            <h1>{item.title}</h1>
            <p className={styles.write}>{item.description}</p>
          </div>
         ))}
     </div>
  
 
     </>
  
  );
}
export default page;
