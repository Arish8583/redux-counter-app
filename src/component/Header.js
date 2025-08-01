import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {  getcount, increaseCount } from "../features/posts/postSlice"


const Header = () => {
    const dispatch = useDispatch();
    const count = useSelector(getcount);


    return (
        <header className="Header">
            <h1>Redux Blog</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to="users">Users</Link></li>
                </ul>

                <button
                    onClick={() =>
                        dispatch(increaseCount())
                    }
                >{count}</button>
                
            </nav>
        </header>
    )
}

export default Header