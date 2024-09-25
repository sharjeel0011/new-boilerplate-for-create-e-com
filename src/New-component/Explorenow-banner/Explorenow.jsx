// import React from 'react';
// import { Button, Typography, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// const ExploreNow = () => {
//   const navigate = useNavigate();
//   return (
//     <Box 
//       sx={{
//         position: 'relative',
//         width: '100%',
//         height: '400px',
//         backgroundImage: 'url("https://malbus.com.pk/cdn/shop/articles/banner_blog.jpg?v=1692775995")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'white',
//         textAlign: 'center'
//       }}
//     >
//       <Box 
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)'
//         }}
//       />
//       <Box 
//         sx={{
//           position: 'relative',
//           zIndex: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center'
//         }}
//       >
//         <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
//          AL-ZIYARAH_FASHIONS
//         </Typography>
//         <Typography variant="h5" component="p" sx={{ mb: 4 }}>
//           Your Fashion Adventure Starts Here
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="secondary" 
//           size="large" 
//           sx={{ textTransform: 'none', backgroundColor: '#f968ae' }}
//           onClick={()=>{ navigate(`/ExploreProducts`)}}
//         >
//           Explore Now
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default ExploreNow;






















import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExploreNow = () => {
  const navigate = useNavigate();
  return (
    <Box 
      sx={{
        position: 'relative',
        width: '100%',
        height: '400px', // Default height
        backgroundImage: 'url("https://malbus.com.pk/cdn/shop/articles/banner_blog.jpg?v=1692775995")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        '@media (max-width: 600px)': {
          height: '300px', // Smaller height for mobile screens
        },
        '@media (max-width: 400px)': {
          height: '250px', // Further adjustment for very small screens
        }
      }}
    >
      {/* Overlay */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      />
      
      {/* Content Box */}
      <Box 
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: 2, // Padding for small screens
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2, 
            '@media (max-width: 600px)': { 
              fontSize: '1.8rem' // Adjust font size for mobile
            }
          }}
        >
          AL-ZIYARAH FASHIONS
        </Typography>
        
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ 
            mb: 4,
            '@media (max-width: 600px)': { 
              fontSize: '1.2rem' // Adjust font size for mobile
            }
          }}
        >
          Your Fashion Adventure Starts Here
        </Typography>
        
        <Button 
          variant="contained" 
          color="secondary" 
          size="large" 
          sx={{ 
            textTransform: 'none', 
            backgroundColor: '#f968ae',
            '@media (max-width: 600px)': { 
              fontSize: '0.875rem', // Smaller button text on mobile
              padding: '8px 16px'  // Smaller padding for the button
            }
          }}
          onClick={() => { navigate(`/ExploreProducts`) }}
        >
          Explore Now
        </Button>
      </Box>
    </Box>
  );
}

export default ExploreNow;
