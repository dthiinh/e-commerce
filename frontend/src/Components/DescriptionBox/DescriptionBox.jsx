import React from 'react'
import './DescriptionBox.css'
import { ShopContext } from '../../Context/ShopContext'

const DescriptionBox = (props) => {
  const { product } = props;
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Mô tả</div>
            <div className="descriptionbox-nav-box fade">Đánh giá (0)</div>
        </div>
        <div className="descriptionbox-description">
            <p>{product.description}</p>
        </div>
    </div>
  )
}

export default DescriptionBox