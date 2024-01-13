import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../features/CartSlice';

const ProductComponent = () => {
  const products = useSelector((state) => state.products.list);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const cartItems = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  const [visibleProducts, setVisibleProducts] = useState(122);
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      scrolling
    ) {
      return;
    }
    setScrolling(true);
  };
  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      dispatch(
        addToCart({
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        })
      );
    } else {
      // If the product is not in the cart, add it with quantity 1
      dispatch(addToCart({ ...product, quantity: 1 }));
    }
  };

  useEffect(() => {
    if (!scrolling) return;
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
    setScrolling(false);
  }, [scrolling]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderProduct = products.slice(0, visibleProducts).map((product) => {
    const { id, title, images, price } = product;
    return (
      <div key={id} className='m-auto'>
        <Link to={`/product-detail/${id}`}>
          <Card className='w-[297px] h-[547px] mt-2'>
            <CardHeader
              shadow={false}
              floated={false}
              className='h-90 max-h-90'
            >
              <img
                src={images}
                alt={title}
                className='h-full w-full object-cover'
              />
            </CardHeader>
            <CardBody>
              <div className='mb-2 flex items-center justify-between'>
                <Typography color='blue-gray' className='font-medium'>
                  {title}
                </Typography>
                <Typography color='blue-gray' className='font-medium m-1'>
                  ₹{price}
                </Typography>
              </div>
              <Typography
                variant='small'
                color='gray'
                className='font-normal opacity-75'
              >
                With plenty of talk and listen time, voice-activated Siri
                access, and an available wireless charging case.
              </Typography>
            </CardBody>
            <CardFooter className='pt-0'>
              <Link to='/cart'>
                <Button
                  ripple={false}
                  fullWidth={true}
                  onClick={() => handleAddToCart(product)}
                  className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 bottom-0'
                >
                  Add to Cart
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </Link>
      </div>
    );
  });

  return (
    <div className='grid grid-cols-3'>
      {renderProduct}
      {scrolling && <div>Loading...</div>}
    </div>
  );
};

export default ProductComponent;
