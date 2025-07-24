import React, { useState } from 'react';
import logo from '../assets/enxcl.png'
import power from '../assets/Power.png'

function Contact() {

  const [userId, setUserId] = useState('');
  const [userQuery, setUserQuery] = useState('');

  const handleSubmit = () => {
   console.log("ID:", userId);
   console.log("QUERY:", userQuery);
  };


  const linkStyle = {
    fontSize: 'medium',
    color: 'black',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const footerStyle = {
    backgroundColor: '#000',
    color: 'white',
    textAlign: 'center',
    padding: '6px',
    fontSize: '12px',
    marginTop: '3%'
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#333',
    padding: '10px 25px',
    border: '2px solid #000',
    borderRadius: '5px',
    fontSize: '1.1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '3px 3px 8px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s'
  };

  return (
    <>
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
          
          <a href="/" style={linkStyle}>
            LOGIN
            <img src={power} alt="switch" height={12} width={15} />
          </a>
        </nav>
      </header>
      

      {/* MAIN HEADING */}
      <h1 style={{textAlign: 'center',fontSize: '220%',color: '#133188',paddingTop:'10px'}}>
        CONTACT US
      </h1>

      <div style={{
      backgroundColor: '#FD8D36',
      padding: '50px',
      borderRadius: '15px',
      maxWidth: '800px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* ID Field */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <label style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'black',
          marginRight: '20px',
          minWidth: '60px'
        }}>
          ID
        </label>
        <span style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginRight: '15px'
        }}>
          :
        </span>
        <input
          type="text"
          name="id"
          placeholder="Enter your ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '200px',
            outline: 'none'
          }}
          />

      </div>

      {/* Query Field */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '30px'
      }}>
        <label style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: 'black',
          marginRight: '20px',
          minWidth: '50px',
          paddingTop: '8px'
        }}>
          QUERY
        </label>
        <span style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginRight: '15px',
          paddingTop: '8px'
        }}>
          :
        </span>
        <textarea
          name="query"
          placeholder="Enter your query here..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          style={{
            flex: 1,
            minHeight: '220px',
            padding: '12px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'Arial, sans-serif'
          }}
        />

      </div>

      {/* Submit Button */}
        <div style={{ textAlign: 'center', marginTop: '10 px' }}>
                  <button
                    style={buttonStyle}
                    onClick={handleSubmit}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#f0f0f0';
                      e.target.style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.boxShadow = '3px 3px 8px rgba(0, 0, 0, 0.2)';
                    }}
                  >
                    SUBMIT
                  </button>

      </div>
    </div>
      
      {/* Footer */}
      <footer style={footerStyle}>
        <p style={{ fontWeight: 'bold', marginBottom: '10px',marginTop:'10px' }}>Contact Us</p>
        <p>
          📞 +91 7306 396 219<br/>
          📧 info@enxcl.com
        </p>
        <p>© 2024 enxcl Business Solutions. All Rights Reserved</p>
      </footer>
      </>
    
    
  );
}

export default Contact;