// import React from 'react';

// const TrendProductCard = ({ image }) => {
//   return (
//     <div className="rounded-lg overflow-hidden shadow-md">
//       <img src={image} alt="Product" className="w-200 h-200 object-cover object-center" />
//     </div>
//   );
// };

// export default TrendProductCard;








// import React from 'react';

// const TrendProductCard = ({ image }) => {
//   return (
//     <div className="rounded-lg overflow-hidden shadow-md relative group">
//       <img 
//         src={image} 
//         alt="Product" 
//         className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" 
//       />
//       <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 px-3 py-1 rounded-full shadow-md">
        
        
//       <div className="rating rating-xs">
//   <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
//   <input
//     type="radio"
//     name="rating-5"
//     className="mask mask-star-2 bg-orange-400"
//     defaultChecked />
//   <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
//   <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
//   <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
// </div>
//       </div>
//     </div>
//   );
// };

// export default TrendProductCard;



















import React from 'react';

const TrendProductCard = ({ image }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md relative group w-full max-w-xs sm:max-w-sm mx-auto"> {/* Container with fixed width */}
      <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96"> {/* Set a fixed height */}
        <img 
          src={image} 
          alt="Product" 
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out transform group-hover:scale-110" 
        />
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 px-3 py-1 rounded-full shadow-md">
        <div className="rating rating-xs">
          <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" defaultChecked />
          <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
        </div>
      </div>
    </div>
  );
};

export default TrendProductCard;
