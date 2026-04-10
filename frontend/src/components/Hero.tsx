import React from 'react';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content animate-fade-in">
                    <div className="badge">{t('hero.badge')}</div>
                    <h1 className="hero-title">
                        {t('hero.title1')}<br />
                        <span className="text-gradient">{t('hero.title2')}</span>
                    </h1>
                    <p className="hero-subtitle delay-100">
                        {t('hero.subtitle')}
                    </p>

                    <div className="hero-cta delay-200">
                        <button className="btn-primary">{t('hero.downloadApp')}</button>
                        <button className="btn-secondary">{t('hero.viewDemo')}</button>
                    </div>

                    <div className="hero-stats delay-300">
                        <div className="stat-item">
                            <h3>{t('hero.stat1Value')}</h3>
                            <p>{t('hero.stat1Label')}</p>
                        </div>
                        <div className="stat-item">
                            <h3>{t('hero.stat2Value')}</h3>
                            <p>{t('hero.stat2Label')}</p>
                        </div>
                        <div className="stat-item">
                            <h3>{t('hero.stat3Value')}</h3>
                            <p>{t('hero.stat3Label')}</p>
                        </div>
                    </div>
                </div>

                <div className="hero-visual animate-fade-in delay-200">
                    <div className="glass-panel app-mockup">
                        <div className="mockup-header">
                            <span className="mockup-dot red"></span>
                            <span className="mockup-dot yellow"></span>
                            <span className="mockup-dot green"></span>
                        </div>
                        <div className="mockup-content">
                            <div className="scan-animation">
                                <div className="scan-line"></div>
                                <div className="scan-subject">
                                    <div className="placeholder-wound"></div>
                                </div>
                            </div>
                            <div className="mockup-results">
                                <div className="result-item loading"></div>
                                <div className="result-item loading short"></div>
                                <div className="result-badge success">{t('hero.mockupBadge')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
