import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProblemStatement.css';

const ProblemStatement: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="problem" className="problem-section">
            <div className="container problem-container">
                <div className="section-header text-center animate-fade-in">
                    <div className="badge">{t('problem.badge')}</div>
                    <h2 className="section-title">{t('problem.title')}</h2>
                    <p className="section-subtitle">{t('problem.subtitle')}</p>
                </div>

                <div className="problem-grid">
                    <div className="problem-card glass-panel animate-fade-in delay-100">
                        <div className="icon-wrapper alert">!</div>
                        <h3>{t('problem.card1Title')}</h3>
                        <p>{t('problem.card1Desc')}</p>
                    </div>

                    <div className="problem-card glass-panel animate-fade-in delay-200">
                        <div className="icon-wrapper map">◎</div>
                        <h3>{t('problem.card2Title')}</h3>
                        <p>{t('problem.card2Desc')}</p>
                    </div>

                    <div className="problem-card glass-panel animate-fade-in delay-300">
                        <div className="icon-wrapper clock">◷</div>
                        <h3>{t('problem.card3Title')}</h3>
                        <p>{t('problem.card3Desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemStatement;
