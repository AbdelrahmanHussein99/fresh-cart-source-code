import React, { useState } from 'react'
import styles from "./Register.module.css"
import {useFormik} from "formik"
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import API from '../../api';
export default function Register() {

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate=useNavigate()
  // function validate(values) {
  //   const errors = {}
    
  //   if (!values.name) {
  //     errors.name="name is required"
  //   } else if (values.name.length < 6) {
  //     errors.name="name minimum length is 6"
  //   } else if (values.name.length > 25) {
  //     errors.name="name maximum length is 25"
  //   }


  //   if (!values.email) {
  //     errors.email="email is required"
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email="Invalid email address"
  //   } 


  //   if (!values.password) {
  //     errors.password="password is required"
  //   } else if (!/^[A-Z][a-z0-9]{5,8}$/i.test(values.password)) {
  //     errors.password = "Password must start with a capital letter and be 6–9 characters long (letters and numbers only)";
  //   } 

  //   if (!values.rePassword) {
  //     errors.rePassword="Please confirm your password"
  //   } else if (values.rePassword!== values.password) {
  //     errors.rePassword = "Passwords do not match";
  //   } 
  //   if (!values.phone) {
  //     errors.phone="phone is required"
  //   } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = "Invalid phone";
  //   } 

    
  //   return errors;
  // }
  
  async function register(values) {

    try {
      setErrorMessage('')
      setIsLoading(true)
      const {data}= await API.post("/auth/signup",values)
      console.log(data, "hi formik", values);
      
      if (data.message === "success") {
        navigate("/login");
      } 
      
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false)
    }
    
  }
  const ValidationSchema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(6, "name minimum length is 6")
      .max(25, "name maximum length is 25"),
    email: Yup.string()
      .required("email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,8}$/, "Password must start with a capital letter and be 6–9 characters long (letters and numbers only)"),
    rePassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
  })
  const formik = useFormik({
    initialValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    }, validateOnChange: true
    , validationSchema: ValidationSchema,
    onSubmit:(values)=> register(values)
      
    
  })
  return (
    <>
      <div className="container my-5">
        <h1> Register</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>

          {/* <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input type="text"  className='form-control' id='name' onChange={formik.handleChange}
              name='name' value={formik.values.name} onBlur={formik.handleBlur}/>
            {formik.touched.name && formik.errors.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:""}
          </div> */}
          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input type="text" className='form-control' id='name' name='name'
            {...formik.getFieldProps("name")}/> 
            {formik.touched.name && formik.errors.name ? <div className='alert alert-danger'>{formik.errors.name}</div>:""}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="email">E-mail</label>
            <input type="email" className='form-control' id='email' name='email'
              {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div>:""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <input type="password" className='form-control' id='password' name='password'
              {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? <div className='alert alert-danger'>{formik.errors.password}</div>:""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="rePassword">Repassword</label>
            <input type="password" className='form-control' id='rePassword' name='rePassword'
              {...formik.getFieldProps("rePassword")} />
            {formik.touched.rePassword && formik.errors.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div>:""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="phone">Phone</label>
            <input type="tel" className='form-control' id='phone'name='phone'
              {...formik.getFieldProps("phone")} />
            {formik.touched.phone && formik.errors.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div>:""}
          </div>
          <button disabled={isLoading || !formik.isValid} type='submit' className='btn bg-main text-white ms-auto d-block'>{isLoading?(<><i className='fa fa-spin fa fa-spinner'></i> Registering</>) :"Register" }</button>
        </form>
      </div>
    </>
  )
}
