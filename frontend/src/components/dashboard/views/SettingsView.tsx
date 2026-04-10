import React from 'react';
import { Globe, MoonStar, ShieldCheck, UserRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SettingsViewProps {
    userName: string;
    email?: string;
    roleLabel: string;
    theme: string;
    onToggleTheme: () => void;
    onSwitchLanguage: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({
    userName,
    email,
    roleLabel,
    theme,
    onToggleTheme,
    onSwitchLanguage,
}) => {
    const { t, i18n } = useTranslation();

    return (
        <div className="view-container animate-fade-in">
            <div className="view-header mb-6">
                <h2>{t('dashboard.settings.title')}</h2>
                <p className="text-muted">{t('dashboard.settings.desc')}</p>
            </div>

            <div className="dashboard-grid">
                <div className="card glass-panel">
                    <div className="provider-panel-title">
                        <h3>{t('dashboard.settings.profileTitle')}</h3>
                        <UserRound size={18} className="text-primary" />
                    </div>

                    <div className="home-checklist">
                        <div className="home-check-item">
                            <span className="home-check-index">
                                <UserRound size={16} />
                            </span>
                            <div>
                                <div className="font-semibold">{userName}</div>
                                <div className="text-sm text-muted">{email || 'No email available'}</div>
                            </div>
                        </div>
                        <div className="home-check-item">
                            <span className="home-check-index">
                                <ShieldCheck size={16} />
                            </span>
                            <div>
                                <div className="font-semibold">{t('dashboard.settings.roleTitle')}</div>
                                <div className="text-sm text-muted">{roleLabel}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card glass-panel">
                    <div className="provider-panel-title">
                        <h3>{t('dashboard.settings.preferencesTitle')}</h3>
                        <ShieldCheck size={18} className="text-primary" />
                    </div>

                    <div className="provider-patient-list">
                        <button className="provider-patient-card active" onClick={onToggleTheme}>
                            <div>
                                <div className="provider-patient-card-top">
                                    <div className="provider-avatar">
                                        <MoonStar size={16} />
                                    </div>
                                    <span className="badge success">{theme}</span>
                                </div>
                                <div className="provider-patient-card-body">
                                    <h4>{t('dashboard.settings.themeTitle')}</h4>
                                    <p>{t('dashboard.settings.themeDesc')}</p>
                                </div>
                            </div>
                        </button>

                        <button className="provider-patient-card active" onClick={onSwitchLanguage}>
                            <div>
                                <div className="provider-patient-card-top">
                                    <div className="provider-avatar">
                                        <Globe size={16} />
                                    </div>
                                    <span className="badge warning">{i18n.language.toUpperCase()}</span>
                                </div>
                                <div className="provider-patient-card-body">
                                    <h4>{t('dashboard.settings.languageTitle')}</h4>
                                    <p>{t('dashboard.settings.languageDesc')}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
