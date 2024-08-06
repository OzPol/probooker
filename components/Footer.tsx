import React, { useState, useEffect } from 'react';
import AdminLoginModal from './AdminLoginModal';

const Footer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [inputSequence, setInputSequence] = useState('');
  const [listeningForAdmin, setListeningForAdmin] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ctrlPressed = false;
    let shiftPressed = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        ctrlPressed = true;
      }
      if (e.key === 'Shift') {
        shiftPressed = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (ctrlPressed && shiftPressed) {
        setListeningForAdmin(true);
        setInputSequence('');
        ctrlPressed = false;
        shiftPressed = false;

        if (timer) clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            setListeningForAdmin(false);
            setInputSequence('');
          }, 5000)
        );
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (listeningForAdmin) {
        const newSequence = inputSequence + e.key.toLowerCase();

        if (newSequence === 'admin') {
          setShowLink(true);
          setInputSequence('');
          setListeningForAdmin(false);

          if (timer) clearTimeout(timer);
          setTimer(
            setTimeout(() => {
              setShowLink(false);
            }, 5000)
          );
        } else if ('admin'.startsWith(newSequence)) {
          setInputSequence(newSequence);
        } else {
          setInputSequence('');
          setListeningForAdmin(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keypress', handleKeyPress);
      if (timer) clearTimeout(timer);
    };
  }, [inputSequence, listeningForAdmin, timer]);

  const handleAdminLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <footer className="footer">
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
        .footer {
          width: 100%;
          position: absolute;
          bottom: 0;
          background: #f8f9fa;
          border-top: 1px solid #e9ecef;
          padding: 20px;
          text-align: center;
        }
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
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
