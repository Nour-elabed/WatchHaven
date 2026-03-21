// shared/ProductSlideCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

export type ProductSlideCardProps = {
  image: string;
  cartIcon: string;
  description: string;
  price: string;
  bottomText: string;
  bottomImage: string;
  starIcon: string;
  rating: string;
};

export const ProductSlideCard: React.FC<ProductSlideCardProps> = ({
  image,
  cartIcon,
  description,
  price,
  bottomText,
  bottomImage,
  starIcon,
  rating,
}) => {
  return (
    <div className="product-card">
      
      <div className="product-card__image-container">
        <img src={image} alt={description} className="product-card__image" />
        <Link to="/shop">
          <button className="product-card__cart-btn hover:scale-105 transition-transform" aria-label="Go to shop">
            <img src={cartIcon} alt="Add to cart" className="product-card__cart-icon" />
          </button>
        </Link>
      </div>

    
      <div className="product-card__content">
        
        <div className="product-card__first-row">
          <h3 className="product-card__title ">{description}</h3>
          <span className="product-card__current-price">{price}</span>
        </div>

        
        <div className="product-card__second-row">
          <span className="product-card__category-text">{bottomText}</span>
          <img src={bottomImage} alt="Price" className="product-card__price-icon" />
        </div>

      
        <div className="product-card__third-row">
          <img src={starIcon} alt="Rating" className="product-card__star-icon" />
          <span className="product-card__rating-text">{rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductSlideCard;