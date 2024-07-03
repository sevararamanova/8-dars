import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './ProductDetails.css';


function ProductDetails({ handleLike, likedProducts }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const isLiked = likedProducts && likedProducts.includes(product);

  return (
    <div className="product-details">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{color:'#f06292'}}>{product.title}</h1>
        

      </div>
      <img src={product.thumbnail} alt={product.title} />
      <p style={{color:'grey',textAlign:'center'}}> {product.description}</p>
      <p className="price">Price: ${product.price}</p>
      <p className="rating">Rating: {product.rating}</p>
    </div>
  );
}

export default ProductDetails;
