import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function Card({ product, handleLike, likedProducts }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const isLiked = likedProducts.includes(product);

  return (
    <div className="card">
      <button className="like-button" onClick={() => handleLike(product)}>
        {isLiked ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderIcon />}
      </button>
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <div className={`description ${expanded ? 'expanded' : 'collapsed'}`}>
        <p>{product.description}</p>
      </div>
      <Link to={`/product/${product.id}`} className="details-button">Learn More</Link>
    </div>
  );
}

export default Card;
