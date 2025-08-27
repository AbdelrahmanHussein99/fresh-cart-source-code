import React from 'react'
import styles from "./ErrorAlert.module.css"
export default function ErrorAlert({message}) {
  return (
<div className=" my-5 alert alert-danger">{message}</div>  )
}
