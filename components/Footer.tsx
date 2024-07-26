import React, { useState, useEffect } from 'react';
import AdminLoginModal from './AdminLoginModal';

const Footer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowLink(true);
        clearTimeout(timeout); // Clear any existing timeout
        timeout = setTimeout(() => {
          setShowLink(false);
        }, 1000); // Hide link after 1 second
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeout); // Clean up timeout on unmount
    };
  }, []);

  const handleAdminLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <footer>
      <div className="footer-content">
        <p>© 2024 ProBooker</p>
        {showLink && (
          <a href="#" onClick={handleAdminLoginClick}>
            Admin Login
          </a>
        )}
      </div>
      <AdminLoginModal show={showModal} onClose={closeModal} />
      <style jsx>{`
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
        }
        a {
          color: #0070f3;
          text-decoration: none;
          cursor: pointer;
        }
        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
