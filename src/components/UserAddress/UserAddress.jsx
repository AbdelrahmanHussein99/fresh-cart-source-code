import React from 'react'
import styles from "./UserAddress.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useCheckoutSession } from '../../hooks/ordersHooks';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function UserAddress() {
   const location = useLocation();
  const cartId = location.state?.cartId;
  const { mutate: checkOutSession, data, isError, isPending, error } = useCheckoutSession();
   console.log(data);
  
  const handleSubmit = (values) => {
    checkOutSession({ cartId, shippingAddress:{...values} }, {
      onSuccess: (res) => {
        window.location.href = res.session.url;
      }, onError: (err) => {
        toast.error(err.message)
      }
    })
    console.log("sub");
    
  }
    const ValidationSchema = Yup.object({
      details: Yup.string()
        .required("details is required")
        .min(10, "details minimum length is 10")
        .max(150, "details maximum length is 150"),
      phone: Yup.string()
        .required("phone number is required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
      city: Yup.string()
        .required("city is required")
        .min(4, "city minimum length is 4")
        .max(25, "city maximum length is 25"),
    })
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    }, onSubmit: handleSubmit,
    validateOnChange: true,
    validationSchema:ValidationSchema
  })
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <ErrorAlert message={message} />;
  }
  return (
    < >
      <title>Proceed to Checkout</title>
      <h2 className='my-4 heading-underline'>Enter your address </h2>
      <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="details">Details</label>
          <input type="text" className='form-control' id='details' name='details'
            {...formik.getFieldProps("details")} />
          {formik.touched.details && formik.errors.details ? <div className='alert alert-danger'>{formik.errors.details}</div> : ""}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="phone">Phone</label>
          <input type="tel" className='form-control' id='phone' name='phone'
            {...formik.getFieldProps("phone")} />
          {formik.touched.phone && formik.errors.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="city">city</label>
          <input type="text" className='form-control' id='city' name='city'
            {...formik.getFieldProps("city")} />
          {formik.touched.city && formik.errors.city ? <div className='alert alert-danger'>{formik.errors.city}</div> : ""}
        </div>
        <button disabled={isPending || !formik.isValid} type='submit' className='btn bg-main text-white ms-auto d-block'>
          {isPending ? (<><i className='fa fa-spin fa fa-spinner'></i> Proceed...</>) : "Proceed"}</button>
      </form>
    </>
  );
}
