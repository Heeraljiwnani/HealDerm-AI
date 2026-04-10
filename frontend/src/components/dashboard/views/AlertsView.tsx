import React from 'react';
import { AlertTriangle, BellRing, CheckCircle2, Clock3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AlertsView: React.FC = () => {
    const { t } = useTranslation();

    const alerts = [
        {
            title: t('dashboard.alerts.items.missedCareTitle'),
            description: t('dashboard.alerts.items.missedCareDesc'),
            type: 'warning',
            meta: '2 hours ago',
            icon: AlertTriangle,
        },
        {
            title: t('dashboard.alerts.items.followupTitle'),
            description: t('dashboard.alerts.items.followupDesc'),
            type: 'primary',
            meta: 'Tomorrow',
            icon: Clock3,
        },
        {
            title: t('dashboard.alerts.items.stableTitle'),
            description: t('dashboard.alerts.items.stableDesc'),
            type: 'success',
            meta: 'Latest scan',
            icon: CheckCircle2,
        },
    ] as const;

    return (
        <div className="view-container animate-fade-in">
            <div className="view-header mb-6">
                <h2>{t('dashboard.alerts.title')}</h2>
                <p className="text-muted">{t('dashboard.alerts.desc')}</p>
            </div>

            <div className="dashboard-grid">
                <div className="card glass-panel">
                    <div className="provider-panel-title">
                        <h3>{t('dashboard.alerts.priorityTitle')}</h3>
                        <span className="badge warning">3 active</span>
                    </div>

                    <div className="provider-patient-list">
                        {alerts.map((alert) => {
                            const Icon = alert.icon;
                            return (
                                <div key={alert.title} className="provider-patient-card active">
                                    <div>
                                        <div className="provider-patient-card-top">
                                            <div className="provider-avatar">
                                                <Icon size={16} />
                                            </div>
                                            <span className={`badge ${alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'success' : 'danger'}`}>
                                                {alert.meta}
                                            </span>
                                        </div>
                                        <div className="provider-patient-card-body">
                                            <h4>{alert.title}</h4>
                                            <p>{alert.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="card glass-panel">
                    <div className="provider-panel-title">
                        <h3>{t('dashboard.alerts.summaryTitle')}</h3>
                        <BellRing size={18} className="text-primary" />
                    </div>

                    <div className="home-checklist">
                        <div className="home-check-item">
                            <span className="home-check-index">1</span>
                            <div>
                                <div className="font-semibold">{t('dashboard.alerts.summary.item1Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.alerts.summary.item1Desc')}</div>
                            </div>
                        </div>
                        <div className="home-check-item">
                            <span className="home-check-index">2</span>
                            <div>
                                <div className="font-semibold">{t('dashboard.alerts.summary.item2Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.alerts.summary.item2Desc')}</div>
                            </div>
                        </div>
                        <div className="home-check-item">
                            <span className="home-check-index">3</span>
                            <div>
                                <div className="font-semibold">{t('dashboard.alerts.summary.item3Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.alerts.summary.item3Desc')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertsView;
