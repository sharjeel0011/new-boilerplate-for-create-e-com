







// import React, { useRef, useEffect } from 'react';
// import TrendProductCard from './TrendProductCard';


// const TrendProductList = ({ products }) => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate');
//         } else {
//           entry.target.classList.remove('animate');
//         }
//       });
//     }, { threshold: 0.5 }); // Adjust threshold as needed

//     observer.observe(containerRef.current);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div className="trend-product-list-container" ref={containerRef}>
//       <div className="trend-product-list">
//         {products.map((product, index) => (
//           <div key={index} className="trend-product-item">
//             <TrendProductCard image={product.image} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendProductList;












import React from 'react';
import TrendProductCard from './TrendProductCard';

const TrendProductList = ({ products }) => {
  return (
    <div className="trend-product-list-container">
      <div className="trend-product-list">
        {products.map((product, index) => (
          <div key={index} className="trend-product-item">
            <TrendProductCard image={product.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendProductList;
