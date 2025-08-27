import React from 'react'
import styles from "./Pagination.module.css"
export default function Pagination({totalPages, currentPage, onPageChange}) {
  if(totalPages<=1)return null
  return (
    <div className="row mt-3">
        <div className='col-12 d-flex align-items-center justify-content-center'>
          <button onClick={() => onPageChange((prev) => Math.max(1,prev-1))}
            disabled={currentPage === 1}
            className='btn btn-outline-success mx-2 '><i className="fa-solid fa-arrow-left"></i></button>
        <span className=' fw-bold d-inline-block mx-2'> page {currentPage} of { totalPages}</span>
          <button onClick={() => onPageChange((prev) => Math.min(totalPages,prev+1))}
            disabled={currentPage === totalPages}
            className='btn btn-outline-success mx-2 '><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
  )
}
