import Header from "../components/user/Header"
import { Outlet } from "react-router-dom"

const UserLayout = () => {
  return (
    <div className="">
     <Header/>
     <Outlet/>
    </div>
  )
}

export default UserLayout
