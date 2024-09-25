






// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTruck, faUndo, faShieldAlt, faTags, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

// const ServicesBox = () => {
//   return (
//     <div className="bg-white rounded-lg p-4 shadow-md grid grid-cols-2 gap-4 md:flex md:justify-around md:grid-cols-none md:gap-0 md:gap-4">
//       <div className="flex items-center">
//         <FontAwesomeIcon icon={faTruck} className="text-gray-600 text-xl mr-2" />
//         <span className="text-gray-800 font-medium">Cash on Delivery</span>
//       </div>
//       {/* <div className="flex items-center">
//         <FontAwesomeIcon icon={faUndo} className="text-gray-600 text-xl mr-2" />
//         <span className="text-gray-800 font-medium">Easy Return</span>
//       </div> */}
//       <div className="flex items-center">
//         <FontAwesomeIcon icon={faShieldAlt} className="text-gray-600 text-xl mr-2" />
//         <span className="text-gray-800 font-medium">Safe Payment</span>
//       </div>
//       <div className="flex items-center">
//         <FontAwesomeIcon icon={faTags} className="text-gray-600 text-xl mr-2" />
//         <span className="text-gray-800 font-medium">Best Price</span>
//       </div>
//       <div className="flex items-center">
//         <FontAwesomeIcon icon={faCheckCircle} className="text-gray-600 text-xl mr-2" />
//         <span className="text-gray-800 font-medium">100% Authentic</span>
//       </div>
//     </div>
//   );
// }

// export default ServicesBox;











import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faUndo, faShieldAlt, faTags, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const ServicesBox = () => {
  return (
    <div className="bg-black text-white  p-4 shadow-md w-full flex justify-around items-center">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faTruck} className="text-white text-xl mr-2" />
        <span className="font-medium">Cash on Delivery</span>
      </div>
      {/* <div className="flex items-center">
        <FontAwesomeIcon icon={faUndo} className="text-white text-xl mr-2" />
        <span className="font-medium">Easy Return</span>
      </div> */}
      <div className="flex items-center">
        <FontAwesomeIcon icon={faShieldAlt} className="text-white text-xl mr-2" />
        <span className="font-medium">Safe Payment</span>
      </div>
      {/* <div className="flex items-center">
        <FontAwesomeIcon icon={faTags} className="text-white text-xl mr-2" />
        <span className="font-medium">Best Price</span>
      </div> */}
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCheckCircle} className="text-white text-xl mr-2" />
        <span className="font-medium">100% Authentic</span>
      </div>
    </div>
  );
}

export default ServicesBox;
