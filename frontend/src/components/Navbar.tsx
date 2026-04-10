import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Globe } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onLoginClick: () => void;
  session: any;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, session, onLogout }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#" className="navbar-logo">
          <img src="/logo.png" alt="HealDerm Logo" className="logo-img" />
          <span className="logo-text">HealDerm AI</span>
        </a>
        <div className="navbar-links">
          {!session && (
            <>
              <a href="#features" className="nav-link">{t('nav.features')}</a>
              <a href="#solution" className="nav-link">{t('nav.howItWorks')}</a>
              <a href="#impact" className="nav-link">{t('nav.impact')}</a>
            </>
          )}
        </div>
        <div className="navbar-actions">
          <button onClick={toggleLanguage} className="icon-btn" aria-label="Toggle Language" title="English / हिंदी">
            <Globe size={20} />
            <span className="lang-text">{i18n.language === 'en' ? 'EN' : 'HI'}</span>
          </button>
          <button onClick={toggleTheme} className="icon-btn theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {session ? (
            <button onClick={onLogout} className="btn-secondary nav-btn">Sign Out</button>
          ) : (
            <>
              <button onClick={onLoginClick} className="btn-secondary nav-btn d-md-none">{t('nav.login')}</button>
              <button onClick={onLoginClick} className="btn-primary nav-btn get-started">{t('nav.getStarted')}</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
