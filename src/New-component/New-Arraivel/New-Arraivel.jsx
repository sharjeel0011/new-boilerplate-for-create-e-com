
// import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../Config/Firebase/Firebase';
// import { Card, CardMedia, CardContent, Typography, Rating, Box, Divider } from '@mui/material';
// import { useTheme, useMediaQuery } from '@mui/material';


// const NewArrivals = () => {
//   const [newArrivals, setNewArrivals] = useState([]);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   useEffect(() => {
//     const fetchNewArrivals = async () => {
//       try {
//         const q = query(collection(db, 'Product'), where('campaigns', 'array-contains', 'New Arrival'));
//         const querySnapshot = await getDocs(q);                                         
//         const products = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setNewArrivals(products);
//         console.log(products);
//       } catch (error) {
//         console.error('Error fetching new arrivals: ', error);
//       }
//     };

//     fetchNewArrivals();
//   }, []);

//   return (
//     <div className="new-arrivals-section">
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
//           New Arrivals
//           <span style={{ color: '#f968ae', width: '100%', marginLeft: '10px' }}>——</span>
//         </Typography>
//         <Divider flexItem sx={{ width: '100%', borderColor: 'pink' }} />
//       </Box>
//       <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ textAlign: 'center', mb: 4 }}>
//         Embrace the Latest Trends - Shop our New Arrivals Selection
//       </Typography>

//       <div className="new-arrivals-container arrivals-list">
//         {newArrivals.slice(0, 4).map(product => (
//           <div className="new-arrival-item arrivals-item animate" key={product.id}>
//             <Card sx={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
//               <CardMedia
//                 component="img"
//                 height="200"
//                 image={product.imageUrl}
//                 alt={product.title}
//               />
//               <CardContent sx={{ backgroundColor: 'white', padding: 2 }}>
//                 <Typography
//                   gutterBottom
//                   variant="h6"
//                   component="div"
//                   sx={{ cursor: 'pointer', fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'normal', color: '#000000' }}
//                 >
//                   {`- ${product.name} -`}
//                 </Typography>

//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Rating
//                     value={product.rating}
//                     precision={0.5}
//                     readOnly
//                     sx={{
//                       color: '#FFD700', // Gold color for rating stars
//                       '& .MuiRating-iconFilled': {
//                         fontSize: '1rem', // Adjust the size of the filled stars
//                       },
//                       '& .MuiRating-iconEmpty': {
//                         fontSize: '1rem', // Adjust the size of the empty stars
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
//                     ({product.totalRatings})
//                   </Typography>
//                 </div>

//                 <Typography variant="body1" sx={{ fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'light', color: '#000000', marginTop: 1 }}>
//                   {`Rs.${product.price}.00`}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NewArrivals;












import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/Firebase/Firebase';
import { Card, CardMedia, CardContent, Typography, Rating, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';


const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const q = query(collection(db, 'Product'), where('campaigns', 'array-contains', 'New Arrival'));
        const querySnapshot = await getDocs(q);                                         
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setNewArrivals(products);
        console.log(products);
      } catch (error) {
        console.error('Error fetching new arrivals: ', error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/Product/${id}`);
  };

  return (
    <div className="new-arrivals-section">
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          component="h2"
          fontWeight="bold"
          sx={{
            px: 2,
            display: 'flex',
            alignItems: 'center',
            color: '#000',
            whiteSpace: 'nowrap',
            justifyContent: 'center'
          }}
        >
          <span style={{ color: '#000', width: '100%', marginRight: '10px' }}>——</span>
          New Arrivals
          <span style={{ color: '#000', width: '100%', marginLeft: '10px' }}>——</span>
        </Typography>
        <Divider flexItem sx={{ width: '100%', borderColor: 'pink' }} />
      </Box>
      <Typography variant={isSmallScreen ? "body1" : "subtitle1"} sx={{ textAlign: 'center', mb: 4 }}>
        Embrace the Latest Trends - Shop our New Arrivals Selection
      </Typography>

      <div className="new-arrivals-container arrivals-list">
        {newArrivals.slice(0, 4).map(product => (
          <div 
            className="new-arrival-item arrivals-item animate" 
            key={product.id}
            onClick={() => handleCardClick(product.id)}
          >
            <Card sx={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.title}
              />
              <CardContent sx={{ backgroundColor: 'white', padding: 2 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ cursor: 'pointer', fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'normal', color: '#000000' }}
                >
                  {`- ${product.name} -`}
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Rating
                    value={product.rating}
                    precision={0.5}
                    readOnly
                    sx={{
                      color: '#FFD700', // Gold color for rating stars
                      '& .MuiRating-iconFilled': {
                        fontSize: '1rem', // Adjust the size of the filled stars
                      },
                      '& .MuiRating-iconEmpty': {
                        fontSize: '1rem', // Adjust the size of the empty stars
                      },
                    }}
                  />
                  <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
                    ({product.totalRatings}0)
                  </Typography>
                </div>

                <Typography variant="body1" sx={{ fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'light', color: '#000000', marginTop: 1 }}>
                  {`Rs.${product.price}.00`}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;







