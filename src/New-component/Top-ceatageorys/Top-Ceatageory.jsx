// // // import React from 'react';

// // // const categories = [
// // //   { name: 'T-shirt', img: 'https://shahzebsaeed.com/cdn/shop/collections/Mens_T-Shirts_800x.jpg?v=1699871888' },
// // //   { name: 'Shirts', img: 'https://shahzebsaeed.com/cdn/shop/collections/Mens_T-Shirts_800x.jpg?v=1699871888' },
// // //   { name: 'Oversize T-shirts', img: 'https://shahzebsaeed.com/cdn/shop/collections/Oversize_T-Shirts_800x.jpg?v=1699871888' },
// // //   { name: 'Minimal T-shirt', img: 'https://shahzebsaeed.com/cdn/shop/collections/Minimal_T-Shirts_800x.jpg?v=1699871888' },
// // //   { name: 'Bottomwear', img: 'https://shahzebsaeed.com/cdn/shop/collections/Bottomwear_800x.jpg?v=1699871888' },
// // //   { name: 'Casual', img: 'https://shahzebsaeed.com/cdn/shop/collections/Casual_800x.jpg?v=1699871888' }
// // // ];

// // // const TopCategory = () => {
// // //   return (
// // //     <>
// // //       <h1>Top Categories</h1>
// // //       <div className="top-category-container">
// // //         {categories.map((category, index) => (
// // //           <div className="category-card" key={index}>
// // //             <img src={category.img} alt={category.name} width="100px" />
// // //             <h6>{category.name}</h6>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default TopCategory;













// // import React from 'react';


// // const categories = [
// //   { name: 'T-shirt', img: 'https://shahzebsaeed.com/cdn/shop/collections/Mens_T-Shirts_800x.jpg?v=1699871888' },
// //   { name: 'Shirts', img: 'https://shahzebsaeed.com/cdn/shop/collections/Mens_Shirts_800x.jpg?v=1699871888' },
// //   { name: 'Oversize T-shirts', img: 'https://shahzebsaeed.com/cdn/shop/collections/Oversize_T-Shirts_800x.jpg?v=1699871888' },
// //   { name: 'Minimal T-shirt', img: 'https://shahzebsaeed.com/cdn/shop/collections/Minimal_T-Shirts_800x.jpg?v=1699871888' },
// //   { name: 'Bottomwear', img: 'https://shahzebsaeed.com/cdn/shop/collections/Bottomwear_800x.jpg?v=1699871888' },
// //   { name: 'Casual', img: 'https://shahzebsaeed.com/cdn/shop/collections/Casual_800x.jpg?v=1699871888' }
// // ];

// // const TopCategory = () => {
// //   return (
// //     <>
// //       {/* <h1 className='justi'>Top Categories</h1> */}
    
// //       <div className="top-category-container">
// //         {categories.map((category, index) => (
// //           <div className="category-card" key={index}>
            
// //             <img src={category.img} alt={category.name} width="100px" />
// //             <h6>{category.name}</h6>
// //           </div>
// //         ))}
// //       </div>
// //     </>
// //   );
// // };

// // export default TopCategory;

















// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TopCategory = () => {


//   const navigate = useNavigate();
//   return (
//     <>
//       <h1>Top Categories</h1>
//       <div className="top-category-container">

//       <div className="category-card" onClick={()=>{navigate=('/Causal')}}>
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Half_Sleeves_Plain_Polos_800x.jpg?v=1699871934" 
//             alt="Casual" 
//             width="100px" 
//           />
//           <h4 >Casual</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Mens_T-Shirts_800x.jpg?v=1699871888" 
//             alt="T-shirt" 
//             width="100px" 
//           />
//           <h4>T-shirt</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/HALF_SLEEVES_PLAIN_POLO-11_800x.jpg?v=1714550347" 
//             alt="Shirts" 
//             width="100px" 
//           />
//           <h4>Shirts</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Casual_Shirts_800x.jpg?v=1718302331" 
//             alt="Oversize T-shirts" 
//             width="100px" 
//           />
//           <h4>Oversize T-shirts</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Casual_Shirts_800x.jpg?v=1718302331" 
//             alt="Minimal T-shirt" 
//             width="100px" 
//           />
//           <h4>Minimal T-shirt</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Mens_Formal_Shirts_800x.jpg?v=1699871826" 
//             alt="Bottomwear" 
//             width="100px" 
//           />
//           <h4>Bottomwear</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Half_Sleeves_Plain_Polos_800x.jpg?v=1699871934" 
//             alt="Casual" 
//             width="100px" 
//           />
//           <h4>Casual</h4>
//         </div>
//         <div className="category-card">
//           <img 
//             src="https://shahzebsaeed.com/cdn/shop/collections/Mens_T-Shirts_800x.jpg?v=1699871888" 
//             alt="T-shirt" 
//             width="100px" 
//           />
//           <h4>T-shirt</h4>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TopCategory;



















// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const categories = [
//   { name: 'Shefoon hijab', img: 'https://shahzebsaeed.com/cdn/shop/collections/Mens_T-Shirts_800x.jpg?v=1699871888', route: '/T-shirtsProducts' },
//   { name: 'Shefoon hijab', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/IMG-20240910-WA0002.jpg?alt=media&token=ba4d6e6f-3f89-478e-ae00-8cc5942e23c9', route: '/ShirtsProducts' },
//   { name: 'Oversize T-shirts', img: 'https://shahzebsaeed.com/cdn/shop/collections/Casual_Shirts_800x.jpg?v=1718302331', route: '/OversizeTshirts' },
//   { name: 'Minimal T-shirt', img: 'https://shahzebsaeed.com/cdn/shop/collections/Casual_Shirts_800x.jpg?v=1718302331', route: '/MinimalTshirt' },
//   { name: 'Bottomwear', img: 'https://shahzebsaeed.com/cdn/shop/collections/Half_Sleeves_Plain_Polos_800x.jpg?v=1699871934', route: '/Bottomwear' },
//   { name: 'Casual', img: 'https://shahzebsaeed.com/cdn/shop/collections/Casual_Shirts_800x.jpg?v=1718302331', route: '/Causal' }
// ];

// const TopCategory = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <h1>Top Categories</h1>
//       <div className="top-category-container">
//         {categories.map((category, index) => (
//           <div 
//             className="category-card" 
//             key={index} 
//             onClick={() => navigate(category.route)}
//           >
//             <img 
//   src={category.img} 
//   alt={category.name} 
//   className="category-image" 
//   style={{ 
//     borderRadius: '50%', // Circular border
//     objectFit: 'cover'  // Ensures the image fits within the circle
//   }} 
// />
//             <h4>{category.name}</h4>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default TopCategory;











import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Abayas', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/IMG-20240910-WA0003.jpg?alt=media&token=26a4f791-b6d7-4b70-9f6d-897623e59bca', route: '/T-shirtsProducts' },
  { name: 'Shefoon hijab', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/IMG-20240910-WA0002.jpg?alt=media&token=ba4d6e6f-3f89-478e-ae00-8cc5942e23c9', route: '/ShirtsProducts' },
  { name: 'Sandals', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/IMG-20240910-WA0004.jpg?alt=media&token=7bf02bc7-c9f6-492e-bf6c-52a45e9cc24f', route: '/OversizeTshirts' },
  { name: 'Pumps', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/IMG-20240910-WA0005.jpg?alt=media&token=bdbceff9-23dc-4915-bda3-145e1bfc2a3c', route: '/MinimalTshirt' },
  { name: 'Assocerios', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/scrency.jpg?alt=media&token=e0884417-07a0-44e7-9ec1-cc0859623685', route: '/Bottomwear' },
  { name: 'Perfumes', img: 'https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/9d444cc8-1f04-42f4-9940-b51402dff01e%20(1).webp?alt=media&token=5f2d0489-4c61-473a-a5e0-39e724c03e6c', route: '/Causal' }
];

const TopCategory = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Top Categories</h1>
      <div className="top-category-container">
        {categories.map((category, index) => (
          <div 
            className="category-card" 
            key={index} 
            onClick={() => navigate(category.route)}
          >
                   <img 
  src={category.img} 
  alt={category.name} 
  className="category-image" 
  style={{
    objectFit: 'cover',  // Ensures the image is cropped to fit
  }} 
/>

            <h4>{category.name}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default TopCategory;
