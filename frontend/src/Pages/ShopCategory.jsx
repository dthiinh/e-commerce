import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assests/dropdown_icon.png'
import Item from '../Components/item/Item'
import { Link } from 'react-router-dom'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)
  const [menu, setMenu] = useState();
  
  return (
    <div className='shop-category'>
      <Link to='/'><img className='shopcategory-banner' src={props.banner} alt=""  onClick={() => { setMenu("shop") }}/></Link>
      <div className="shopcategory-indexSort">
        <p>
          <span>Hiển thị 1-12</span> trong số 36 sản phẩm
        </p>
        <div className="shopcategoryy-sort">
          Xếp theo <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
          }
          else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">
        Thêm
      </div>
    </div>
  )
}

export default ShopCategory