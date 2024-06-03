import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import Navbar from '../Navbar/Navbar'
// import Navbar from '@/components/Navbar/Navbar'



async function getData() {
  const result = await fetch("http://localhost:3000/api/posts")
  if(!result.ok) {
    throw new Error('Failed to fetch data')
  }
  return result.json()
}
const page = async ({params}) => {
    const id = params.id;
    const data = await getData(id);
  return (
    <div>

        <Navbar color = 'chartreuse' />
        <div className={styles.container}>
          <Image
            className={styles.image}
            src={data.webformatURL}
            alt={data.tags}
            width={500}
            height={300}
          />
       </div>
     
    
    </div>
  )
}

export default page