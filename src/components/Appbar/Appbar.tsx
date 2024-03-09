import { NavLink } from "react-router-dom";

const Appbar: React.FC = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <NavLink to={"/"} className="nav-link">Finance Tracker</NavLink>
                </span>
                    <ul className="navbar-nav mr-auto flex-row flex-nowrap gap-3">
                        <li className="nav-item">
                            <NavLink to="/categories" className="nav-link">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/add-transaction" className="nav-link">Add</NavLink>
                        </li>
                    </ul>
            </div>
        </nav>
    );
  };
  
  export default Appbar;