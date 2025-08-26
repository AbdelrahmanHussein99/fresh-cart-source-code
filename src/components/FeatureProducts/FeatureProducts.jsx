import styles from "./FeatureProducts.module.css"
import API from '../../api'
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";
import AddToCart from "../common/AddToCart/AddToCart";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../common/ErrorAlert/ErrorAlert";
import PriceRating from "../PriceRating/PriceRating";
import ProductTitle from "../ProductTitle/ProductTitle";
import WishlistBtn from "../common/WishlistBtn/WishlistBtn";
export default function FeatureProducts() {

  const fetchProducts= async () => {
      const { data } = await API.get("/products")
      console.log(data.data);
      return data.data
    }
  const {data=[],isLoading,isError,error} = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,
  })

  if (isLoading) {
    return <LoadingSpinner/>
  }
  if (isError) {
    const message = error.response?.data?.message || error.message || "Something went wrong"
    return <ErrorAlert message={message}/>
  }
  return (
    <>
      <div className="row">
        {
          data.map(product => (
            <div key={product._id} className=" col-md-3 col-sm-6 mb-2">
              <div className="product position-relative bg-light cursor-pointer overflow-hidden px-2 py-2 rounded-3">
                <WishlistBtn productId={product._id } />
                <Link className="cursor-pointer" to={`/productDetails/${product._id}`}>
                <div className=" mb-1">
                  <img src={ product.imageCover} className='w-100' alt={product.title} />
                </div>
                <p className='text-main'>{product.category.name}</p>
                {/* <h3 className="h5 text-truncate">{product.title.split(" ").slice(0,3).join(" ")}</h3> */}
                <ProductTitle title={product.title}  className="h5 text-truncate" />
                <PriceRating price={product.price} rating={product.ratingsAverage}/>
                </Link>
                <AddToCart  productId={product._id } />
              </div>
          </div>
          ))
        }

        </div>



    </>
  )
}
