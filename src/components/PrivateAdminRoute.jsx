import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdminRoute = () => {

    const user = useSelector(state => state.auth);

    console.log(user);

    return user?.user ? <Outlet/> : <Navigate to='/candidate-login'/>

}

export default PrivateAdminRoute