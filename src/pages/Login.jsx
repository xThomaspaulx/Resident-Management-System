import React, { useState } from 'react';
import logo from '../assets/enxcl.png'
import axios from 'axios'

function Login() {
  const [U_name, setIdName] = useState('');
  const [U_pass, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setLoginStatus('');

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        U_Name: U_name,
        U_pass: U_pass
      });

      console.log("Login successful:", response.data);
      setLoginStatus(`Login successful! Role: ${response.data.role}`);
      
      if (response.data.role === 'superadmin') {
        window.location.href = '/SuperAdmin';
      } 
      else if (response.data.role === 'admin') {
        window.location.href = '/Admin';
      }
      else {
        window.location.href = '/User';
      }
      
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setLoginStatus('Invalid username or password');
      } else {
        setLoginStatus('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const linkStyle = {
    fontSize: 'medium',
    color: 'black',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const buttonStyle = {
    background: isLoading 
      ? 'linear-gradient(135deg, #ccc 0%, #999 100%)' 
      : 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 50%, #E55B00 100%)',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    boxShadow: isLoading 
      ? 'none' 
      : '0 8px 25px rgba(255, 138, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    letterSpacing: '0.5px'
  };

  const footerStyle = {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    fontSize: '12px',
    marginTop: '40px',
    position: 'relative',
    overflow: 'hidden'
  };

  const inputStyle = {
    flex: 2,
    padding: '12px 15px',
    borderRadius: '10px',
    fontSize: '1em',
    border: '2px solid #e0e0e0',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const inputFocusStyle = {
    ...inputStyle,
    border: '2px solid #FF8A00',
    boxShadow: '0 0 10px rgba(255, 138, 0, 0.2)',
    transform: 'translateY(-1px)'
  };

  return (
    <>
      {/* HEADER - UNCHANGED */}
      <header 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.25% 1%',
          backgroundColor: '#FD8D36',
        }}
      >
        <img src={logo} alt="LOGO" height="50" />
        <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <a href="/about" style={linkStyle}>ABOUT US</a>
          <a href="/contact" style={linkStyle}>CONTACT US</a>
        </nav>
      </header>

      {/* MAIN CONTENT WITH GRADIENT BACKGROUND */}
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 50%, #d8d8d8 100%)',
      }}>
        {/* MAIN HEADING */}
        <div style={{
          textAlign: 'center',
          paddingTop: '30px',
          paddingBottom: '40px'
        }}>
          <h1 style={{
            margin: '0',
            fontSize: '3em',
            background: 'linear-gradient(135deg, #FF8A00 0%, #133188 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            lineHeight: '1.2'
          }}>
            WELCOME <br/>
            TO <br/>
            RESIDENT MANAGEMENT SYSTEM
          </h1>
        </div>

        {/* LOGIN CONTAINER */}
        <div style={{ 
          marginLeft: '30%', 
          marginRight: '30%', 
          marginTop: '20px',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.2))'
          
        }}>
          {/* LOGIN HEADER */}
          <div style={{
            background: 'linear-gradient(135deg, #FF8A00 0%, #FF6B00 50%, #E55B00 100%)',
            textAlign: 'center',
            padding: '20px',
            fontSize: '1.6em',
            fontWeight: 'bold',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            color: 'white',
            letterSpacing: '1px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
              pointerEvents: 'none'
            }}></div>
            <span style={{ position: 'relative', zIndex: 1 }}>🔐 LOGIN</span>
          </div>
          
          {/* LOGIN FORM */}
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
            padding: '40px',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
            border: '1px solid #e0e0e0',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Subtle pattern overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 138, 0, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(19, 49, 136, 0.05) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
            
            <div style={{
              position: 'relative',
              zIndex: 1
            }}>
              {/* USERNAME FIELD */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '25px',
                padding: '10px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <label 
                  htmlFor="idName" 
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '1em',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '1.2em' }}>👤</span>
                  USERNAME
                </label>
                <span style={{
                  margin: '0 15px',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  color: '#FF8A00'
                }}>
                  :
                </span>
                
                <input
                  type="text"
                  id="idName"
                  name="idName"
                  placeholder="Enter your username"
                  value={U_name}
                  onChange={(e) => setIdName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={inputStyle}
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    Object.assign(e.target.style, inputStyle);
                  }}
                />
              </div>
              
              {/* PASSWORD FIELD */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '25px',
                padding: '10px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                <label 
                  htmlFor="password" 
                  style={{
                    flex: 1,
                    fontWeight: 'bold',
                    fontSize: '1em',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{ fontSize: '1.2em' }}>🔒</span>
                  PASSWORD
                </label>
                <span style={{
                  margin: '0 15px',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  color: '#FF8A00'
                }}>
                  :
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={U_pass}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={inputStyle}
                  onFocus={(e) => {
                    Object.assign(e.target.style, inputFocusStyle);
                  }}
                  onBlur={(e) => {
                    Object.assign(e.target.style, inputStyle);
                  }}
                />
              </div>

              {/* Status Message */}
              {loginStatus && (
                <div style={{
                  textAlign: 'center',
                  marginBottom: '25px',
                  padding: '15px',
                  borderRadius: '10px',
                  background: loginStatus.includes('successful') 
                    ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' 
                    : 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                  color: loginStatus.includes('successful') ? '#155724' : '#721c24',
                  border: loginStatus.includes('successful') 
                    ? '1px solid #c3e6cb' 
                    : '1px solid #f5c6cb',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  {loginStatus.includes('successful') ? '✅ ' : '❌ '}
                  {loginStatus}
                </div>
              )}
              
              {/* SUBMIT BUTTON */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  style={buttonStyle}
                  onClick={handleSubmit}
                  disabled={isLoading}
                  onMouseOver={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 12px 30px rgba(255, 138, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 8px 25px rgba(255, 138, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    }
                  }}
                  onMouseDown={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = 'translateY(1px)';
                    }
                  }}
                  onMouseUp={(e) => {
                    if (!isLoading) {
                      e.target.style.transform = 'translateY(-2px)';
                    }
                  }}
                >
                  {isLoading ? '🔄 LOGGING IN...' : '🚀 SUBMIT'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* ENHANCED FOOTER */}
      <footer style={footerStyle}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255, 138, 0, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ 
            fontWeight: 'bold', 
            marginBottom: '15px',
            marginTop: '0',
            fontSize: '16px',
            color: '#FF8A00'
          }}>
            📞 Contact Us
          </p>
          <p style={{ 
            marginBottom: '15px',
            lineHeight: '1.6'
          }}>
            📞 +91 7306 396 219<br/>
            📧 info@enxcl.com
          </p>
          <div style={{
            borderTop: '1px solid #333',
            paddingTop: '15px',
            marginTop: '15px'
          }}>
            <p style={{ 
              margin: '0',
              fontSize: '11px',
              opacity: '0.8'
            }}>
              © 2024 enxcl Business Solutions. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Login;