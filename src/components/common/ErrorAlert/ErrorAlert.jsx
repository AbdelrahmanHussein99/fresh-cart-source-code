import React from 'react'
import styles from "./ErrorAlert.module.css"
export default function ErrorAlert({message}) {
  return (
<div className="alert alert-danger">{message}</div>  )
}
