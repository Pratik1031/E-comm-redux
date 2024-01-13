import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from '../../features/CartSlice';
import { Button, Card } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  if (!items || items.length === 0) {
    return (
      <div className='flex justify-center items-center mt-[20%] mb-[20%]'>
        Your cart is empty.
      </div>
    );
  }

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  return (
    <>
      <h2 className='flex justify-center items-center mt-2'>Shopping Cart</h2>
      <Card className='flex justify-center items-center flex-col mt-4 max-h-[500px] overflow-y-auto'>
        <table className='w-full mt-4 p-2'>
          <thead>
            <tr>
              <th className='bg-blue-gray-100'>Product</th>
              <th className='bg-blue-gray-100'>Product Name</th>
              <th className='bg-blue-gray-100'>Quantity</th>
              <th className='bg-blue-gray-100'>Subtotal</th>
              <th className='bg-blue-gray-100'></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className='border-black border-b border-solid border-0'
              >
                <td className=' p-2 m-2 justify-center items-center flex'>
                  <img
                    src={item.images}
                    alt={item.title}
                    className='w-20 h-20 rounded-xl'
                  />
                </td>
                <td className=' text-center'>{item.title}</td>
                <td className=' text-center'>
                  <div className='flex items-center justify-center'>
                    <Button
                      ripple={false}
                      color='black'
                      variant='outlined'
                      size='sm'
                      onClick={() => handleDecrement(item)}
                      className=' text-blue-gray-900 mx-1'
                    >
                      -
                    </Button>
                    <p>{item.quantity}</p>
                    <Button
                      ripple={false}
                      color='black'
                      size='sm'
                      variant='outlined'
                      onClick={() => handleIncrement(item)}
                      className=' text-blue-gray-900 mx-2'
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td className=' text-center'>
                  Rs.{item.price * item.quantity}
                </td>
                <td className=''>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokewidth='1.5'
                    stroke='red'
                    className='w-6 h-6'
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    <path
                      strokelinecap='round'
                      strokelinejoin='round'
                      d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan='3' className='bg-blue-gray-100 text-center'>
                Total
              </td>
              <td className='bg-blue-gray-100 text-center'>Rs.{total}</td>
            </tr>
          </tfoot>
        </table>
      </Card>
      <Link to='/checkout'>
        <Button className='mt-3'>Checkout</Button>
      </Link>
    </>
  );
};

export default Cart;
