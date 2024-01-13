// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Spinner } from '@material-tailwind/react';
import { addToCart, updateQuantity } from '../../features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../Layout';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    if (!Array.isArray(cart)) {
      dispatch(addToCart(product));
      return;
    }
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      dispatch(
        updateQuantity({
          id: product.id,
          quantity: existingProduct.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleIncrement = () => {
    setProduct({ ...product, quantity: (product.quantity || 0) + 1 });
  };

  const handleDecrement = () => {
    if (product.quantity > 1) {
      setProduct({ ...product, quantity: product.quantity - 1 });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className=' flex items-center justify-center m-auto '>
        <Spinner className='h-12 w-12 m-auto' />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <Layout>
      <div className='flex justify-center h-[450px] items-center mt-2'>
        <div>
          <img
            src={product.images}
            alt='img'
            className='w-[400px] h-[397px] rounded-xl'
          />
        </div>
        <div className='w-[85%] flex flex-col justify-center items-start ml-4 p-5'>
          <h2 className='text-3xl font-semibold'>{product.title}</h2>
          <div>
            <p className='text-blue-gray-400 text-sm'>{product.description}</p>
          </div>
          <p className='text-2xl mt-2'> ₹{product.price}</p>
          <div className='flex gap-4 mt-4 items-center'>
            <div className='flex items-center'>
              <label className='mr-2'>Quantity:</label>
              <Button
                ripple={false}
                color='blue'
                onClick={handleDecrement}
                className='bg-blue-gray-900/10 text-blue-gray-900'
              >
                -
              </Button>
              <span className='mx-2'>{product.quantity || 1}</span>
              <Button
                ripple={false}
                color='blue'
                onClick={handleIncrement}
                className='bg-blue-gray-900/10 text-blue-gray-900'
              >
                +
              </Button>
            </div>
            <Link to='/cart'>
              <Button
                ripple={false}
                onClick={() => handleAddToCart(product)}
                className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bottom-0'
              >
                Add to Cart
              </Button>
            </Link>
            <Link to='/cart'>
              <Button
                ripple={false}
                onClick={() => handleAddToCart(product)}
                className='bg-black text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bottom-0'
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
