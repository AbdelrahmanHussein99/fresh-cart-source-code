import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import {useFormik} from "formik"
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { tokenContext } from '../../context/tokenContext';
import API from '../../api';
import { useRegisterAndLogin } from '../../hooks/authHooks';
import toast from 'react-hot-toast';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';
export default function Login() {
  const {mutate:Login,isPending,isError,error}=useRegisterAndLogin();
  const navigate = useNavigate()
  const{setToken}=useContext(tokenContext)
  async function login(values) {
    Login({ url: "signin", values }, {
      onSuccess: (res) => {
        localStorage.setItem("userToken", res.token)
        setToken(res.token)
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("password is required")
    .matches(/^[A-Z][a-z0-9]{5,8}$/, "Password must start with a capital letter and be 6–9 characters long (letters and numbers only)")
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password:"",
    }, validationSchema: validationSchema
    , validateOnChange: true
    ,onSubmit:(values)=>login(values),
  })
    if (isError) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return <ErrorAlert message={message}/>
    }
  return (
    <>
      <title>Login</title>
      <div className="container my-5">
        <h1> Login</h1>
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="email">E-mail</label>
            <input type="email" className='form-control' id='email' name='email'
              {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password">Password</label>
            <input type="password" className='form-control' id='password' name='password'
              {...formik.getFieldProps("password")} />
            {formik.touched.password && formik.errors.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
          </div>
          <button disabled={isPending || !formik.isValid} type='submit' className='btn bg-main text-white ms-auto d-block'>{isPending ? (<><i className='fa fa-spin fa fa-spinner'></i> Logging in...</>) : "login"}</button>
        </form>
      </div>
    </>
  )
}
