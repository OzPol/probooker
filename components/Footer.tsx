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
      // Detect if Ctrl or Shift are pressed
      if (e.key === 'Control') {
        ctrlPressed = true;
      }
      if (e.key === 'Shift') {
        shiftPressed = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // When both Ctrl and Shift are released, start listening for "admin"
      if (ctrlPressed && shiftPressed) {
        setListeningForAdmin(true); // Set flag to start listening for "admin"
        setInputSequence(''); // Reset input sequence
        ctrlPressed = false;
        shiftPressed = false;

        // Set a timer to stop listening if no input in 5 seconds
        if (timer) clearTimeout(timer);
        setTimer(
          setTimeout(() => {
            setListeningForAdmin(false); // Stop listening after 5 seconds
            setInputSequence(''); // Reset sequence
          }, 5000)
        );
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Only proceed if we're in the input mode
      if (listeningForAdmin) {
        const newSequence = inputSequence + e.key.toLowerCase();

        // Check if the input sequence matches "admin"
        if (newSequence === 'admin') {
          setShowLink(true);
          setInputSequence(''); // Reset sequence after success
          setListeningForAdmin(false); // Stop listening

          // Set a timer to hide the link after 5 seconds
          if (timer) clearTimeout(timer);
          setTimer(
            setTimeout(() => {
              setShowLink(false); // Hide the link after 5 seconds
            }, 5000)
          );
        } else if ('admin'.startsWith(newSequence)) {
          setInputSequence(newSequence); // Update sequence
        } else {
          setInputSequence(''); // Reset sequence on wrong input
          setListeningForAdmin(false); // Stop listening if incorrect
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
      if (timer) clearTimeout(timer); // Clean up timeout on unmount
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
