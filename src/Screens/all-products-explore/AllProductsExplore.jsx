// import React, { useEffect, useState } from 'react';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Config/Firebase/Firebase';
// import { Card, CardMedia, CardContent, Typography, Rating, Box, Divider } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useTheme, useMediaQuery } from '@mui/material';

// const AllProductsExplore = () => {
//   const [products, setProducts] = useState([]);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         const productsCollection = collection(db, 'Product');
//         const querySnapshot = await getDocs(productsCollection);
//         const productsData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setProducts(productsData);
//         console.log(productsData);
//       } catch (error) {
//         console.error('Error fetching products: ', error);
//       }
//     };

//     fetchAllProducts();
//   }, []);

//   const handleCardClick = (id) => {
//     navigate(`/Product/${id}`);
//   };

//   return (
//     <div className="all-products-section " style={{ marginTop: '35px' }}>
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography
//           variant={isSmallScreen ? "h5" : "h4"}
//           component="h2"
//           fontWeight="bold"
//           sx={{
//             px: 2,
//             display: 'flex',
//             alignItems: 'center',
//             color: '#000',
//             whiteSpace: 'nowrap',
//             justifyContent: 'center'
//           }}
//         >
//           <span style={{ color: '#f968ae', width: '100%', marginRight: '10px' }}>——</span>
//           All Products
//           <span style={{ color: '#f968ae', width: '100%', marginLeft: '10px' }}>——</span>
//         </Typography>
//         <Divider flexItem sx={{ width: '100%', borderColor: 'pink' }} />
//       </Box>
//       <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ textAlign: 'center', mb: 4 }}>
//         Discover our full range of products
//       </Typography>

//       <Box
//         sx={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           gap: 2
//         }}
//       >
//         {products.map(product => (
//           <Card
//             key={product.id}
//             sx={{
//               backgroundColor: 'white',
//               border: 'none',
//               boxShadow: 'none',
//               maxWidth: 345,
//               margin: 2
//             }}
//             onClick={() => handleCardClick(product.id)}
//           >
//             <CardMedia
//               component="img"
//               height="200"
//               image={product.imageUrl}
//               alt={product.title}
//               sx={{ objectFit: 'contain' }} // Adjust this to 'cover' if you want the image to cover the entire area
//             />
//             <CardContent sx={{ backgroundColor: 'white', padding: 2 }}>
//               <Typography
//                 gutterBottom
//                 variant="h6"
//                 component="div"
//                 sx={{ cursor: 'pointer', fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'normal', color: '#000000' }}
//               >
//                 {`- ${product.name} -`}
//               </Typography>

//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Rating
//                   value={product.rating}
//                   precision={0.5}
//                   readOnly
//                   sx={{
//                     color: '#FFD700',
//                     '& .MuiRating-iconFilled': {
//                       fontSize: '1rem',
//                     },
//                     '& .MuiRating-iconEmpty': {
//                       fontSize: '1rem',
//                     },
//                   }}
//                 />
//                 <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
//                   ({product.totalRatings})
//                 </Typography>
//               </div>

//               <Typography variant="body1" sx={{ fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'light', color: '#000000', marginTop: 1 }}>
//                 {`Rs.${product.price}.00`}
//               </Typography>
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//     </div>
//   );
// };

// export default AllProductsExplore;

















import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Config/Firebase/Firebase';
import { Card, CardMedia, CardContent, Typography, Rating, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';


const AllProductsExplore = () => {
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const productsCollection = collection(db, 'Product');
        const querySnapshot = await getDocs(productsCollection);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/Product/${id}`);
  };

  return (
    <div className="all-products-section">
      <Box className="all-products-header">
        <Typography
          variant={isSmallScreen ? "h6" : "h4"}
          component="h2"
          fontWeight="bold"
          className="all-products-title"
          sx={{marginTop:'100px'}}
        >
          <span>——</span>
          Explore Your Adventure
          <span>——</span>
        </Typography>
        <Divider className="all-products-divider" />
      </Box>
      <Typography variant={isSmallScreen ? "body1" : "subtitle1"} className="all-products-subtitle">
        Discover our full range of products
      </Typography>

      <Box className="all-products-container">
        {products.map(product => (
          <Card
            key={product.id}
            className="all-products-cards"
            onClick={() => handleCardClick(product.id)}
          >
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.title}
            />
            <CardContent className="all-products-card-content">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="all-products-card-title"
                sx={{cursor:'pointer', fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'normal', color: '#000000' }}
              >
                {`- ${product.name} -`}
              </Typography>

              <div className="all-products-rating">
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
                  ({product.totalRatings})
                </Typography>
              </div>

              <Typography variant="body1" className="all-products-price">
                {`Rs.${product.price}.00`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default AllProductsExplore;
