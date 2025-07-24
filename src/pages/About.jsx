import React from 'react';
import logo from '../assets/enxcl.png'
import power from '../assets/Power.png'

function AboutUs() {

  const linkStyle = {
    fontSize: 'medium',
    color: 'black',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  const sectionStyle = {
    backgroundColor: '#f8f9fa',
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '50px'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    color: '#133188',
    marginBottom: '15px',
    fontWeight: 'bold'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const contentSectionStyle = {
    backgroundColor: 'white',
    padding: '30px',
    marginBottom: '30px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    color: '#133188',
    marginBottom: '20px',
    fontWeight: 'bold',
    borderLeft: '4px solid #FD8D36',
    paddingLeft: '15px'
  };

  const textStyle = {
    fontSize: '1rem',
    color: '#333',
    marginBottom: '15px',
    textAlign: 'justify'
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0'
  };

  const listItemStyle = {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #FD8D36'
  };

  const listTitleStyle = {
    fontWeight: 'bold',
    color: '#133188',
    marginBottom: '5px'
  };

  const valuesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '50px',
    marginTop: '20px'
  };

  const valueCardStyle = {
    backgroundColor: '#f8f9fa',
    padding: '30px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '2px solid #FD8D36'
  };

  const valueIconStyle = {
    fontSize: '2rem',
    color: '#FD8D36',
    marginBottom: '10px'
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
          
          <a href="/contact" style={linkStyle}>CONTACT US</a>
          <a href="/" style={linkStyle}>
            LOGIN
            <img src={power} alt="switch" height={12} width={15} />
          </a>
        </nav>
      </header>

    <div style={sectionStyle}>
      {/* Header Section */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>Streamlining Community Living with Enxcl</h1>
        <p style={subtitleStyle}>
          Welcome to the heart of Enxcl, your dedicated partner in fostering harmonious and efficient community living. 
          We understand the complexities of managing a residential community – from daily operations and communication to 
          resident satisfaction and security. That's why we've built a robust and intuitive Resident Management System 
          designed to simplify these challenges for everyone involved.
        </p>
      </div>

      {/* Our Mission */}
      <div style={contentSectionStyle}>
        <h2 style={sectionTitleStyle}>Our Mission</h2>
        <p style={textStyle}>
          At Enxcl, our mission is simple: to empower residential communities with cutting-edge technology that enhances 
          communication, streamlines administration, and improves the overall living experience for residents. We believe 
          that a well-managed community is a happy community, and our platform is engineered to make that a reality.
        </p>
      </div>

      {/* Who We Are */}
      <div style={contentSectionStyle}>
        <h2 style={sectionTitleStyle}>Who We Are</h2>
        <p style={textStyle}>
          We are a team of passionate technologists, community management experts, and user experience designers committed 
          to creating solutions that truly make a difference. Our diverse backgrounds allow us to approach resident management 
          from every angle, ensuring our system is comprehensive, user-friendly, and addresses the real-world needs of modern 
          residential complexes.
        </p>
      </div>

      {/* What We Offer */}
      <div style={contentSectionStyle}>
        <h2 style={sectionTitleStyle}>What We Offer</h2>
        <p style={textStyle}>
          Enxcl is more than just software; it's a comprehensive ecosystem built to:
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <div style={listTitleStyle}>Simplify Communication:</div>
            Break down communication barriers between residents, management, and staff. Announce important updates, 
            send emergency alerts, and facilitate direct messages with ease.
          </li>
          <li style={listItemStyle}>
            <div style={listTitleStyle}>Automate Operations:</div>
            Reduce manual paperwork and administrative burden with features for visitor management, facility booking, 
            maintenance requests, and more.
          </li>
          <li style={listItemStyle}>
            <div style={listTitleStyle}>Enhance Resident Experience:</div>
            Provide residents with convenient access to essential services, community information, and a platform to 
            connect with their neighbors.
          </li>
          <li style={listItemStyle}>
            <div style={listTitleStyle}>Improve Security & Oversight:</div>
            Maintain accurate records, track activities, and bolster the safety and security of your premises.
          </li>
          <li style={listItemStyle}>
            <div style={listTitleStyle}>Provide Data-Driven Insights:</div>
            Offer management valuable insights into community trends, operational efficiency, and resident engagement 
            to inform better decision-making.
          </li>
        </ul>
      </div>

      {/* Our Values */}
      <div style={contentSectionStyle}>
        <h2 style={sectionTitleStyle}>Our Values</h2>
        <div style={valuesGridStyle}>
          <div style={valueCardStyle}>
            <div style={valueIconStyle}>🎯</div>
            <div style={listTitleStyle}>User-Centric Design</div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '10px 0 0 0' }}>
              We prioritize intuitive interfaces and seamless workflows that make our system a pleasure to use for all.
            </p>
          </div>
          <div style={valueCardStyle}>
            <div style={valueIconStyle}>🔒</div>
            <div style={listTitleStyle}>Reliability & Security</div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '10px 0 0 0' }}>
              We are committed to providing a stable, secure, and trustworthy platform that protects your community's data.
            </p>
          </div>
          <div style={valueCardStyle}>
            <div style={valueIconStyle}>🚀</div>
            <div style={listTitleStyle}>Continuous Innovation</div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '10px 0 0 0' }}>
              The world of community management is always evolving, and so are we. We constantly strive to integrate new features and improvements.
            </p>
          </div>
          <div style={valueCardStyle}>
            <div style={valueIconStyle}>🤝</div>
            <div style={listTitleStyle}>Customer Support Excellence</div>
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '10px 0 0 0' }}>
              Your success is our success. We provide dedicated support to ensure you get the most out of our system.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AboutUs;