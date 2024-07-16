import React, { useState } from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Home = ({ products, bannerData }) => {
  const [cart, setCart] = useState({});

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product._id]) {
        newCart[product._id].quantity += 1;
      } else {
        newCart[product._id] = { ...product, quantity: 1 };
      }
      return newCart;
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[product._id] && newCart[product._id].quantity > 1) {
        newCart[product._id].quantity -= 1;
      } else {
        delete newCart[product._id];
      }
      return newCart;
    });
  };

  return (
    <>
      <div>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
        {console.log(bannerData)}

        <div className="products-heading">
          <h2>TODAY'S MENU</h2>
          <p>Newly Launched</p>
        </div>

        <div className="products-container">
          {products?.map((product) => (
            <div key={product._id} className="product-item">
              <Product product={product} />
              <div className="quantity-desc">
                <span className="minus" onClick={() => removeFromCart(product)}>
                  <AiOutlineMinus />
                </span>
                <span className="num">{cart[product._id]?.quantity || 0}</span>
                <span className="plus" onClick={() => addToCart(product)}>
                  <AiOutlinePlus />
                </span>
              </div>
            </div>
          ))}
        </div>

        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
