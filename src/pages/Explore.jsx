import { useState } from 'react';
import { useData } from '../context/DataContext';

const Explore = () => {
    const { posts, currentUser } = useData();
    const [activeTab, setActiveTab] = useState('All');
    const tabs = ['All', 'Dance', 'Singing/Rap', 'Visual Art', 'Digital Art', 'Literature', 'Media Art'];

    // Mock filtering logic - real logic would filter by category if data supported it robustly
    // For now we just show all or shuffle for effect if "All" isn't selected, 
    // but in a real app check post.category
    const displayPosts = activeTab === 'All' ? posts : posts.filter(p => p.category === activeTab || Math.random() > 0.7);

    return (
        <main className="explore-main">
            <div className="search-bar-container">
                <div className="search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search for art or artist" />
                </div>
                 <div className="top-actions">
                    <i className="fa-regular fa-bell"></i>
                    <i className="fa-regular fa-paper-plane"></i>
                    {currentUser && <img src={currentUser.avatar} alt="Profile" className="user-avatar-sm" />}
                </div>
            </div>

            <div className="tabs-container">
                {tabs.map(tab => (
                    <button 
                        key={tab} 
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="masonry-grid">
                {displayPosts.map((post, index) => {
                    let gridClass = '';
                    if (index % 5 === 0) gridClass = 'large';
                    else if (index % 7 === 0) gridClass = 'wide';
                    else if (index % 4 === 0) gridClass = 'tall';
                    
                    return (
                        <div className={`grid-item ${gridClass}`} key={post.id} style={{position: 'relative'}}>
                            <img src={post.image} alt="Art" />
                             <div className="grid-overlay" style={{
                                 position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                                 background: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity 0.2s',
                                 display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                                 pointerEvents: 'none' /* Simple hover effect requiring CSS or JS event listeners */
                             }}
                             >
                                <div className="overlay-info">
                                    <i className="fa-solid fa-heart"></i> {post.likes}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
export default Explore;
