import { useData } from '../context/DataContext';

const PostCard = ({ post }) => {
    const { toggleLike, toggleSave } = useData();

    return (
        <div className="post-card">
            <div className="post-header">
                <img src={post.userAvatar} alt={post.userName} />
                <div className="post-info">
                    <div className="post-author">{post.userName}</div>
                    <div className="post-time">{post.time}</div>
                </div>
                <i className="fa-solid fa-ellipsis post-menu-btn" style={{cursor: 'pointer'}}></i>
            </div>
            <div className="post-content">
                <img src={post.image} alt="Post Content" loading="lazy" />
            </div>
            <div className="post-actions">
                <div className="left-actions">
                    <i 
                        className={`fa-heart action-btn like-btn ${post.isLiked ? 'fa-solid' : 'fa-regular'}`} 
                        style={{ color: post.isLiked ? '#ef4444' : '', cursor: 'pointer' }}
                        onClick={() => toggleLike(post.id)}
                    ></i>
                    <i className="fa-regular fa-comment action-btn comment-btn" style={{cursor: 'pointer'}}></i>
                    <i className="fa-regular fa-paper-plane action-btn share-btn" style={{cursor: 'pointer'}}></i>
                </div>
                <div className="right-actions">
                    <i 
                        className={`fa-bookmark action-btn save-btn ${post.isSaved ? 'fa-solid' : 'fa-regular'}`}
                        style={{cursor: 'pointer'}}
                        onClick={() => toggleSave(post.id)}
                    ></i>
                </div>
            </div>
            <div className="post-likes">{post.likes} likes</div>
            <div className="post-caption">
                <span className="author-name">{post.userName}</span> {post.caption}
            </div>
            {post.comments > 0 && (
                <div className="post-comments-link" style={{ cursor: 'pointer' }}>View all {post.comments} comments</div>
            )}
        </div>
    );
};

export default PostCard;
