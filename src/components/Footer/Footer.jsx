import React from 'react'
import styles from "./Footer.module.css"
export default function Footer() {
  return (
     <footer className={"  bottom-0 mt-5 py-4 bg-dark text-light text-center "}>
      <div className="container">
        {/* Logo / Brand */}
        <h4 className="fw-bold mb-3">Fresh Cart</h4>


        {/* Social icons */}
        <div className="mb-3">
          <a href="#"target='_blank' className="text-light mx-2"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="#"target='_blank' className="text-light mx-2"><i className="fab fa-x fa-lg"></i></a>
          <a href="#"target='_blank' className="text-light mx-2"><i className="fab fa-instagram fa-lg"></i></a>
        </div>

        {/* Copyright */}
        <p className="mb-0 small">&copy; {new Date().getFullYear()} Fresh Cart. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
