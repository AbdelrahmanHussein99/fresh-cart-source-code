
import React, { Fragment } from 'react'
import { useClearAllCart, useGetCart, useRemoveCartItem, useUpdateCartItem } from '../../hooks/cartHooks'
import styles from "./Cart.module.css"
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert/ErrorAlert';

export default function Cart() {
  const { data,isLoading,isError,error } = useGetCart();
  const { mutate: updateCount } = useUpdateCartItem()
  const { mutate: deleteAll } = useClearAllCart()
  const { mutate: removeItem, isPending } = useRemoveCartItem()
  console.log(isLoading);
  
  if (isLoading) {
  return <LoadingSpinner/>
  }
  if (isError) {
      const message = error.response?.data?.message || error.message || "Something went wrong"
      return <ErrorAlert message={message}/>
    }
  return (
    <div className=" min-vh-100   py-4">
      <h2 className="fw-bold mb-4">🛒 My Cart</h2>
      {data?.numOfCartItems > 0 ? (
        <Fragment>
          <div className="my-4 p-3 shadow-sm rounded-3 bg-light">
            <h5 className="fw-bold">Cart Summary</h5>
            <p className="mb-1">Total Items: {data.data.products.length}</p>
            <p className="mb-2">
              Total Price: <span className="fw-bold text-success">${data.data.totalCartPrice}</span>
            </p>
            <button className="btn btn-success w-100 my-1">Proceed to Checkout</button>
            <button onClick={deleteAll} className="btn btn-danger w-100 my-2">Clear all cart</button>
          </div>
        
          <div className="row g-3">
            {data?.data?.products.map(item => (
              <Fragment key={item._id}>
                <div className="col-12">
                  <div className="card shadow-sm border-0 rounded-3">
                    <div className="card-body row align-items-center">
                    
                      {/* Product Image */}
                      <div className="col-md-2">
                        <img
                          className="w-100 rounded-2"
                          src={item.product.imageCover}
                          alt={item.product.title}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="col-md-6">
                        <h5 className="fw-semibold mb-1">{item.product.title}</h5>
                        <p className="text-muted mb-2">Price: {item.price} EGP</p>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="col-md-4 d-flex flex-column flex-md-row justify-content-end align-items-center gap-2">
                      
                        <div className="d-flex  flex-column justify-content-center">
                          <p >Quantity of Item</p>
                          <div className="d-flex mb-3 align-items-center  gap-2">
                            <button onClick={() => updateCount({ productId: item.product._id, count: item.count - 1 })} className=" border-1 border-success btn text-success btn-sm rounded-2">
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          
                            <span className="px-3 py-1 border rounded fw-semibold">
                              {item.count}
                            </span>
                          
                            <button onClick={() => updateCount({ productId: item.product._id, count: item.count + 1 })} className=" border-1 border-success btn text-success btn-sm rounded-2">
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.product._id)} disabled={isPending} className="btn btn-danger btn-sm d-flex align-items-center gap-1">
                            <i className="fa-solid fa-trash"></i> Remove
                          </button>
                        </div>

                      
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </Fragment>
      
      ) : <h2 className=' h1 dropShadow text-center text-main fw-bolder'>Cart is etmpy</h2>}
      
    </div>
  )
}
