import Sidebar from './Sidebar';
import RightSidebar from './RightSidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="app-container">
             {/* Mobile Header */}
            <header className="mobile-header">
                <div className="brand">ARTLINK</div>
                <div className="mobile-actions">
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-regular fa-paper-plane"></i>
                </div>
            </header>

            <aside className="sidebar">
                <Sidebar />
            </aside>

            {/* Main Content Rendered Here */}
            <Outlet />

            <aside className="right-sidebar">
                <RightSidebar />
            </aside>
        </div>
    );
};

export default Layout;
