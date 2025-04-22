import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Mô tả</div>
            <div className="descriptionbox-nav-box fade">Đánh giá (0)</div>
        </div>
        <div className="descriptionbox-description">
            <p>bla bla bla bla</p>
            <p>pla pla pla pla</p>
        </div>
    </div>
  )
}

export default DescriptionBox