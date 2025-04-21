import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewColections from '../Components/NewColections/NewColections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  return (
    <div>
      <NewColections/>
      <Popular/>
      <Offers/>
      <NewsLetter/>
    </div>
  )
}

export default Shop