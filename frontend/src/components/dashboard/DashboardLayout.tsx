import React, { useState } from 'react';
import {
    Bell,
    BriefcaseMedical,
    Home,
    Settings,
    LogOut,
    Menu,
    Sun,
    Moon,
    Globe,
    Stethoscope,
    LineChart,
    Calendar,
    X
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import HomeView from './views/HomeView';
import AssessmentsView from './views/AssessmentsView';
import AlertsView from './views/AlertsView';
import ManagementView from './views/ManagementView';
import ProviderHomeView from './views/ProviderHomeView';
import ProviderManagementView from './views/ProviderManagementView';
import SettingsView from './views/SettingsView';
import WorkflowView from './views/WorkflowView';
import './Dashboard.css';

interface DashboardProps {
    session: any;
    onLogout: () => void;
}

type ViewType =
    | 'home'
    | 'assessments'
    | 'management'
    | 'workflow'
    | 'alerts'
    | 'settings'
    | 'provider-home'
    | 'provider-management'
    | 'provider-alerts'
    | 'provider-settings';

const DashboardLayout: React.FC<DashboardProps> = ({ session, onLogout }) => {
    const { t, i18n } = useTranslation();
    const normalizedRole = session?.user?.user_metadata?.role === 'healthcare_provider' ? 'healthcare_provider' : 'patient';
    const [activeView, setActiveView] = useState<ViewType>(normalizedRole === 'healthcare_provider' ? 'provider-home' : 'home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');
    const userName = session?.user?.user_metadata?.full_name || session?.user?.email?.split('@')[0] || 'Patient';
    const roleLabel = normalizedRole === 'healthcare_provider' ? 'Healthcare Provider' : 'Patient';

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleNavigate = (view: ViewType) => {
        setActiveView(view);
        setIsSidebarOpen(false);
    };

    const switchLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const renderContent = () => {
        switch (activeView) {
            case 'home':
                return <HomeView userName={userName} onNavigate={handleNavigate} />;
            case 'provider-home':
                return <ProviderHomeView userName={userName} onNavigate={handleNavigate} />;
            case 'assessments':
                return <AssessmentsView />;
            case 'management':
                return <ManagementView />;
            case 'provider-management':
                return <ProviderManagementView />;
            case 'workflow':
                return <WorkflowView />;
            case 'alerts':
                return <AlertsView />;
            case 'settings':
                return (
                    <SettingsView
                        userName={userName}
                        email={session?.user?.email}
                        roleLabel={roleLabel}
                        theme={theme}
                        onToggleTheme={toggleTheme}
                        onSwitchLanguage={switchLanguage}
                    />
                );
            case 'provider-alerts':
                return <AlertsView />;
            case 'provider-settings':
                return (
                    <SettingsView
                        userName={userName}
                        email={session?.user?.email}
                        roleLabel={roleLabel}
                        theme={theme}
                        onToggleTheme={toggleTheme}
                        onSwitchLanguage={switchLanguage}
                    />
                );
            default:
                return <AssessmentsView />;
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Mobile Header */}
            <div className="dashboard-mobile-header d-md-none flex justify-between items-center p-4">
                <button onClick={toggleSidebar} className="icon-btn">
                    <Menu size={24} />
                </button>
                <span className="logo-text font-bold text-primary">HealDerm AI</span>
                <div className="mobile-header-actions">
                    <button
                        className="mobile-header-btn"
                        onClick={switchLanguage}
                        title="Switch Language"
                    >
                        <Globe size={16} />
                        <span>{i18n.language === 'en' ? 'EN' : 'HI'}</span>
                    </button>
                    <button
                        className="mobile-header-btn"
                        onClick={toggleTheme}
                        title="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    </button>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="sidebar-overlay d-md-none" onClick={() => setIsSidebarOpen(false)}></div>
            )}

            {/* Sidebar Navigation */}
            <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <span className="logo-text font-bold text-2xl text-primary">HealDerm AI</span>
                    <button
                        className="sidebar-close-btn"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="sidebar-user p-6">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-primary-10 flex items-center justify-center text-primary font-bold">
                            {session?.user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-info truncate">
                            <div className="font-semibold truncate" title={session?.user?.email}>{userName}</div>
                            <div className="text-sm text-muted">{roleLabel}</div>
                        </div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {normalizedRole === 'healthcare_provider' ? (
                        <>
                            <button
                                className={`sidebar-nav-item ${activeView === 'provider-home' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('provider-home'); }}
                            >
                                <BriefcaseMedical size={18} />
                                <span>{t('dashboard.provider.nav.home')}</span>
                            </button>
                            <button
                                className={`sidebar-nav-item ${activeView === 'provider-management' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('provider-management'); }}
                            >
                                <LineChart size={18} />
                                <span>{t('dashboard.provider.nav.management')}</span>
                            </button>
                            <button
                                className={`sidebar-nav-item ${activeView === 'provider-alerts' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('provider-alerts'); }}
                            >
                                <Bell size={18} />
                                <span>{t('dashboard.provider.nav.alerts')}</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`sidebar-nav-item ${activeView === 'home' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('home'); }}
                            >
                                <Home size={18} />
                                <span>{t('dashboard.nav.home')}</span>
                            </button>

                            <button
                                className={`sidebar-nav-item ${activeView === 'assessments' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('assessments'); }}
                            >
                                <Stethoscope size={18} />
                                <span>{t('dashboard.nav.assessments')}</span>
                            </button>

                            <button
                                className={`sidebar-nav-item ${activeView === 'management' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('management'); }}
                            >
                                <LineChart size={18} />
                                <span>{t('dashboard.nav.management')}</span>
                            </button>

                            <button
                                className={`sidebar-nav-item ${activeView === 'workflow' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('workflow'); }}
                            >
                                <Calendar size={18} />
                                <span>{t('dashboard.nav.workflow')}</span>
                            </button>

                            <button
                                className={`sidebar-nav-item ${activeView === 'alerts' ? 'active' : ''}`}
                                onClick={() => { handleNavigate('alerts'); }}
                            >
                                <Bell size={18} />
                                <span>{t('dashboard.nav.alerts')}</span>
                            </button>
                        </>
                    )}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-preferences">
                        <button
                            className="sidebar-pref-btn"
                            onClick={switchLanguage}
                            title="Switch Language"
                        >
                            <Globe size={16} />
                            <span>{i18n.language === 'en' ? 'English' : 'Hindi'}</span>
                        </button>
                        <button
                            className="sidebar-pref-btn"
                            onClick={toggleTheme}
                            title="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                        </button>
                    </div>

                    <button
                        className={`sidebar-nav-item ${activeView === 'settings' || activeView === 'provider-settings' ? 'active' : ''}`}
                        onClick={() => { handleNavigate(normalizedRole === 'healthcare_provider' ? 'provider-settings' : 'settings'); }}
                    >
                        <Settings size={18} />
                        <span>{t('dashboard.user.settings')}</span>
                    </button>

                    {/* Sign-out button directly in sidebar for mobile too, just in case */}
                    <button
                        className="sidebar-nav-item danger text-danger mt-2 d-md-none"
                        onClick={onLogout}
                    >
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main">
                <header className="dashboard-topbar">
                    <h1 className="dashboard-title">
                        {activeView === 'home' && t('dashboard.nav.home')}
                        {activeView === 'provider-home' && t('dashboard.provider.nav.home')}
                        {activeView === 'assessments' && t('dashboard.nav.assessments')}
                        {activeView === 'management' && t('dashboard.nav.management')}
                        {activeView === 'provider-management' && t('dashboard.provider.nav.management')}
                        {activeView === 'workflow' && t('dashboard.nav.workflow')}
                        {activeView === 'alerts' && t('dashboard.nav.alerts')}
                        {activeView === 'settings' && t('dashboard.user.settings')}
                        {activeView === 'provider-alerts' && t('dashboard.provider.nav.alerts')}
                        {activeView === 'provider-settings' && t('dashboard.user.settings')}
                    </h1>

                    <div className="topbar-actions flex items-center gap-4">
                        {/* Language Toggle */}
                        <button
                            className="btn-icon theme-toggle flex items-center gap-2 px-3 py-1.5 rounded-full border border-main-20 hover:bg-main-5"
                            onClick={switchLanguage}
                            title="Switch Language"
                        >
                            <Globe size={18} />
                            <span className="font-semibold text-sm">{i18n.language === 'en' ? 'EN' : 'HI'}</span>
                        </button>

                        {/* Theme Toggle */}
                        <button
                            className="btn-icon theme-toggle p-2 rounded-full border border-main-20 hover:bg-main-5"
                            onClick={toggleTheme}
                            title="Toggle Theme"
                        >
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        <button
                            className="btn-secondary text-danger border-danger hover:bg-danger-10 flex items-center gap-2 px-4 py-1.5 d-none d-md-flex"
                            onClick={onLogout}
                        >
                            <LogOut size={16} />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </header>

                <div className="dashboard-content-scroll">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
