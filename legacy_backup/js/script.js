document.addEventListener('DOMContentLoaded', () => {
    // --- Utils ---
    const getPageName = () => {
        const path = window.location.pathname;
        return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    };

    const currentPage = getPageName();
    const currentUser = DataManager.getCurrentUser();
    let activeStoryUsers = [];
    let currentStoryIndex = 0;
    let storyTimer = null;
    let progressInterval = null;
    const STORY_DURATION = 3000; // 3 seconds per story

    // --- Renderers ---

    function renderStories() {
        const storiesContainer = document.querySelector('.stories-container');
        if (!storiesContainer) return;

        storiesContainer.innerHTML = '';
        const users = DataManager.getUsers();
        activeStoryUsers = users.filter(user => user.isStoryActive);
        
        // Add "My Story" first
        const myStoryHTML = `
            <div class="story-item">
                <div class="story-ring">
                    <img src="${currentUser.avatar}" alt="My Story">
                    <div class="add-story-icon"><i class="fa-solid fa-plus"></i></div>
                </div>
                <span>Your Story</span>
            </div>
        `;
        storiesContainer.insertAdjacentHTML('beforeend', myStoryHTML);

        activeStoryUsers.forEach((user, index) => {
            const storyHTML = `
                <div class="story-item" data-index="${index}">
                    <div class="story-ring active">
                        <img src="${user.avatar}" alt="${user.name}">
                    </div>
                    <span>${user.name}</span>
                </div>
            `;
            storiesContainer.insertAdjacentHTML('beforeend', storyHTML);
        });

        // Attach listeners
        storiesContainer.querySelectorAll('.story-item[data-index]').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                openStoryViewer(index);
            });
        });
    }

    function renderFeed() {
        const feedContainer = document.querySelector('.main-feed');
        if (!feedContainer) return;

        // Clean only posts, keep the search bar container (first child)
        const posts = feedContainer.querySelectorAll('.post-card');
        posts.forEach(p => p.remove());

        const allPosts = DataManager.getPosts();

        allPosts.forEach(post => {
            const postHTML = createPostHTML(post);
            feedContainer.insertAdjacentHTML('beforeend', postHTML);
        });

        attachPostListeners();
    }

    function renderExplore() {
        const grid = document.querySelector('.masonry-grid');
        if (!grid) return;

        grid.innerHTML = '';
        const allPosts = DataManager.getPosts();
        
        allPosts.forEach((post, index) => {
            // Apply different grid classes for variety
            let gridClass = '';
            if (index % 5 === 0) gridClass = 'large';
            else if (index % 7 === 0) gridClass = 'wide';
            else if (index % 4 === 0) gridClass = 'tall';

            const itemHTML = `
                <div class="grid-item ${gridClass}" data-id="${post.id}">
                    <img src="${post.image}" alt="Art">
                    <div class="grid-overlay">
                        <div class="overlay-info">
                            <i class="fa-solid fa-heart"></i> ${post.likes}
                        </div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', itemHTML);
        });
    }

    function renderProfile() {
        
        // Update header info if on profile page
        const profileName = document.querySelector('.profile-name');
        const profileHandle = document.querySelector('.profile-handle');
        const profileBio = document.querySelector('.profile-bio');
        const profileStats = document.querySelectorAll('.stat-item .stat-value');
        const profileAvatar = document.querySelector('.profile-avatar-img');

        if (profileName) {
            profileName.textContent = currentUser.name;
            if (profileHandle) profileHandle.textContent = '@' + currentUser.name.toLowerCase();
            if (profileBio) profileBio.textContent = currentUser.bio;
            if (profileAvatar) profileAvatar.src = currentUser.avatar;
            // Fake stats
            if (profileStats.length >= 3) {
                const myPosts = DataManager.getUserPosts('me');
                profileStats[0].textContent = myPosts.length; // Posts
                profileStats[1].textContent = currentUser.followers; // Followers
                profileStats[2].textContent = currentUser.following; // Following
            }

            // Render User Posts Grid
            const postsGrid = document.querySelector('.profile-posts-grid');
            if (postsGrid) {
                postsGrid.innerHTML = '';
                const myPosts = DataManager.getUserPosts('me');
                if (myPosts.length === 0) {
                    postsGrid.innerHTML = '<div class="no-posts">No posts yet. Go to Create to make one!</div>';
                } else {
                    myPosts.forEach(post => {
                        const postHTML = `
                            <div class="profile-post-item" data-id="${post.id}">
                                <img src="${post.image}" alt="Post">
                            </div>
                        `;
                        postsGrid.insertAdjacentHTML('beforeend', postHTML);
                    });
                }
            }
        }
    }

    function renderSuggestions() {
        const list = document.querySelector('.suggestion-list');
        if (!list) return;

        list.innerHTML = '';
        const users = DataManager.getUsers().slice(0, 5); // Take first 5 for sidebar

        users.forEach(user => {
            const html = `
                <div class="suggestion-item">
                    <div class="user-info">
                        <img src="${user.avatar}" alt="${user.name}">
                        <span>${user.name}</span>
                    </div>
                    <button class="follow-btn" data-id="${user.id}">
                        ${user.isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
            `;
            list.insertAdjacentHTML('beforeend', html);
        });
        
        attachFollowListeners();
    }

    // --- Template Generators ---

    function createPostHTML(post) {
        return `
            <div class="post-card" data-id="${post.id}">
                <div class="post-header">
                    <img src="${post.userAvatar}" alt="${post.userName}">
                    <div class="post-info">
                        <div class="post-author">${post.userName}</div>
                        <div class="post-time">${post.time}</div>
                    </div>
                    <i class="fa-solid fa-ellipsis post-menu-btn"></i>
                </div>
                <div class="post-content">
                    <img src="${post.image}" alt="Post Content">
                </div>
                <div class="post-actions">
                    <div class="left-actions">
                        <i class="fa-heart ${post.isLiked ? 'fa-solid' : 'fa-regular'} action-btn like-btn" 
                           style="${post.isLiked ? 'color: #ef4444;' : ''}"></i>
                        <i class="fa-regular fa-comment action-btn comment-btn"></i>
                        <i class="fa-regular fa-paper-plane action-btn share-btn"></i>
                    </div>
                    <div class="right-actions">
                        <i class="fa-bookmark ${post.isSaved ? 'fa-solid' : 'fa-regular'} action-btn save-btn"></i>
                    </div>
                </div>
                <div class="post-likes">${post.likes} likes</div>
                <div class="post-caption">
                    <span class="author-name">${post.userName}</span> ${post.caption}
                </div>
                <div class="post-comments-link" style="cursor: pointer;">View all ${post.comments} comments</div>
            </div>
        `;
    }

    // --- Event Logic ---

    function attachPostListeners() {
        // Like Button
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.post-card');
                const id = card.dataset.id;
                const updatedPost = DataManager.toggleLike(id);
                
                if (updatedPost) {
                    this.classList.toggle('fa-solid');
                    this.classList.toggle('fa-regular');
                    this.style.color = updatedPost.isLiked ? '#ef4444' : '';
                    
                    // Update like count text nearby
                    const countEl = card.querySelector('.post-likes');
                    if (countEl) countEl.textContent = `${updatedPost.likes} likes`;
                }
            });
        });

        // Save Button
        document.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const card = this.closest('.post-card');
                const id = card.dataset.id;
                const updatedPost = DataManager.toggleSave(id);
                
                if (updatedPost) {
                    this.classList.toggle('fa-solid');
                    this.classList.toggle('fa-regular');
                }
            });
        });

         // Comment Focus
         document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Mock behavior: focus closest input if exists, or alert
                const card = this.closest('.post-card');
                const input = card.querySelector('input');
                if (input) input.focus();
                else alert('Comments view under construction!');
            });
        });
    }

    function attachFollowListeners() {
        document.querySelectorAll('.follow-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const updatedUser = DataManager.toggleFollow(id);
                if (updatedUser) {
                    if (updatedUser.isFollowing) {
                        this.textContent = 'Following';
                        this.style.color = '#666';
                        this.style.background = '#e5e7eb';
                    } else {
                        this.textContent = 'Follow';
                        this.style.color = 'white';
                        this.style.background = 'var(--accent-primary)';
                    }
                }
            });
        });
    }

    // --- Page Specific Logic ---

    // Global: Search
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert(`Searching for: ${input.value}`);
                input.value = '';
            }
        });
    });

    // Create Page Logic
    const createBtn = document.querySelector('.create-actions .btn-primary');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            const caption = document.querySelector('textarea').value;
            // Use dummy image for now, could be improved with file reader
            const newPost = {
                id: 'p_me_' + Date.now(),
                userId: 'me',
                userName: currentUser.name,
                userAvatar: currentUser.avatar,
                time: 'Just now',
                image: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=800&q=80',
                caption: caption || 'New creation!',
                likes: 0,
                comments: 0,
                isLiked: false,
                isSaved: false
            };
            DataManager.addPost(newPost);
            alert('Post Created Successfully!');
            window.location.href = 'index.html';
        });
    }

    // LoginPage Logic
    if (currentPage === 'login.html') {
        const form = document.querySelector('.auth-form');
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Mock login
                window.location.href = 'index.html';
            });
        }
    }

    // Mobile Sidebar Toggle
    const toggleBtn = document.getElementById('toggleSuggestionsBtn');
    const rightSidebar = document.querySelector('.right-sidebar');
    if (toggleBtn && rightSidebar) {
        toggleBtn.addEventListener('click', () => rightSidebar.classList.toggle('show'));
    }

    // Initialize Page
    renderFeed();
    renderStories();
    renderSuggestions();
    
    // Conditionals
    if (currentPage.includes('explore')) renderExplore();
    if (currentPage.includes('profile')) renderProfile();

    // --- Story Viewer Logic ---

    function openStoryViewer(index) {
        currentStoryIndex = index;
        const modal = document.getElementById('storyModal');
        const closeBtn = document.getElementById('closeStoryBtn');
        const prevBtn = document.getElementById('prevStoryBtn');
        const nextBtn = document.getElementById('nextStoryBtn');

        if (modal) {
            modal.classList.add('active');
            showStory(index);
            
            // Events
            closeBtn.onclick = closeStoryViewer;
            prevBtn.onclick = () => navigateStory(-1);
            nextBtn.onclick = () => navigateStory(1);
        }
    }

    function closeStoryViewer() {
        const modal = document.getElementById('storyModal');
        if (modal) {
            modal.classList.remove('active');
            clearInterval(storyTimer);
            clearInterval(progressInterval);
        }
    }

    function navigateStory(direction) {
        let newIndex = currentStoryIndex + direction;
        if (newIndex >= 0 && newIndex < activeStoryUsers.length) {
            currentStoryIndex = newIndex;
            showStory(currentStoryIndex);
        } else {
            closeStoryViewer(); // Close if at end or beginning
        }
    }

    function showStory(index) {
        const user = activeStoryUsers[index];
        if (!user) return;

        // Update Content
        document.getElementById('storyUserAvatar').src = user.avatar;
        document.getElementById('storyUserName').textContent = user.name;
        document.getElementById('storyImage').src = user.storyImage || user.avatar; // Fallback

        // Reset Progress
        const progressFill = document.querySelector('.story-progress-bar');
        // create inner fill div if not exists or select it
        // Note: CSS used .story-progress-bar .fill but HTML has just .story-progress-bar.
        // Let's fix HTML injection in JS or rely on CSS matching. 
        // My CSS was: .story-progress-bar .fill
        // My HTML was: <div class="story-progress-bar"></div>
        // I need to inject the fill div or use the bar itself. 
        // Actually, let's inject a fill div for animation.
        
        let fill = progressFill.querySelector('.fill');
        if (!fill) {
            fill = document.createElement('div');
            fill.className = 'fill';
            progressFill.appendChild(fill);
        }
        
        // Reset animation
        fill.style.width = '0%';
        fill.style.transition = 'none';
        
        // Force reflow
        void fill.offsetWidth;

        // Start animation
        fill.style.transition = `width ${STORY_DURATION}ms linear`;
        fill.style.width = '100%';

        // Timer
        clearInterval(storyTimer);
        storyTimer = setTimeout(() => {
            navigateStory(1);
        }, STORY_DURATION);
    }

    // --- Theme Logic ---

    function initTheme() {
        const themeToggleBtn = document.getElementById('themeToggle');
        const body = document.body;
        
        // 1. Check LocalStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
        }

        // 2. Update Buttton UI (if exists)
        updateThemeBtnIcon();

        // 3. Attach Listener
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const isDark = body.classList.contains('dark-mode');
                
                // Save preference
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                
                // Update Icon
                updateThemeBtnIcon();
            });
        }
    }

    function updateThemeBtnIcon() {
        const themeToggleBtn = document.getElementById('themeToggle');
        if (!themeToggleBtn) return;
        
        const isDark = document.body.classList.contains('dark-mode');
        const icon = themeToggleBtn.querySelector('i');
        
        if (isDark) {
            icon.classList.remove('fa-moon', 'fa-regular');
            icon.classList.add('fa-sun', 'fa-solid'); // Sun icon for light mode switch
            // Optional: Change button text if you had text
        } else {
            icon.classList.remove('fa-sun', 'fa-solid');
            icon.classList.add('fa-moon', 'fa-regular');
        }
    }

    // Initialize Theme
    initTheme();

});
