import React from 'react';
import { Calendar as CalendarIcon, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const WorkflowView: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div className="view-container animate-fade-in">
            <div className="view-header flex justify-between items-center mb-6">
                <div>
                    <h2>{t('dashboard.workflow.title')}</h2>
                    <p className="text-muted">{t('dashboard.workflow.desc')}</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <CalendarIcon size={18} /> {t('dashboard.workflow.customTask')}
                </button>
            </div>

            <div className="dashboard-grid split-1-2">
                {/* Reminders Column bg-danger-10 text-danger border-danger/20 */}
                <div className="flex flex-col gap-4">
                    <div className="card glass-panel border-danger/20">
                        <div className="flex items-center gap-2 text-danger mb-3 font-semibold">
                            <AlertTriangle size={18} />
                            <h3>{t('dashboard.workflow.missedAlert')}</h3>
                        </div>
                        <div className="p-3 bg-danger-10 rounded-lg text-sm border border-danger/20 mb-3">
                            <p className="font-medium text-danger">{t('dashboard.workflow.missedDesc')}</p>
                            <p className="text-danger/80 text-xs mt-1">{t('dashboard.workflow.scheduledFor')}</p>
                        </div>
                        <button className="btn-secondary w-full text-sm">{t('dashboard.workflow.markDone')}</button>
                    </div>

                    <div className="card glass-panel flex-1">
                        <h3 className="mb-4">{t('dashboard.workflow.upcomingReminders')}</h3>
                        <div className="task-list">
                            <div className="task-item active">
                                <span className="task-time text-primary">02:00 PM</span>
                                <div className="task-content">
                                    <h4>{t('dashboard.workflow.dermFollowup')}</h4>
                                    <p className="text-xs text-muted">{t('dashboard.workflow.tomorrow')} • Dr. Sharma</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Tasks Column */}
                <div className="card glass-panel">
                    <h3 className="mb-4">{t('dashboard.workflow.todayTasks')}</h3>

                    <div className="space-y-4">
                        <div className="text-sm font-semibold text-muted pl-2">{t('dashboard.workflow.upcoming')}</div>
                        <div className="task-list pl-2">
                            <div className="task-item active border border-main-20 hover:border-primary transition-colors cursor-pointer group">
                                <span className="task-time text-primary flex items-center gap-1 group-hover:scale-110 transition-transform">
                                    <Clock size={14} /> 14:00
                                </span>
                                <div className="task-content flex-1">
                                    <h4 className="flex items-center justify-between">
                                        Evening Dressing Change
                                    </h4>
                                    <p className="text-xs text-muted mt-1">Right Leg Ulcer • Requires Antiseptic</p>
                                </div>
                                <div className="w-6 h-6 rounded border-2 border-main-20 group-hover:border-primary ml-auto mr-2 flex items-center justify-center text-transparent hover:text-primary">
                                    <CheckCircle size={16} />
                                </div>
                            </div>
                        </div>

                        <div className="text-sm font-semibold text-muted pl-2 mt-6">{t('dashboard.workflow.completed')}</div>
                        <div className="task-list pl-2 opacity-60">
                            <div className="task-item bg-success-10/10">
                                <span className="task-time line-through text-muted/50">08:00</span>
                                <div className="task-content">
                                    <h4 className="line-through text-muted">Morning Medication</h4>
                                    <p className="text-xs text-muted">Antibiotics • Take with food</p>
                                </div>
                                <CheckCircle size={20} className="text-success ml-auto mr-2" />
                            </div>
                            <div className="task-item bg-success-10/10 mt-2">
                                <span className="task-time line-through text-muted/50">09:30</span>
                                <div className="task-content">
                                    <h4 className="line-through text-muted">Routine Photo Log</h4>
                                    <p className="text-xs text-muted">Right Leg Ulcer</p>
                                </div>
                                <CheckCircle size={20} className="text-success ml-auto mr-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowView;
