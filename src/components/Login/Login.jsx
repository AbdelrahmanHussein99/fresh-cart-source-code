import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import {useFormik} from "formik"
import * as Yup from 'yup';
import {  useNavigate } from 'react-router-dom';
import { tokenContext } from '../../context/tokenContext';
import API from '../../api';
export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const{setToken}=useContext(tokenContext)
  async function login(values) {
    try {
      setErrorMessage('')
      setIsLoading(true)
      const {data}= await API.post("/auth/signin",values)
      console.log(data, values);
      if (data.message === "success") {
        navigate("/");
        localStorage.setItem("userToken",data.token)
        setToken(data.token)
      } 
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false)
    }
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
   return (
    <>
      <div className="container my-5">
        <h1> Login</h1>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>


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
          <button disabled={isLoading || !formik.isValid} type='submit' className='btn bg-main text-white ms-auto d-block'>{isLoading?(<><i className='fa fa-spin fa fa-spinner'></i> Logging in</>) :"login" }</button>
        </form>
      </div>
    </>
  )
}
