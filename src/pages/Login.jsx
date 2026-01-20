import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock Login
        navigate('/');
    };

    return (
        <div className="login-body" style={{ minHeight: '100vh', width: '100%' }}>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-image">
                        <img src="https://images.unsplash.com/photo-1579783902614-a3fb39279c0f?w=800&q=80" alt="Art" />
                        <div className="video-overlay">
                            <i className="fa-regular fa-circle-play"></i>
                            <div className="video-info">
                                <span>Featured Artist</span>
                                <p>Abstract Dimensions - Collection 2025</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="login-form-section">
                        <div className="login-header">
                            <div className="brand">ARTLINK</div>
                            <div className="language-selector">
                                English (UK) <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </div>
                        
                        <div className="welcome-text">
                            <h1>Welcome Back</h1>
                            <p>Enter your details to access your account.</p>
                        </div>
                        
                        <form className="auth-form" onSubmit={handleLogin}>
                            <div className="input-group">
                                <input type="email" placeholder="Email or Username" className="input-field" required />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Password" className="input-field" required />
                            </div>
                            
                            <div className="form-actions">
                                <a href="#" className="forgot-password">Forgot Password?</a>
                            </div>
                            
                            <button type="submit" className="btn btn-primary login-btn">Sign In</button>
                            
                            <div className="divider">
                                <span>Or</span>
                            </div>
                            
                            <button type="button" className="btn btn-outline google-btn">
                                <i className="fa-brands fa-google"></i> Sign in with Google
                            </button>
                            
                            <div className="signup-link">
                                Don't have an account? <a href="/signup">Sign up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
