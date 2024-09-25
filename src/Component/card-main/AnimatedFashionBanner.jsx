






import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimatedFashionBanner = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div className="relative w-full h-80 md:h-96 lg:h-112 flex justify-center items-center overflow-hidden bg-gray-800 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-75 animate-pulse"></div>
      <div className="relative text-center z-10">
        <h1
          data-aos="fade-down"
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-bounce"
        >
          Welcome to Our AL-Ziyarah
        </h1>
        <p data-aos="fade-up" className="text-lg md:text-xl lg:text-2xl animate-pulse">
          Discover the latest trends and styles
        </p>
        <button
          data-aos="fade-up"
          className="bg-white text-gray-800 py-2 px-6 mt-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default AnimatedFashionBanner;













// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const AnimatedFashionBanner = () => {
//   useEffect(() => {
//     AOS.init({ duration: 2000 });
//   }, []);

//   return (
//     <div className="relative w-full h-80 md:h-96 lg:h-112 flex justify-center items-center overflow-hidden bg-gray-800 text-white">
//       <div className="absolute inset-0 bg-gray-900 opacity-75 animate-pulse"></div>
//       <div className="relative text-center z-10">
//         <h1
//           data-aos="fade-down"
//           className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-bounce"
//         >
//           Welcome to Our Fashion Store
//         </h1>
//         <p data-aos="fade-up" className="text-lg md:text-xl lg:text-2xl animate-pulse">
//           Discover the latest trends and styles
//         </p>
//         <button
//           data-aos="fade-up"
//           className="bg-white text-gray-800 py-2 px-6 mt-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Explore Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnimatedFashionBanner;






















// import React, { useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const AnimatedFashionBanner = () => {
//   useEffect(() => {
//     AOS.init({ duration: 2000 });
//   }, []);

//   return (
//     <div className="relative w-full h-80 md:h-96 lg:h-112 flex justify-center items-center overflow-hidden bg-pink-500">
//       <div className="absolute inset-0 bg-pink-600 opacity-75 animate-pulse"></div>
//       <div className="relative text-center z-10">
//         <h1
//           data-aos="fade-down"
//           className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-bounce"
//         >
//           Welcome to Our Fashion Store
//         </h1>
//         <p data-aos="fade-up" className="text-white text-lg md:text-xl lg:text-2xl animate-pulse">
//           Discover the latest trends and styles
//         </p>
//         <button
//           data-aos="fade-up"
//           className="bg-white text-gray-800 py-2 px-6 mt-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Explore Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnimatedFashionBanner;














// import React, { useEffect, useState } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const AnimatedFashionBanner = () => {
//   const [bgColor, setBgColor] = useState('bg-pink-500');

//   useEffect(() => {
//     AOS.init({ duration: 2000 });

//     // Function to change background color after 5 seconds
//     const changeBackgroundColor = () => {
//       const colors = ['bg-pink-500', 'bg-blue-500', 'bg-purple-500', 'bg-yellow-500'];
//       const randomColor = colors[Math.floor(Math.random() * colors.length)];
//       setBgColor(randomColor);
//     };

//     // Interval to change background color every 5 seconds
//     const interval = setInterval(changeBackgroundColor, 5000);

//     // Clear interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className={`relative w-full h-80 md:h-96 lg:h-112 flex justify-center items-center overflow-hidden ${bgColor}`}>
//       <div className={`absolute inset-0 ${bgColor} opacity-75 animate-pulse`}></div>
//       <div className="relative text-center z-10">
//         <h1
//           data-aos="fade-down"
//           className="text-white text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-bounce"
//         >
//           Welcome to Our Fashion Store
//         </h1>
//         <p data-aos="fade-up" className="text-white text-lg md:text-xl lg:text-2xl animate-pulse">
//           Discover the latest trends and styles
//         </p>
//         <button
//           data-aos="fade-up"
//           className="bg-white text-gray-800 py-2 px-6 mt-6 rounded-full shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Explore Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AnimatedFashionBanner;
