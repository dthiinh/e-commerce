import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assests/star_icon.png"
import star_dull_icon from "../Assests/star_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props
    const { addToCart } = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState(null);
    const [showSizeError, setShowSizeError] = useState(false);

    const handleAddToCart = () => {
        if (selectedSize) {
            addToCart(product.id, selectedSize);
            setShowSizeError(false);
            console.log(`Đã thêm sản phẩm size ${selectedSize} vào giỏ hàng!`);
        } else {
            setShowSizeError(true);
        }
    }

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
                <div className="productdisplay-right-price">
                    <div className="productdisplay-right-price-old">{product.old_price}k</div>
                    <div className="productdisplay-right-price-new">{product.new_price}k</div>
                </div>
                <div className="productdisplay-right-description">
                    yap yap yap yap bla bla bla .... bun ngu qua
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div 
                            className={`size-option ${selectedSize === 'S' ? 'selected' : ''}`} 
                            onClick={() => setSelectedSize('S')}
                        >S</div>
                        <div 
                            className={`size-option ${selectedSize === 'M' ? 'selected' : ''}`} 
                            onClick={() => setSelectedSize('M')}
                        >M</div>
                        <div 
                            className={`size-option ${selectedSize === 'L' ? 'selected' : ''}`} 
                            onClick={() => setSelectedSize('L')}
                        >L</div>
                        <div 
                            className={`size-option ${selectedSize === 'XL' ? 'selected' : ''}`} 
                            onClick={() => setSelectedSize('XL')}
                        >XL</div>
                    </div>
                    {showSizeError && <p className="size-error">Vui lòng chọn size trước khi thêm vào giỏ hàng!</p>}
                </div>
                <button onClick={handleAddToCart}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category: </span>Women, T-Shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tags: </span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay