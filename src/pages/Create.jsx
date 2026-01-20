import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const { addPost, currentUser } = useData();
    const navigate = useNavigate();
    const [caption, setCaption] = useState('');
    
    const handleCreate = () => {
        if (!caption) return;
        
        const newPost = {
            id: 'p_me_' + Date.now(),
            userId: currentUser.id,
            userName: currentUser.name,
            userAvatar: currentUser.avatar,
            time: 'Just now',
            image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80', // Dummy image
            caption: caption,
            likes: 0,
            comments: 0,
            isLiked: false,
            isSaved: false,
            category: 'Digital Art'
        };
        
        addPost(newPost);
        navigate('/');
    };

    return (
        <main className="create-main">
            <div className="create-container">
                <h2>Create New Post</h2>
                
                <div className="upload-area">
                    <i className="fa-regular fa-image"></i>
                    <p>Drag photos to upload</p>
                    <button className="btn btn-outline" style={{marginTop: '10px'}}>Select from computer</button>
                    <p style={{fontSize: '10px', color: '#888', marginTop: '5px'}}>(Mock functionality - uses default image)</p>
                </div>

                <div className="caption-area">
                    <textarea 
                        rows="4" 
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    ></textarea>
                </div>

                <div className="create-actions" style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button className="btn btn-primary" onClick={handleCreate}>Share</button>
                </div>
            </div>
        </main>
    );
};
export default Create;
