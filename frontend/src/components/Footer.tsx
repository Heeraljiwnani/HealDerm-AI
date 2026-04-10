import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src="/logo.png" alt="HealDerm Logo" className="logo-img-small" />
                        <span className="logo-text">HealDerm AI</span>
                    </div>
                    <p className="footer-desc">
                        {t('footer.desc')}
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon">In</a>
                        <a href="#" className="social-icon">Tw</a>
                        <a href="#" className="social-icon">Fb</a>
                    </div>
                </div>

                <div className="footer-links-group">
                    <h4>{t('footer.platform')}</h4>
                    <a href="#features">{t('footer.features')}</a>
                    <a href="#clinical">{t('footer.clinical')}</a>
                    <a href="#integrate">{t('footer.integrations')}</a>
                    <a href="#pricing">{t('footer.pricing')}</a>
                </div>

                <div className="footer-links-group">
                    <h4>{t('footer.resources')}</h4>
                    <a href="#help">{t('footer.help')}</a>
                    <a href="#docs">{t('footer.docs')}</a>
                    <a href="#blog">{t('footer.blog')}</a>
                    <a href="#case">{t('footer.caseStudies')}</a>
                </div>

                <div className="footer-links-group">
                    <h4>{t('footer.company')}</h4>
                    <a href="#about">{t('footer.about')}</a>
                    <a href="#careers">{t('footer.careers')}</a>
                    <a href="#contact">{t('footer.contact')}</a>
                    <a href="#privacy">{t('footer.privacy')}</a>
                </div>
            </div>

            <div className="container">
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
                    <p>{t('footer.madeFor')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
