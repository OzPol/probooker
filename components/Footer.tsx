import { ReactNode } from 'react';

const Footer: React.FC = () => {
  return (
    <div>
        <footer>
            <p>&copy; {new Date().getFullYear()} ProBooker. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default Footer;