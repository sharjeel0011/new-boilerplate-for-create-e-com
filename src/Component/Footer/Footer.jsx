







// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

// const Footer = () => {
//   return (
//     <>
//       <footer className="footer p-10 bg-lightGray text-white">
//         <nav>
//           <h6 className="footer-title text-lime-500 font-black">Services</h6> 
//           <a className="link link-hover">Order Process</a>
//           <a className="link link-hover">Delivered</a>
//           <a className="link link-hover">Cash on Delivery</a>
//           <a className="link link-hover">Customer Satisfaction</a>
//         </nav> 
//         <nav>
//           <h6 className="footer-title text-lime-500 font-black">AlbariOutFits</h6> 
//           <a className="link link-hover">About Us</a>
//           <a className="link link-hover">Contact</a>
//           <a className="link link-hover">Jobs</a>
//           <a className="link link-hover">Press Kit</a>
//         </nav> 
//         <nav>
//           <h6 className="footer-title text-lime-500 font-black">Social</h6> 
//           <div className="grid grid-flow-col gap-4">
//             <a href="https://www.facebook.com/profile.php?id=61560558484647" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faFacebook} size="2x" />
//             </a>
//             <a href="https://www.instagram.com/al_ziyarah.pk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faInstagram} size="2x" />
//             </a>
//             <a href="https://www.tiktok.com/@alziyarah.pk" target="_blank" rel="noopener noreferrer">
//               <FontAwesomeIcon icon={faTiktok} size="2x" />
//             </a>
//           </div>
//         </nav>
//       </footer>
//     </>
//   );
// };

// export default Footer;
























import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-black text-white">
        <nav>
          <h6 className="footer-title text-text-white	 font-black">Services</h6> 
          <a className="link link-hover text-white">Order Process</a>
          <a className="link link-hover text-white">Delivered</a>
          <a className="link link-hover text-white">Cash on Delivery</a>
          <a className="link link-hover text-white">Customer Satisfaction</a>
        </nav> 
        <nav>
          <h6 className="footer-title text-text-white	 font-black">AlbariOutFits</h6> 
          <a className="link link-hover text-white">About Us</a>
          <a className="link link-hover text-white">Contact</a>
          <a className="link link-hover text-white">Jobs</a>
          <a className="link link-hover text-white">Press Kit</a>
        </nav> 
        <nav>
          <h6 className="footer-title text-text-white	 font-black">Social</h6> 
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.facebook.com/profile.php?id=61560558484647" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" className="text-white" />
            </a>
            <a href="https://www.instagram.com/al_ziyarah.pk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" className="text-white" />
            </a>
            <a href="https://www.tiktok.com/@alziyarah.pk" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} size="2x" className="text-white" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Footer;
