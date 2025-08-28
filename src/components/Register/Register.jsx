import React, { useState } from 'react'
import styles from "./Register.module.css"
import {useFormik} from "formik"
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import API from '../../api';
import {  useRegisterAndLogin } from '../../hooks/authHooks';
import toast from 'react-hot-toast';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
export default function Register() {
  const {mutate:Register,isPending,isError,error}=useRegisterAndLogin();
  
  const navigate=useNavigate()

  
  async function register(values) {
    Register({url:"signup", values}, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
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
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <ErrorAlert message={message}/>
  }
  return (
    <>
      <title>Register</title>
      <div className="container my-5">
        <h1> Register</h1>
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
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
          <button disabled={isPending || !formik.isValid} type='submit' className='btn bg-main text-white ms-auto d-block'>{isPending?(<><i className='fa fa-spin fa fa-spinner'></i> Registering...</>) :"Register" }</button>
        </form>
      </div>
    </>
  )
}
