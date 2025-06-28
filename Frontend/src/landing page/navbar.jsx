import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import image from "../assets/images/logowhite.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMobileMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen to localStorage changes (cross-tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

 const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsMobileMenuOpen(false);
    navigate('/');
  }
};


  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/contact', label: 'Contact Us' },
    { path: '/about', label: 'About Us' },
    ...(!user
      ? [
          { path: '/login', label: 'Login' },
          { path: '/signup', label: 'Signup', isButton: true },
        ]
      : [
          { path: '/CourseList', label: 'Dashboard' },
          { path: '/quiz', label: 'Past question' },
          { label: 'Logout', isLogout: true },
        ]),
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo} onClick={() => handleNavigation('/')}>
          <img src={image} alt="Logo" style={styles.logoImage} />
          <span style={styles.logoText}>CoursePass</span>
        </div>

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={styles.hamburger}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}

        {/* Navigation Links */}
        {(isMobile ? isMobileMenuOpen : true) && (
          <ul
            style={{
              ...styles.navLinks,
              flexDirection: isMobile ? 'column' : 'row',
              position: isMobile ? 'absolute' : 'static',
              top: isMobile ? '4rem' : 'auto',
              left: isMobile ? 0 : 'auto',
              right: isMobile ? 0 : 'auto',
              backgroundColor: isMobile ? '#007BFF' : 'transparent',
              width: isMobile ? '100%' : 'auto',
              padding: isMobile ? '1rem' : 0,
              gap: isMobile ? '1rem' : '1.5rem',
              boxShadow: isMobile ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              zIndex: 1000,
            }}
          >
            {navItems.map((item) => (
              <li key={item.label}>
                {item.isLogout ? (
                  <button
                    onClick={handleLogout}
                    style={{
                      ...styles.navLink,
                      color: '#ffdddd',
                      fontWeight: 'bold',
                    }}
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.path)}
                    style={
                      item.isButton
                        ? {
                            ...styles.navButton,
                            opacity: location.pathname === item.path ? 0.7 : 1,
                          }
                        : {
                            ...styles.navLink,
                            opacity: location.pathname === item.path ? 0.7 : 1,
                          }
                    }
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoImage: {
    height: '2rem',
    marginRight: '0.5rem',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#fff',
  },
  hamburger: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    transition: 'opacity 0.3s ease',
  },
  navButton: {
    backgroundColor: '#fff',
    color: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar;
