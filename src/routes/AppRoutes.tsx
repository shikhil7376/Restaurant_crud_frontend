import  { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';

const Home = lazy(()=>import('../pages/Home'))
const AppRoutes = () => {
  return (
     <Suspense>
        <Routes>
            <Route element={<UserLayout/>}>
            <Route path='/' element={<Home/>}/>
            </Route>
        </Routes>
     </Suspense>
  )
}

export default AppRoutes
