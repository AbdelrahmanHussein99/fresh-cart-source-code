
import { Navigate } from "react-router-dom"
import styles from "./AuthProtectedRoutes.module.css"
export default function AuthProtectedRoutes({children}) {

  if (!localStorage.getItem("userToken"))
    return children 
  
  return <Navigate to="/" replace/>

}
