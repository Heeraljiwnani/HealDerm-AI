import React from 'react';
import { Activity, ArrowRight, Bell, BriefcaseMedical, FolderKanban, Users } from 'lucide-react';

interface ProviderHomeViewProps {
    userName: string;
    onNavigate: (view: 'provider-home' | 'provider-management' | 'provider-alerts') => void;
}

const ProviderHomeView: React.FC<ProviderHomeViewProps> = ({ userName, onNavigate }) => {
    const serviceCards = [
        {
            key: 'provider-management' as const,
            icon: Users,
            title: 'Patient Management',
            description: 'Open the full roster, review each patient timeline, and inspect wound or skin uploads in one place.',
            cta: 'Open roster',
        },
        {
            key: 'provider-alerts' as const,
            icon: Bell,
            title: 'Clinical Alerts',
            description: 'See missed care tasks, rising severity cases, and patients who need faster intervention.',
            cta: 'View alerts',
        },
        {
            key: 'provider-management' as const,
            icon: FolderKanban,
            title: 'Case Reviews',
            description: 'Track progression snapshots, compare recent uploads, and triage by risk level.',
            cta: 'Review cases',
        },
    ];

    return (
        <div className="view-container dashboard-home animate-fade-in">
            <section className="dashboard-hero card glass-panel provider-hero">
                <div className="dashboard-hero-copy">
                    <div className="hero-pill">
                        <BriefcaseMedical size={16} />
                        <span>Provider workspace active</span>
                    </div>
                    <h2 className="dashboard-hero-title">Welcome back, {userName}</h2>
                    <p className="dashboard-hero-text">
                        This dashboard is tuned for healthcare providers. You can monitor patient progress,
                        inspect uploaded wound images, and prioritize follow-up from a single clinical workspace.
                    </p>
                </div>

                <div className="dashboard-hero-stats">
                    <div className="hero-stat-card">
                        <Users size={18} className="text-primary" />
                        <div>
                            <div className="hero-stat-value">18</div>
                            <div className="hero-stat-label">Active patients</div>
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <Activity size={18} className="text-warning" />
                        <div>
                            <div className="hero-stat-value">6</div>
                            <div className="hero-stat-label">Cases needing review</div>
                        </div>
                    </div>
                    <div className="hero-stat-card">
                        <Bell size={18} className="text-danger" />
                        <div>
                            <div className="hero-stat-value">3</div>
                            <div className="hero-stat-label">High priority alerts</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-section">
                <div className="section-heading">
                    <div>
                        <h3>Provider tools</h3>
                        <p className="text-muted">Designed for monitoring multiple patients and reviewing progression quickly.</p>
                    </div>
                </div>

                <div className="service-grid">
                    {serviceCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <button
                                key={card.title}
                                className="service-card service-card-primary"
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
        </div>
    );
};

export default ProviderHomeView;
