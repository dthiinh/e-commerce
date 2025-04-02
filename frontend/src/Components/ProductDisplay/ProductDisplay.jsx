import React from 'react'
import './ProductDisplay.css'
import star_icon from "../Assests/star_icon.png"
import star_dull_icon from "../Assests/star_icon.png"

const ProductDisplay = (props) => {
    const { product } = props
    return (
        <div className='productdisplay'>
            <div className='productdisplay-left'>
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className='productdisplay-right'>
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(100)</p>
                </div>
                <div className="productdispay-right-prices">
                    <div className="product-display-right-price-old">{product.old_price}k</div>
                    <div className="product-display-right-price-new">{product.new_price}k</div>
                </div>
                <div className="productdisplay-right-description">
                    yap yap yap yap bla bla bla .... bun ngu qua
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productisplay-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>
                <button>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latestp</p>
            </div>
        </div>
    )
}

export default ProductDisplay