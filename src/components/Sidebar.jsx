import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Sidebar = () => {
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path ? 'active' : '';

    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="sidebar-content">
            <div className="brand-logo">ARTLINK</div>
            <nav className="nav-menu">
                <Link to="/" className={`nav-item ${isActive('/')}`}>
                    <i className="fa-solid fa-house"></i>
                    <span>Home</span>
                </Link>
                <Link to="/explore" className={`nav-item ${isActive('/explore')}`}>
                    <i className="fa-regular fa-compass"></i>
                    <span>Explore</span>
                </Link>
                <Link to="/create" className={`nav-item ${isActive('/create')}`}>
                    <i className="fa-regular fa-square-plus"></i>
                    <span>Create</span>
                </Link>
                <Link to="/profile" className={`nav-item ${isActive('/profile')}`}>
                    <i className="fa-regular fa-user"></i>
                    <span>Profile</span>
                </Link>
                <div className="nav-item" onClick={() => setDarkMode(!darkMode)} style={{cursor: 'pointer'}}>
                    <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
            </nav>

            <div className="sidebar-section">
                <h3>Your Community</h3>
                <ul className="community-list">
                    <li>
                        <img src="https://ui-avatars.com/api/?name=C1&background=random" alt="C1" />
                        <span>Community 1</span>
                        <span className="dot"></span>
                    </li>
                    <li>
                        <img src="https://ui-avatars.com/api/?name=CX&background=random" alt="CX" />
                        <span>Community xyz...</span>
                    </li>
                    <li>
                        <img src="https://ui-avatars.com/api/?name=C2&background=random" alt="C2" />
                        <span>Community 2</span>
                        <span className="dot"></span>
                    </li>
                </ul>
            </div>

            <div className="sidebar-section">
                <h3>Suggested Community</h3>
                <ul className="community-list">
                    <li>
                        <img src="https://ui-avatars.com/api/?name=C1&background=random" alt="C1" />
                        <span>Community 1</span>
                    </li>
                    <li>
                        <img src="https://ui-avatars.com/api/?name=C2&background=random" alt="C2" />
                        <span>Community 2</span>
                    </li>
                    <li>
                        <img src="https://ui-avatars.com/api/?name=C3&background=random" alt="C3" />
                        <span>Community 3</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
