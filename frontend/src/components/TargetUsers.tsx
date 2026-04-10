import React from 'react';
import { useTranslation } from 'react-i18next';
import './TargetUsers.css';

const TargetUsers: React.FC = () => {
    const { t } = useTranslation();

    const users = [
        {
            title: t('users.user1Title'),
            desc: t('users.user1Desc'),
            icon: "🩸"
        },
        {
            title: t('users.user2Title'),
            desc: t('users.user2Desc'),
            icon: "🏥"
        },
        {
            title: t('users.user3Title'),
            desc: t('users.user3Desc'),
            icon: "🧴"
        },
        {
            title: t('users.user4Title'),
            desc: t('users.user4Desc'),
            icon: "👨‍⚕️"
        },
        {
            title: t('users.user5Title'),
            desc: t('users.user5Desc'),
            icon: "🤝"
        }
    ];

    return (
        <section id="users" className="users-section">
            <div className="container">
                <div className="users-wrapper glass-panel">
                    <div className="users-content animate-fade-in delay-100">
                        <div className="badge">{t('users.badge')}</div>
                        <h2 className="section-title">{t('users.title')}</h2>
                        <p className="section-subtitle">
                            {t('users.subtitle')}
                        </p>
                        <button className="btn-primary mt-4">{t('users.button')}</button>
                    </div>

                    <div className="user-cards animate-fade-in delay-200">
                        {users.map((user, index) => (
                            <div key={index} className="user-card-item">
                                <div className="user-icon">{user.icon}</div>
                                <div>
                                    <h4>{user.title}</h4>
                                    <p>{user.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TargetUsers;
