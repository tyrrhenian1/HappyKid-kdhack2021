import { useLocation, Link } from "react-router-dom";
const Navbar = () => {
    const location = useLocation();
    debugger
    return(
        <>
        {location.pathname === '/account' ?
        <Link to="/">Домой</Link> :
        <Link to="/account">Личный кабинет</Link>
        }
        </>
    )
}

export { Navbar };