import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';

const Stories = () => {
    const { users, currentUser } = useData();
    const activeStoryUsers = users.filter(u => u.isStoryActive);
    
    // Viewer State
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const openViewer = (index) => {
        setCurrentIndex(index);
        setViewerOpen(true);
        setProgress(0);
    };

    const closeViewer = () => {
        setViewerOpen(false);
        setProgress(0);
    };

    const nextStory = () => {
        if (currentIndex < activeStoryUsers.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            closeViewer();
        }
    };

    const prevStory = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        }
    };

    // Auto-advance logic
    useEffect(() => {
        let interval;
        if (viewerOpen) {
            interval = setInterval(() => {
                setProgress(old => {
                    if (old >= 100) {
                        nextStory(); // This might have stale closure issues if not handled carefully or if nextStory isn't stable.
                        // Actually, better to trigger nextStory via effect dependency on progress.
                        return 0;
                    }
                    return old + 2; // 50 ticks to 100% -> 50 * 60ms = 3000ms
                });
            }, 60);
        }
        return () => clearInterval(interval);
    }, [viewerOpen, currentIndex]);

    // Effect to handle progress completion
    useEffect(() => {
        if (progress >= 100 && viewerOpen) {
             nextStory();
        }
    }, [progress, viewerOpen]); 

    // Helper to get current story user
    const currentStoryUser = activeStoryUsers[currentIndex];

    return (
        <>
            <div className="stories-container">
                {/* My Story */}
                <div className="story-item">
                    <div className="story-ring">
                        <img src={currentUser?.avatar} alt="My Story" />
                        <div className="add-story-icon" style={{
                            position: 'absolute', bottom: 0, right: 0, 
                            background: '#008080', color: 'white', borderRadius: '50%', 
                            width: '20px', height: '20px', display: 'flex', 
                            alignItems: 'center', justifyContent: 'center', fontSize: '10px'
                        }}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                    <span>Your Story</span>
                </div>

                {/* Others */}
                {activeStoryUsers.map((user, index) => (
                    <div className="story-item" key={user.id} onClick={() => openViewer(index)} style={{cursor: 'pointer'}}>
                        <div className="story-ring active">
                            <img src={user.avatar} alt={user.name} />
                        </div>
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>

            {/* Viewer Modal */}
            {viewerOpen && currentStoryUser && (
                <div className="story-modal active">
                    <div className="story-progress-container">
                        <div className="story-progress-bar">
                            <div className="fill" style={{ width: `${progress}%`, transition: 'width 0.06s linear' }}></div>
                        </div>
                    </div>
                    <div className="story-header">
                        <div className="story-user-info">
                            <img src={currentStoryUser.avatar} alt="User" />
                            <span style={{fontWeight: '600'}}>{currentStoryUser.name}</span>
                            <span className="story-time">12h</span>
                        </div>
                        <button id="closeStoryBtn" onClick={closeViewer}>&times;</button>
                    </div>
                    <div className="story-content-area" onClick={nextStory}>
                        <img src={currentStoryUser.storyImage || currentStoryUser.avatar} alt="Story" />
                    </div>
                    <div className="story-nav prev" onClick={(e) => { e.stopPropagation(); prevStory(); }}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                    <div className="story-nav next" onClick={(e) => { e.stopPropagation(); nextStory(); }}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            )}
        </>
    );
};

export default Stories;
