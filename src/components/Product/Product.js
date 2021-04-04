import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {
    const { productName, price, weight, imageURL, _id } = props.product;
    return (
        <div className='single-product'>
            <div className="image-container">
                <img src={imageURL} alt="" />
            </div>
            <p className='title'>{productName} - {weight}</p>
            <div className='button-price-container'>
                <span className='price'>${price}</span>
                <Link to={`/checkOut/${_id}`}>
                    <button className="btn btn-buy">Buy now</button>
                </Link>

            </div>
        </div>
    );
};

export default Product;