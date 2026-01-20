import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="login-body" style={{ minHeight: '100vh', width: '100%' }}>
            <div className="login-container">
                <div className="login-card">
                     <div className="login-image">
                        <img src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80" alt="Art" />
                    </div>
                    <div className="login-form-section">
                        <div className="login-header">
                            <div className="brand">ARTLINK</div>
                        </div>
                        
                        <div className="welcome-text">
                            <h1>Join ArtLink</h1>
                            <p>Create an account to share your art.</p>
                        </div>
                        
                         <form className="auth-form" onSubmit={handleSignup}>
                            <div className="input-group">
                                <input type="text" placeholder="Full Name" className="input-field" required />
                            </div>
                            <div className="input-group">
                                <input type="email" placeholder="Email" className="input-field" required />
                            </div>
                            <div className="input-group">
                                <input type="password" placeholder="Password" className="input-field" required />
                            </div>
                            
                            <button type="submit" className="btn btn-primary login-btn">Create Account</button>
                            
                             <div className="divider">
                                <span>Or</span>
                            </div>
                            
                            <button type="button" className="btn btn-outline google-btn">
                                <i className="fa-brands fa-google"></i> Sign up with Google
                            </button>

                            <div className="signup-link">
                                Already have an account? <a href="/login">Log in</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Signup;
