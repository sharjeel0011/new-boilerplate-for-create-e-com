
import React, { useRef } from 'react';
import TrendProductCard from './TrendingProducts';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useMediaQuery, useTheme } from '@mui/material';

const TrendProductList = ({ products }) => {
  const listRef = useRef(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Adjust the scroll amount as needed
    }
  };

  return (
    <div className="trend-product-list-container">
      <Box
        sx={{
          textAlign: 'center',
          marginBottom: '16px',
          padding: '8px',
          backgroundColor: '#fff',
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Divider flexItem sx={{ width: '100%', borderColor: '#pink' }} />
          <Typography
            variant={isSmallScreen ? "h5" : "h4"}
            component="h2"
            fontWeight="bold"
            sx={{
              px: 2,
              display: 'flex',
              alignItems: 'center',
              color: '#black',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color:'#000', width: '100%', marginRight: '10px' }}>——</span>
            Trending Products
            <span style={{color:'#000',  width: '100%', marginLeft: '10px' }}>——</span>
          </Typography>
          <Divider flexItem sx={{ width: '100%', borderColor: 'pink' }} />
        </Box>
        <Typography variant={isSmallScreen ? "body1" : "subtitle1"}>
          Embrace the Latest Trends - Shop our Trendy Outfit Selection
        </Typography>
      </Box>
      <IconButton
        className="scroll-button left"
        onClick={scrollLeft}
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
      >
        <NavigateBeforeIcon />
      </IconButton>
      <div className="trend-product-list" ref={listRef}>
        {products.map((product, index) => (
          <div key={index} className="trend-product-item">
            <TrendProductCard product={product} />
          </div>
        ))}
      </div>
      <IconButton
        className="scroll-button right"
        onClick={scrollRight}
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
      >
        <NavigateNextIcon />
      </IconButton>
    </div>
  );
};

export default TrendProductList;
