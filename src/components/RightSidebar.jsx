import { useData } from '../context/DataContext';

const RightSidebar = () => {
    const { users, toggleFollow } = useData();
    
    // Take first 5 users for suggestions
    const suggestionUsers = users.slice(0, 5);

    return (
        <div className="right-sidebar-content">
             <div className="suggestions-header">
                <h3>Suggested for you</h3>
            </div>
            <div className="suggestion-list">
                {suggestionUsers.map(user => (
                    <div className="suggestion-item" key={user.id}>
                        <div className="user-info">
                            <img src={user.avatar} alt={user.name} />
                            <span>{user.name}</span>
                        </div>
                        <button 
                            className="follow-btn" 
                            onClick={() => toggleFollow(user.id)}
                            style={user.isFollowing ? { color: '#666', background: '#e5e7eb' } : {}}
                        >
                            {user.isFollowing ? 'Following' : 'Follow'}
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="footer-links">
                About Help API Privacy Terms Locations Language
                <br />
                © 2025 ArtLink
            </div>
        </div>
    );
};

export default RightSidebar;
