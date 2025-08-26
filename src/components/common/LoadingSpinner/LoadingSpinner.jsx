import React from 'react'
import styles from "./LoadingSpinner.module.css"
import { HashLoader } from "react-spinners";
export default function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100  ">
      <HashLoader color="#4fa94d" size={80} />
    </div>
  )
}
