import styles from "./ProtectedRoutes.module.css"
import { Navigate } from 'react-router-dom'
export default function ProtectedRoutes({children}) {
  if (localStorage.getItem("userToken"))
    return children 
  
  return <Navigate to="/login" replace/>
}
