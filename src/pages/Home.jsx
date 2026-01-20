import { useData } from '../context/DataContext';
import PostCard from '../components/PostCard';
import Stories from '../components/Stories';

const Home = () => {
    const { posts, currentUser, isLoading } = useData();

    return (
        <main className="main-feed">
             <div className="search-bar-container">
                <div className="search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search for art or artist" />
                </div>
                <div className="top-actions">
                    <button id="toggleSuggestionsBtn" className="icon-btn" title="Toggle Suggestions">
                        <i className="fa-solid fa-users"></i>
                    </button>
                    <i className="fa-regular fa-bell"></i>
                    <i className="fa-regular fa-paper-plane"></i>
                    {currentUser && (
                         <img src={currentUser.avatar} alt="Profile" className="user-avatar-sm" />
                    )}
                </div>
            </div>

            <Stories />

            {/* Posts */}
            {isLoading ? <div style={{textAlign: 'center', padding: '20px'}}>Loading...</div> : (
                posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </main>
    );
}
export default Home;
