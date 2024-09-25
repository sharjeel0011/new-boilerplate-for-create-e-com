

// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from '../../Config/Firebase/Firebase';
// import Banner from '../../Component/Main-banner/Banner';
// import Footer from '../../Component/Footer/Footer';
// import TrendProductList from '../../New-component/trending-product/Parent-trendingProductList';
// import NewArrivals from '../../New-component/New-Arraivel/New-Arraivel'
// import TopCeatageory from '../../New-component/Top-ceatageorys/Top-Ceatageory';


// const Home = () => {
//   const [trendingProducts, setTrendingProducts] = useState([]);

//   useEffect(() => {
//     const fetchTrendingProducts = async () => {
//       try {
//         const q = query(collection(db, "Product"), where("campaigns", "array-contains", "Trending Product"));
//         const querySnapshot = await getDocs(q);
//         const products = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setTrendingProducts(products);
//         console.log(products);
//       } catch (error) {
//         console.error("Error fetching trending products: ", error);
//       }
//     };

//     fetchTrendingProducts();
//   }, []);

//   return (
//     <>
//       <div className='bg-white'>
//         <Banner />

//         <div className="flex flex-col items-center">
//           {/* <div className='mt-10 underline-offset-1 font-extrabold text-4xl flex justify-center flex-1 '>
//             <h1>Our Fashion Collection</h1>
//           </div> */}
//           {/* <AnimatedFashionBanner images={images} /> */}
//         </div>

//         {/* <ServicesBox/> */}
//         {/* <div className='mt-4 text-2xl text-center font-bold'>
//           Feature Products:
//         </div>
//         <TrendProductList products={trendProducts} /> */}
       
//         {/* <Banner /> */}
//         {/* <div className='mt-10 underline-offset-1 font-extrabold text-4xl flex justify-center flex-1 '>
//           <h1>Our Products:</h1>
//         </div> */}
//         <div className="flex justify-center p-8">
//           {/* <Card /> */}
//           <TrendProductList products={trendingProducts} />
          
//         </div>

//         <div className="flex flex-wrap justify-center p-8">
//           <NewArrivals /> 
//         </div>
        
       
//           <TopCeatageory/>
     

//       </div>
//     </>
//   );
// }

// export default Home;















 



import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../Config/Firebase/Firebase';
import Banner from '../../Component/Main-banner/Banner';
import Footer from '../../Component/Footer/Footer';
import TrendProductList from '../../New-component/trending-product/Parent-trendingProductList';
import NewArrivals from '../../New-component/New-Arraivel/New-Arraivel';
import TopCategory from '../../New-component/Top-ceatageorys/Top-Ceatageory';
import ServicesBox from '../../Component/Services/ServicesCard';
import ExploreNow from '../../New-component/Explorenow-banner/Explorenow'

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const q = query(collection(db, "Product"), where("campaigns", "array-contains", "Trending Product"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrendingProducts(products);
        console.log(products);
      } catch (error) {
        console.error("Error fetching trending products: ", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <>
      <div className='bg-white'>

        
  <div className="mt-20 flex justify-center p-3">
          <Banner />
        </div>
        {/* <div className='mt-20'>
         <Banner />
         </div> */}

        <div className="flex justify-center p-3">
          <TrendProductList products={trendingProducts} />
        </div>

        <div className="flex flex-wrap justify-center p-8">
          <NewArrivals />
        </div>
        
        <div className="flex flex-wrap justify-center p-8">
          <TopCategory />
        </div>
        {/* <div className="flex flex-wrap justify-center p-8">
            
        </div> */}
        <ExploreNow /> 
        <ServicesBox/>
      </div>
    </>
  );
}

export default Home;


