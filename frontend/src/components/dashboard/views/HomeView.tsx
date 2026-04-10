import React from 'react';
import {
    Activity,
    ArrowRight,
    Bell,
    CalendarClock,
    ClipboardPlus,
    LineChart,
    ShieldCheck,
    Stethoscope,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HomeViewProps {
    userName: string;
    onNavigate: (view: 'assessments' | 'management' | 'workflow' | 'alerts') => void;
}

const HomeView: React.FC<HomeViewProps> = ({ userName, onNavigate }) => {
    const { t } = useTranslation();

    const serviceCards = [
        {
            key: 'assessments',
            icon: Stethoscope,
            title: t('dashboard.home.services.assessments.title'),
            description: t('dashboard.home.services.assessments.desc'),
            cta: t('dashboard.home.services.assessments.cta'),
            accent: 'primary',
        },
        {
            key: 'management',
            icon: LineChart,
            title: t('dashboard.home.services.management.title'),
            description: t('dashboard.home.services.management.desc'),
            cta: t('dashboard.home.services.management.cta'),
            accent: 'success',
        },
        {
            key: 'workflow',
            icon: CalendarClock,
            title: t('dashboard.home.services.workflow.title'),
            description: t('dashboard.home.services.workflow.desc'),
            cta: t('dashboard.home.services.workflow.cta'),
            accent: 'warning',
        },
        {
            key: 'alerts',
            icon: Bell,
            title: t('dashboard.home.services.alerts.title'),
            description: t('dashboard.home.services.alerts.desc'),
            cta: t('dashboard.home.services.alerts.cta'),
            accent: 'danger',
        },
    ] as const;

    return (
        <div className="view-container dashboard-home animate-fade-in">
            <section className="dashboard-hero card glass-panel">
                <div className="dashboard-hero-copy">
                    <div className="hero-pill">
                        <ShieldCheck size={16} />
                        <span>{t('dashboard.home.safeBadge')}</span>
                    </div>
                    <h2 className="dashboard-hero-title">
                        {t('dashboard.home.greeting', { name: userName })}
                    </h2>
                    <p className="dashboard-hero-text">{t('dashboard.home.subtitle')}</p>
                </div>

                <div className="dashboard-hero-stats">
                    <div className="hero-stat-card">
                        <ClipboardPlus size={18} className="text-primary" />
                        <div>
                            <div className="hero-stat-value">4</div>
                            <div className="hero-stat-label">{t('dashboard.home.stats.services')}</div>
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <Activity size={18} className="text-success" />
                        <div>
                            <div className="hero-stat-value">1</div>
                            <div className="hero-stat-label">{t('dashboard.home.stats.activeTrackers')}</div>
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <Bell size={18} className="text-warning" />
                        <div>
                            <div className="hero-stat-value">2</div>
                            <div className="hero-stat-label">{t('dashboard.home.stats.reminders')}</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-section">
                <div className="section-heading">
                    <div>
                        <h3>{t('dashboard.home.servicesTitle')}</h3>
                        <p className="text-muted">{t('dashboard.home.servicesSubtitle')}</p>
                    </div>
                </div>

                <div className="service-grid">
                    {serviceCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <button
                                key={card.key}
                                className={`service-card service-card-${card.accent}`}
                                onClick={() => onNavigate(card.key)}
                            >
                                <div className="service-card-top">
                                    <div className="service-icon-wrap">
                                        <Icon size={22} />
                                    </div>
                                    <ArrowRight size={18} className="service-arrow" />
                                </div>
                                <h4>{card.title}</h4>
                                <p>{card.description}</p>
                                <span className="service-cta">{card.cta}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="dashboard-grid home-lower-grid">
                <div className="card glass-panel">
                    <h3 className="mb-4">{t('dashboard.home.quickStartTitle')}</h3>
                    <div className="home-checklist">
                        <div className="home-check-item">
                            <span className="home-check-index">1</span>
                            <div>
                                <div className="font-semibold">{t('dashboard.home.quickStart.step1Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.home.quickStart.step1Desc')}</div>
                            </div>
                        </div>
                        <div className="home-check-item">
                            <span className="home-check-index">2</span>
                            <div>
                                <div className="font-semibold">{t('dashboard.home.quickStart.step2Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.home.quickStart.step2Desc')}</div>
                            </div>
                        </div>
                        <div className="home-check-item">
                            <span className="home-check-index">3</span>
                            <div>
                                <div className="font-semibold">{t('dashboard.home.quickStart.step3Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.home.quickStart.step3Desc')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card glass-panel">
                    <h3 className="mb-4">{t('dashboard.home.todayTitle')}</h3>
                    <div className="home-agenda">
                        <div className="agenda-item">
                            <div className="agenda-time">09:30</div>
                            <div>
                                <div className="font-semibold">{t('dashboard.home.today.item1Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.home.today.item1Desc')}</div>
                            </div>
                        </div>
                        <div className="agenda-item">
                            <div className="agenda-time">14:00</div>
                            <div>
                                <div className="font-semibold">{t('dashboard.home.today.item2Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.home.today.item2Desc')}</div>
                            </div>
                        </div>
                        <div className="agenda-item">
                            <div className="agenda-time">18:30</div>
                            <div>
                                <div className="font-semibold">{t('dashboard.home.today.item3Title')}</div>
                                <div className="text-sm text-muted">{t('dashboard.home.today.item3Desc')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeView;
