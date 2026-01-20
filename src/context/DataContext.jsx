import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const DATA_KEY_USERS = 'artlink_users';
const DATA_KEY_POSTS = 'artlink_posts';
const DATA_KEY_CURRENT_USER = 'artlink_current_user';

// --- Data Generators ---

const USER_NAMES = [
    'Emma_Art', 'Lucas_Draws', 'Sophia_Sketch', 'Oliver_Paint', 'Ava_Create',
    'Liam_Design', 'Isabella_Pixel', 'Noah_Craft', 'Mia_Gallery', 'Ethan_Studio',
    'Harper_Ink', 'Mason_Vibes', 'Evelyn_Muse', 'Logan_Artist', 'Abigail_Color'
];

const POST_CAPTIONS = [
    'Just finished this piece! 🎨', 'Morning inspiration.', 'Work in progress...', 
    'Abstract thoughts.', 'City lights 🌃', 'Nature\'s beauty 🌿', 
    'Portrait study.', 'Digital experimentation.', 'My latest commission.', 
    'Sketchbook peek. ✏️', 'Feeling creative today!', 'Colors of the wind.',
    'Minimalist vibes.', 'Textured layers.', 'Art is life.'
];

const ART_IMAGES = [
    'https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?w=800&q=80',
    'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
    'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&q=80',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&q=80',
    'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    'https://images.unsplash.com/photo-1501472312651-726afe119ff1?w=800&q=80',
    'https://images.unsplash.com/photo-1460661631910-d9c81bacc98f?w=800&q=80',
    'https://images.unsplash.com/photo-1459749411177-d4a4289473f4?w=800&q=80',
    'https://images.unsplash.com/photo-1492037766660-2a56f9eb3fcb?w=800&q=80',
    'https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&q=80',
    'https://images.unsplash.com/photo-1513569771920-c9e1d31714af?w=800&q=80',
    'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80'
];

function generateUsers(count = 15) {
    return Array.from({ length: count }, (_, i) => {
        const name = USER_NAMES[i] || `User_${i + 1}`;
        return {
            id: `u${i + 1}`,
            name: name,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random&color=fff`,
            bio: 'Lover of all things art. 🎨',
            followers: Math.floor(Math.random() * 1000) + 50,
            following: Math.floor(Math.random() * 500) + 20,
            isStoryActive: Math.random() > 0.3,
            storyImage: ART_IMAGES[Math.floor(Math.random() * ART_IMAGES.length)],
            isFollowing: false
        };
    });
}

function generatePosts(users) {
    const posts = [];
    users.forEach(user => {
        const numPosts = Math.floor(Math.random() * 3) + 1; // 1-3 posts per user
        for (let i = 0; i < numPosts; i++) {
            posts.push({
                id: `p_${user.id}_${i}`,
                userId: user.id,
                userName: user.name,
                userAvatar: user.avatar,
                time: `${Math.floor(Math.random() * 23) + 1}h ago`,
                image: ART_IMAGES[Math.floor(Math.random() * ART_IMAGES.length)],
                caption: POST_CAPTIONS[Math.floor(Math.random() * POST_CAPTIONS.length)],
                likes: Math.floor(Math.random() * 500),
                comments: [],
                isLiked: false,
                isSaved: false,
                category: ['Visual Art', 'Digital Art', 'Photography'][Math.floor(Math.random() * 3)]
            });
        }
    });
    return posts.sort(() => Math.random() - 0.5); // Shuffle posts
}

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const init = () => {
            let storedUsers = JSON.parse(localStorage.getItem(DATA_KEY_USERS) || '[]');
            let storedPosts = JSON.parse(localStorage.getItem(DATA_KEY_POSTS) || '[]');
            let storedUser = JSON.parse(localStorage.getItem(DATA_KEY_CURRENT_USER) || 'null');

            if (storedUsers.length === 0) {
                 storedUsers = generateUsers(15);
                 console.log('Generated Users:', storedUsers);
                 storedPosts = generatePosts(storedUsers);
                 storedUser = {
                    id: 'me',
                    name: 'Yash',
                    avatar: 'https://ui-avatars.com/api/?name=Yash&background=008080&color=fff',
                    bio: 'Digital Artist & Developer',
                    followers: 128,
                    following: 45,
                    posts: []
                };
                 
                 localStorage.setItem(DATA_KEY_USERS, JSON.stringify(storedUsers));
                 localStorage.setItem(DATA_KEY_POSTS, JSON.stringify(storedPosts));
                 localStorage.setItem(DATA_KEY_CURRENT_USER, JSON.stringify(storedUser));
            }
            
            setUsers(storedUsers);
            setPosts(storedPosts);
            setCurrentUser(storedUser);
            setIsLoading(false);
        };
        init();
    }, []);

    // Sync to local storage whenever state changes? 
    // Optimization: create specialized update functions that update state AND local storage.

    const toggleLike = (postId) => {
        let updatedPost = null;
        const newPosts = posts.map(p => {
             if (p.id === postId) {
                 const isLiked = !p.isLiked;
                 updatedPost = { ...p, isLiked, likes: p.likes + (isLiked ? 1 : -1) };
                 return updatedPost;
             }
             return p;
        });
        setPosts(newPosts);
        localStorage.setItem(DATA_KEY_POSTS, JSON.stringify(newPosts));
        return updatedPost;
    };

    const toggleSave = (postId) => {
        let updatedPost = null;
        const newPosts = posts.map(p => {
             if (p.id === postId) {
                 const isSaved = !p.isSaved;
                 updatedPost = { ...p, isSaved };
                 return updatedPost;
             }
             return p;
        });
        setPosts(newPosts);
        localStorage.setItem(DATA_KEY_POSTS, JSON.stringify(newPosts));
        return updatedPost;
    };

    const toggleFollow = (userId) => {
        let updatedUser = null;
        const newUsers = users.map(u => {
            if (u.id === userId) {
                const isFollowing = !u.isFollowing;
                updatedUser = { ...u, isFollowing };
                return updatedUser;
            }
            return u;
        });
        setUsers(newUsers);
        localStorage.setItem(DATA_KEY_USERS, JSON.stringify(newUsers));
        return updatedUser;
    };

    const addPost = (newPostData) => {
        const newPosts = [newPostData, ...posts];
        setPosts(newPosts);
        localStorage.setItem(DATA_KEY_POSTS, JSON.stringify(newPosts));
    };

    return (
        <DataContext.Provider value={{ 
            users, posts, currentUser, isLoading,
            toggleLike, toggleSave, toggleFollow, addPost 
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
