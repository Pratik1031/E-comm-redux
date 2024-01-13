import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setUserName, setUserAddress } from '../../features/userSlice';
import {
  setCardNumber,
  setExpiryDate,
  setCvv,
} from '../../features/paymentSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from '@material-tailwind/react';

const schema = yup.object().shape({
  username: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  cardNumber: yup.string().required('Card number is required'),
  expiryDate: yup.string().required('Expiry date is required'),
  cvv: yup.string().required('CVV is required'),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const userName = useSelector((state) => state.user.username) || '';
  const userAddress = useSelector((state) => state.user.address) || '';
  const cardNumber = useSelector((state) => state.payment.cardNumber) || '';
  const expiryDate = useSelector((state) => state.payment.expiryDate) || '';
  const cvv = useSelector((state) => state.payment.cvv) || '';
  const cartItems = useSelector((state) => state.cart.items) || [];

  const [orderSummary, setOrderSummary] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);

  const onSubmit = (data, e) => {
    dispatch(setUserName(data.username));
    dispatch(setUserAddress(data.address));
    dispatch(setCardNumber(data.cardNumber));
    dispatch(setExpiryDate(data.expiryDate));
    dispatch(setCvv(data.cvv));

    // Fetch cart items and calculate total amount
    const items = cartItems.map((item) => ({
      name: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setTotalAmount(total);
    setOrderSummary({
      username: data.username,
      address: data.address,
      products: items,
      totalAmount: total,
    });

    // Show success toast
    toast.success('Order placed successfully!', {
      position: 'top-right',
      autoClose: 3000, // 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });

    e.target.reset();
    // You can also show order summary or navigate to a new page here
    console.log('Form submitted:', data);
  };
  const handleOpen = () => setOpen(!open);

  return (
    <Card className='flex justify-center items-center mt-4'>
      <h1 className='text-2xl font-bold'>Basic Details</h1>
      <form onSubmit={handleSubmit((data, e) => onSubmit(data, e))}>
        <div>
          <Controller
            name='username'
            control={control}
            defaultValue={userName}
            render={({ field }) => (
              <div>
                <label htmlFor='username'>Name:</label>
                <Input
                  type='text'
                  id='username'
                  placeholder='Enter your name'
                  {...field}
                />
              </div>
            )}
          />
        </div>
        <div>
          <Controller
            name='address'
            control={control}
            defaultValue={userAddress}
            render={({ field }) => (
              <div>
                <label htmlFor='address'>Address:</label>
                <Input
                  type='text'
                  id='address'
                  placeholder='Enter your address'
                  {...field}
                />
              </div>
            )}
          />
        </div>

        <h2 className='text-2xl font-bold mt-2'>Payment Details</h2>
        <div>
          <label htmlFor='cardNumber'>Card Number:</label>
          <Controller
            name='cardNumber'
            control={control}
            defaultValue={cardNumber}
            render={({ field }) => (
              <div>
                <Input
                  type='text'
                  id='cardNumber'
                  placeholder='Enter your card number'
                  {...field}
                />
                {/* <p>{errors.cardNumber?.message}</p> */}
              </div>
            )}
          />
        </div>
        <div>
          <Controller
            name='expiryDate'
            control={control}
            defaultValue={expiryDate}
            render={({ field }) => (
              <div>
                <label htmlFor='expiryDate'>Expiry Date:</label>
                <Input
                  type='text'
                  id='expiryDate'
                  placeholder='Enter expiry date'
                  {...field}
                />
                {/* <p>{errors.expiryDate?.message}</p> */}
              </div>
            )}
          />
        </div>
        <div>
          <Controller
            name='cvv'
            control={control}
            defaultValue={cvv}
            render={({ field }) => (
              <div>
                <label htmlFor='cvv'>CVV:</label>
                <Input
                  type='text'
                  id='cvv'
                  placeholder='Enter your CVV'
                  {...field}
                />
                {/* <p>{errors.cvv?.message}</p> */}
              </div>
            )}
          />
        </div>
        <Button type='submit' className='mt-2' onClick={handleOpen}>
          Submit
        </Button>
      </form>
      {orderSummary && (
        <div>
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Order Summary</DialogHeader>
            <DialogBody>
              <p>Name: {orderSummary.username}</p>
              <p>Address: {orderSummary.address}</p>
              <h3>Products:</h3>
              <ul>
                {orderSummary.products.map((product, index) => (
                  <li
                    key={index}
                  >{`${product.name}: ₹${product.price} (Qty: ${product.quantity})`}</li>
                ))}
              </ul>
              <p>Total Amount: ${totalAmount}</p>
            </DialogBody>
          </Dialog>
        </div>
      )}

      <ToastContainer />
    </Card>
  );
};

export default Checkout;
