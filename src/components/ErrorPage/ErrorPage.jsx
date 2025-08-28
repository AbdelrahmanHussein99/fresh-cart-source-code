import React from 'react'
import styles from "./ErrorPage.module.css"
import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="container text-center mt-5">
      <h1>Oops! 🚨</h1>
      <p>Something went wrong while loading this page.</p>
      <pre className="text-danger">
        {error.statusText || error.message}
      </pre>
    </div>
  )
}
