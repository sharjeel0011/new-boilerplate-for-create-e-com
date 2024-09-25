

// import React, { useState, useEffect } from 'react';

// const Banner = () => {
//   const images = [
//     "https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/freepik-tourism-youtube-thumbnail-20240909154450jumO.png?alt=media&token=d349b755-c49e-4243-903c-d3884249d397",
    
  
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
//         >
//           <img
//             src={image}
//             className="w-full h-full object-cover"
//             alt={`Banner ${index + 1}`}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Banner;











// import React, { useState, useEffect } from 'react';

// const Banner = () => {
//   const images = [
//     "https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/freepik-tourism-youtube-thumbnail-20240909154450jumO.png?alt=media&token=d349b755-c49e-4243-903c-d3884249d397",
//     "https://outfitbydk.com/cdn/shop/files/21f_2000x.jpg?v=1717177931",
 
   
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
    

//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out transform ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
//         >
//           <img
//             src={image}
//             className="w-full h-full object-cover"
//             alt={`Banner ${index + 1}`}
//           />
//         </div>
//       ))}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 mx-1 bg-white rounded-full transition duration-300 ${index === currentImageIndex ? 'bg-opacity-100' : 'bg-opacity-50'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;













// import React, { useState, useEffect } from 'react';

// const Banner = () => {
//   const images = [
//      "https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/freepik-export-202409092013409SrS.jpeg?alt=media&token=a09eae8f-996f-4a48-8c20-978d6ed39822",
//     'https://malbus.com.pk/cdn/shop/articles/banner_blog.jpg?v=1692775995',
//     "https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/freepik-tourism-youtube-thumbnail-202409091945239lUB.png?alt=media&token=be4f60c0-7f04-4eef-9839-33b8413c937d",
//    'https://malbus.com.pk/cdn/shop/articles/banner_blog.jpg?v=1692775995'
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[720px] xl:h-[864px] overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out transform ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
//         >
//           <img
//             src={image}
//             className="w-full h-full object-cover"
//             alt={`Banner ${index + 1}`}
//           />
//         </div>
//       ))}
//       <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 mx-1 bg-white rounded-full transition duration-300 ${index === currentImageIndex ? 'bg-opacity-100' : 'bg-opacity-50'}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Banner;
















import React, { useState, useEffect } from 'react';

const Banner = () => {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/freepik-export-202409092013409SrS.jpeg?alt=media&token=a09eae8f-996f-4a48-8c20-978d6ed39822",
    'https://malbus.com.pk/cdn/shop/articles/banner_blog.jpg?v=1692775995',
    "https://firebasestorage.googleapis.com/v0/b/al-ziyarahshop.appspot.com/o/freepik-tourism-youtube-thumbnail-202409091945239lUB.png?alt=media&token=be4f60c0-7f04-4eef-9839-33b8413c937d",
    'https://malbus.com.pk/cdn/shop/articles/banner_blog.jpg?v=1692775995'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-48 sm:h-64 md:h-80 lg:h-[540px] xl:h-[600px] overflow-hidden"> {/* Updated to w-screen */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out transform ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <img
            src={image}
            className="w-full h-full object-cover"
            alt={`Banner ${index + 1}`}
          />
        </div>
      ))}
      <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 mx-1 bg-white rounded-full transition duration-300 ${index === currentImageIndex ? 'bg-opacity-100' : 'bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
