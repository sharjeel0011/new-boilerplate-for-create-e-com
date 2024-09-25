import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Config/Firebase/Firebase';
import { Card, CardMedia, CardContent, Typography, Rating, Box, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

const Causal = () => {
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'Product'), where('category', '==', 'Perfum'));
        const querySnapshot = await getDocs(q);
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

    fetchProducts();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/Product/${id}`);
  };

  return (
    <div className="category-products-section">
      <Box className="category-products-header">
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          component="h2"
          fontWeight="bold"
          className="category-products-title"
          sx={{marginTop:'100px'}}
        >
          <span>——</span>
          Perfumes
          <span>——</span>
        </Typography>
        <Divider className="category-products-divider" />
      </Box>
      <Typography variant={isSmallScreen ? "body1" : "subtitle1"} className="category-products-subtitle">
        Browse our collection of Perfumes
      </Typography>

      <Box className="category-products-container">
        {products.map(product => (
          <Card
            key={product.id}
            className="category-products-cards"
            onClick={() => handleCardClick(product.id)}
          >
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.title}
            />
            <CardContent className="category-products-card-content">
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="category-products-card-title"
              >
                {`- ${product.name} -`}
              </Typography>

              <div className="category-products-rating">
                <Rating
                  value={product.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
                  ({product.totalRatings})
                </Typography>
              </div>

              <Typography variant="body1" className="category-products-price">
                {`Rs.${product.price}.00`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Causal;
