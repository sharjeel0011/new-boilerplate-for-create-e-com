
// // ok he ye wala su se best version 1
// import React from 'react';
// import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';

// const TrendProductCard = ({ product }) => {

// function productDetail(){

// }

//   return (
//     <Card   className="trend-product-item" sx={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}>
//       <CardMedia
//         component="img"
//         height="200"
//         image={product.imageUrl
//         }
//         alt={product.title}
//       />
//       <CardContent sx={{ backgroundColor: 'white', padding: 2 }}>
//         <Typography 
//           gutterBottom 
//           variant="h6" 
//           component="div" 
//           sx={{cursor:'pointer', fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'normal', color: '#000000' }}>
//           {`- ${product.name} -`}
//         </Typography>
       
      

// <div style={{ display: 'flex', alignItems: 'center' }}>
//       <Rating
//         value={product.rating}
//         precision={0.5}
//         readOnly
//         sx={{
//           color: '#FFD700', // Gold color for rating stars
//           '& .MuiRating-iconFilled': {
//             fontSize: '1rem', // Adjust the size of the filled stars
//           },
//           '& .MuiRating-iconEmpty': {
//             fontSize: '1rem', // Adjust the size of the empty stars
//           },
//         }}
//       />
//       <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
//         ({product.totalRatings}0)
//       </Typography>
//     </div>

//         <Typography variant="body1" sx={{ fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'light', color: '#000000', marginTop: 1 }}>
//           {`Rs.${product.price}.00`}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default TrendProductCard;







import React from 'react';
import { Card, CardMedia, CardContent, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TrendProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Product/${product.id}`);
  };

  return (
    <Card 
      className="trend-product-item" 
      sx={{ backgroundColor: 'white', border: 'none', boxShadow: 'none' }}
      onClick={handleCardClick}
    >
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
          sx={{cursor:'pointer', fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'normal', color: '#000000' }}
        >
          {`- ${product.name} -`}
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            value={product.rating+0}
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
            ({product.totalRatings})
          </Typography>
        </div>

        <Typography variant="body1" sx={{ fontSize: '13px', fontFamily: 'futura, sans-serif', fontWeight: 'light', color: '#000000', marginTop: 1 }}>
          {`Rs.${product.price}.00`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TrendProductCard;






