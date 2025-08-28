import React from 'react'
import styles from "./NotFound.module.css"
import error from "../../assets/images/error.svg"
export default function NotFound() {
  return (<>
    <title>NotFound</title>
    <div className="d-flex align-items-center justify-content-center vh-100">
      <img src={error} alt="Page Not Found" />
    </div>
  </>
  );
}
