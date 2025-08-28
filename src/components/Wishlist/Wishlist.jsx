import React, { Fragment, useState } from 'react'
import styles from "./Wishlist.module.css"
import ErrorAlert from '../common/ErrorAlert/ErrorAlert'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import { useGetWishlist, useRemoveWishlist } from '../../hooks/wishlistHooks'
import AddToCart from '../common/AddToCart/AddToCart'
import { Link } from 'react-router-dom'
export default function Wishlist() {
  const { data, isLoading, isError, error } = useGetWishlist();


const { mutate: removeItem } = useRemoveWishlist();
const [removingId, setRemovingId] = useState(null);
  const handleRemoveWishlist = (id) => {
    setRemovingId(id)
    removeItem(id, {
      onSettled:()=>setRemovingId(null)
    })
  }
  if (isLoading) return <LoadingSpinner />;
    if (isError) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return <ErrorAlert message={message} />;
  };
  return (
    <>
      <title>Wishlist</title>
      <div className=" min-vh-100  py-4">
        <h2 className="fw-bold mb-4 heading-underline">My Wishlist ❤️ </h2>
        {
          data.count ?
            <div className="row g-3">
              {data?.data.map(item => (
                <Fragment key={item._id}>
                  <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-3">
                      <div className="card-body row align-items-center">
              
                        {/* Product Image */}
                        <div className="col-md-2">
                          <img
                            className="w-100 rounded-2"
                            src={item.imageCover}
                            alt={item.title}
                          />
                        </div>
                        {/* Product Info */}
                        <div className="col-md-6">
                          <h5 className="fw-semibold mb-1">{item.title}</h5>
                          <p className="text-muted mb-2">Price: {item.price} EGP</p>
                        </div>
                        {/* Quantity & Actions */}
                        <div className="col-md-4 d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                
                          <div className="d-flex  flex-column justify-content-center">
                            <div className="d-flex mb-3 align-items-center  gap-2">
                              <AddToCart productId={item._id} />
                            </div>
                            <button onClick={() => handleRemoveWishlist(item._id)} disabled={removingId === item._id} className="btn mb-3 btn-danger btn-sm d-flex align-items-center gap-1">
                              <i className="fa-solid fa-trash"></i> {removingId === item._id ? "Remove..." : "Remove"}
                            </button>
                            <Link className='btn bg-main w-100 text-white' to={`/productDetails/${item._id}`}>See Details</Link>
                          </div>
                
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div> : <h2 className=' h1 dropShadow text-center text-main fw-bolder'>Wishlist is empty</h2>
        }
      </div>
    </>
  );
    
}
