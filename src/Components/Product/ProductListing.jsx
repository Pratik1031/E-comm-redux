import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';

import ProductComponent from './ProductComponent';
import { Spinner } from '@material-tailwind/react';

const ProductListing = () => {
  const dispatch = useDispatch();
  const {
    list: products,
    status,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className=' flex items-center justify-center m-auto '>
        <Spinner className='h-12 w-12 m-auto' />
      </div>
    );
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
