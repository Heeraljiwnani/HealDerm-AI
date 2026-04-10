import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Features.css';

const Features: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('primary');

    return (
        <section id="features" className="features-section">
            <div className="container features-container">
                <div className="section-header text-center animate-fade-in">
                    <div className="badge">{t('features.badge')}</div>
                    <h2 className="section-title">{t('features.title')}</h2>
                    <p className="section-subtitle">{t('features.subtitle')}</p>
                </div>

                <div className="tabs-container animate-fade-in delay-100">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'primary' ? 'active' : ''}`}
                            onClick={() => setActiveTab('primary')}
                        >
                            {t('features.tabCore')}
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
                            onClick={() => setActiveTab('manage')}
                        >
                            {t('features.tabManage')}
                        </button>
                    </div>

                    <div className="tabs-content">
                        <div className={`tab-pane ${activeTab === 'primary' ? 'active' : ''}`}>
                            <div className="features-grid">
                                <div className="feature-item glass-panel">
                                    <div className="feature-icon bg-gradient">🔍</div>
                                    <h3>{t('features.core1Title')}</h3>
                                    <p>{t('features.core1Desc')}</p>
                                </div>
                                <div className="feature-item glass-panel">
                                    <div className="feature-icon bg-gradient">📸</div>
                                    <h3>{t('features.core2Title')}</h3>
                                    <p>{t('features.core2Desc')}</p>
                                </div>
                                <div className="feature-item glass-panel">
                                    <div className="feature-icon bg-gradient">📊</div>
                                    <h3>{t('features.core3Title')}</h3>
                                    <p>{t('features.core3Desc')}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`tab-pane ${activeTab === 'manage' ? 'active' : ''}`}>
                            <div className="features-grid secondary">
                                <div className="feature-card">
                                    <h4>{t('features.manage1Title')}</h4>
                                    <ul>
                                        <li>{t('features.manage1Item1')}</li>
                                        <li>{t('features.manage1Item2')}</li>
                                        <li>{t('features.manage1Item3')}</li>
                                    </ul>
                                </div>
                                <div className="feature-card">
                                    <h4>{t('features.manage2Title')}</h4>
                                    <ul>
                                        <li>{t('features.manage2Item1')}</li>
                                        <li>{t('features.manage2Item2')}</li>
                                        <li>{t('features.manage2Item3')}</li>
                                    </ul>
                                </div>
                                <div className="feature-card">
                                    <h4>{t('features.manage3Title')}</h4>
                                    <ul>
                                        <li>{t('features.manage3Item1')}</li>
                                        <li>{t('features.manage3Item2')}</li>
                                        <li>{t('features.manage3Item3')}</li>
                                    </ul>
                                </div>
                                <div className="feature-card">
                                    <h4>{t('features.manage4Title')}</h4>
                                    <ul>
                                        <li>{t('features.manage4Item1')}</li>
                                        <li>{t('features.manage4Item2')}</li>
                                        <li>{t('features.manage4Item3')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
