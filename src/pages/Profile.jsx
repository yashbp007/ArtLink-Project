import { useData } from '../context/DataContext';
import { useState } from 'react';

const Profile = () => {
    const { currentUser,  posts } = useData();
    const [activeTab, setActiveTab] = useState('posts');

    if (!currentUser) return <div>Loading...</div>;

    const myPosts = posts.filter(p => p.userId === 'me' || p.userId === currentUser.id);

    return (
        <main className="profile-main">
            <div className="profile-cover"></div>
            
            <div className="profile-info-container">
                <div className="profile-avatar-large">
                    <img src={currentUser.avatar} alt="Profile" />
                </div>
                
                <div className="profile-details">
                    <div className="profile-name-row">
                        <h1>{currentUser.name}</h1>
                        <button className="btn btn-outline" style={{padding: '8px 16px'}}>Edit Profile</button>
                        <i className="fa-solid fa-gear" style={{fontSize: '20px', cursor: 'pointer'}}></i>
                    </div>
                    
                    <div className="profile-stats">
                        <div className="stat-item"><span className="stat-value" style={{fontWeight: '700'}}>{myPosts.length}</span> posts</div>
                        <div className="stat-item"><span className="stat-value" style={{fontWeight: '700'}}>{currentUser.followers}</span> followers</div>
                        <div className="stat-item"><span className="stat-value" style={{fontWeight: '700'}}>{currentUser.following}</span> following</div>
                    </div>
                    
                    <div className="profile-bio">
                        <p>{currentUser.bio}</p>
                    </div>
                </div>
            </div>

            <div className="profile-tabs">
                <div onClick={() => setActiveTab('posts')} className={`profile-tab ${activeTab === 'posts' ? 'active' : ''}`}>
                    <i className="fa-solid fa-table-cells"></i> POSTS
                </div>
                <div onClick={() => setActiveTab('saved')} className={`profile-tab ${activeTab === 'saved' ? 'active' : ''}`}>
                    <i className="fa-regular fa-bookmark"></i> SAVED
                </div>
                <div onClick={() => setActiveTab('tagged')} className={`profile-tab ${activeTab === 'tagged' ? 'active' : ''}`}>
                    <i className="fa-solid fa-user-tag"></i> TAGGED
                </div>
            </div>

            <div className="container">
                {activeTab === 'posts' && (
                    <div className="masonry-grid profile-posts-grid">
                        {myPosts.length === 0 ? (
                            <div className="no-posts" style={{gridColumn: 'span 3', textAlign: 'center', padding: '40px'}}>
                                No posts yet. Go to Create to make one!
                            </div>
                        ) : (
                            myPosts.map(post => (
                                <div className="grid-item" key={post.id}>
                                    <img src={post.image} alt="Post" />
                                </div>
                            ))
                        )}
                    </div>
                )}
                 {activeTab === 'saved' && (
                    <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>Saved posts will appear here</div>
                )}
            </div>
        </main>
    );
}

export default Profile;
