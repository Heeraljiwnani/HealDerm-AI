import React, { useState } from 'react';
import { Camera, TrendingDown, Activity, Calendar, Image as ImageIcon, Plus, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ManagementView: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'wound' | 'skin'>('wound');
    const [activeWound, setActiveWound] = useState<'leg' | 'arm'>('leg');
    const [activeSkinAilment, setActiveSkinAilment] = useState<'psoriasis' | 'eczema'>('psoriasis');

    return (
        <div className="view-container animate-fade-in">
            <div className="view-header mb-6">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'wound' ? 'active' : ''}`}
                        onClick={() => setActiveTab('wound')}
                    >
                        {t('dashboard.management.tabWound')}
                    </button>
                    <button
                        className={`tab ${activeTab === 'skin' ? 'active' : ''}`}
                        onClick={() => setActiveTab('skin')}
                    >
                        {t('dashboard.management.tabSkin')}
                    </button>
                </div>
            </div>

            {activeTab === 'wound' ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2>{t('dashboard.management.woundLogsTitle')}</h2>
                            <p className="text-muted">{t('dashboard.management.woundLogsDesc')}</p>
                        </div>
                        <div className="flex gap-2">
                            <select
                                className="input-base border rounded p-2 text-sm"
                                value={activeWound}
                                onChange={(e) => setActiveWound(e.target.value as 'leg' | 'arm')}
                            >
                                <option value="leg">Right Leg Foot Ulcer (Oct 12)</option>
                                <option value="arm">Left Forearm Burn (Nov 03)</option>
                            </select>
                            <button className="btn-secondary px-3 py-1 flex items-center gap-1 text-sm">
                                <Plus size={16} /> {t('dashboard.management.recordWound')}
                            </button>
                        </div>
                    </div>

                    <div className="dashboard-grid split-1-2 mb-6">
                        {/* Summary left col */}
                        <div className="flex flex-col gap-4">
                            <div className="card glass-panel h-full flex flex-col justify-center">
                                <h3 className="mb-4 text-center">{t('dashboard.management.healingAnalytics')}</h3>
                                <div className="text-center mb-6">
                                    <div className="text-3xl font-bold text-success flex justify-center items-center gap-2">
                                        <TrendingDown size={24} /> 46%
                                    </div>
                                    <div className="text-sm text-muted">{t('dashboard.management.totalReduction')}</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="detail-row border-t pt-2 mt-2">
                                        <span className="text-sm text-muted">{t('dashboard.management.initialSize')}:</span>
                                        <span className="text-sm font-semibold">7.8 cm²</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="text-sm text-muted">{t('dashboard.management.currentSize')}:</span>
                                        <span className="text-sm font-semibold">4.2 cm²</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="text-sm text-muted">{t('dashboard.management.healingRate')}:</span>
                                        <span className="text-sm font-semibold text-success">+12% / week</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart / Logs */}
                        <div className="card glass-panel">
                            <div className="flex justify-between items-center mb-4">
                                <h3>{t('dashboard.management.dateProgression')}</h3>
                                <button className="btn-secondary text-sm px-3 py-1 flex items-center gap-2">
                                    <Camera size={14} /> {t('dashboard.management.addLog')}
                                </button>
                            </div>

                            <div className="chart-placeholder mb-6 border-b pb-6" style={{ height: '140px' }}>
                                <div className="mock-chart">
                                    <svg viewBox="0 0 400 100" className="w-full h-full" style={{ overflow: 'visible' }}>
                                        <polyline
                                            fill="none"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            points="0,90 80,85 160,70 240,65 320,40 400,45"
                                        />
                                        <circle cx="240" cy="65" r="4" fill="hsl(var(--surface-color))" stroke="hsl(var(--primary))" strokeWidth="2" />
                                        <circle cx="320" cy="40" r="4" fill="hsl(var(--surface-color))" stroke="hsl(var(--primary))" strokeWidth="2" />
                                        <circle cx="400" cy="45" r="4" fill="hsl(var(--surface-color))" stroke="hsl(var(--primary))" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-sm font-semibold mb-2">{t('dashboard.management.historyRepo')}</div>
                            <div className="w-full">
                                {[
                                    { date: 'Nov 04', size: '4.2', desc: 'Granulation progressing. Automatic size measurement.', alert: false },
                                    { date: 'Oct 28', size: '4.9', desc: 'Mild redness detected. Applied prescribed ointment.', alert: true },
                                    { date: 'Oct 19', size: '6.5', desc: 'First re-assessment. AI detected standard healing.', alert: false },
                                    { date: 'Oct 12', size: '7.8', desc: 'Initial Upload and wound baseline.', alert: false }
                                ].map((entry, idx) => (
                                    <div key={idx} className="flex gap-4 items-center p-3 border-b border-main-10 last:border-0 hover:bg-main-5 transition-colors">
                                        <div className="w-16 h-12 rounded bg-primary-10 flex items-center justify-center shrink-0">
                                            <ImageIcon size={20} className="text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex gap-2 items-center">
                                                <span className="font-semibold text-sm flex items-center gap-1"><Calendar size={12} /> {entry.date}</span>
                                                {entry.alert && <span className="badge warning px-2 py-0" style={{ fontSize: '0.65rem' }}>Flag</span>}
                                            </div>
                                            <div className="text-xs text-muted mt-1">{entry.desc}</div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="font-bold text-primary">{entry.size} cm²</div>
                                            <div className="text-[0.65rem] text-muted">{t('dashboard.management.autoMeasured')}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2>{t('dashboard.management.skinTitle')}</h2>
                            <p className="text-muted">{t('dashboard.management.skinDesc')}</p>
                        </div>
                        <div className="flex gap-2">
                            <select
                                className="input-base border rounded p-2 text-sm"
                                value={activeSkinAilment}
                                onChange={(e) => setActiveSkinAilment(e.target.value as 'psoriasis' | 'eczema')}
                            >
                                <option value="psoriasis">Psoriasis</option>
                                <option value="eczema">Eczema</option>
                            </select>
                            <button className="btn-secondary px-3 py-1 flex items-center gap-1 text-sm">
                                <Plus size={16} /> {t('dashboard.management.recordAilment')}
                            </button>
                        </div>
                    </div>

                    <div className="dashboard-grid split-1-2 mb-6">
                        {/* Summary / Uploads col */}
                        <div className="flex flex-col gap-4">
                            <div className="card glass-panel h-full flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3>{t('dashboard.management.diagnosisDetails')}</h3>
                                        <span className="badge warning flex items-center gap-1 text-xs">
                                            <Activity size={12} /> Mild Flare-up
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="detail-row border-t pt-2 mt-2 border-main-10">
                                            <span className="text-sm text-muted">{t('dashboard.management.diagnosis')}:</span>
                                            <span className="text-sm font-semibold">Plaque Psoriasis</span>
                                        </div>
                                        <div className="detail-row border-main-10">
                                            <span className="text-sm text-muted">{t('dashboard.management.estTime')}:</span>
                                            <span className="text-sm font-semibold">4-6 Weeks</span>
                                        </div>
                                        <div className="detail-row border-main-10">
                                            <span className="text-sm text-muted">{t('dashboard.management.symptoms')}:</span>
                                            <span className="text-sm font-semibold">Redness, Scaling</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-2">
                                    <button className="btn-secondary text-sm flex justify-center items-center gap-2 py-2 border-dashed">
                                        <FileText size={16} /> {t('dashboard.management.uploadDoc')}
                                    </button>
                                    <button className="btn-secondary text-sm flex justify-center items-center gap-2 py-2 border-dashed">
                                        <Camera size={16} /> {t('dashboard.management.uploadImage')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chart / Logs */}
                        <div className="card glass-panel">
                            <div className="flex justify-between items-center mb-4">
                                <h3>{t('dashboard.management.timelineTitle')}</h3>
                                <button className="btn-secondary text-sm px-3 py-1 flex items-center gap-2">
                                    <Plus size={14} /> {t('dashboard.management.logSymptom')}
                                </button>
                            </div>

                            <div className="chart-placeholder mb-6 border-b border-main-10 pb-6" style={{ height: '140px' }}>
                                {/* Mockup Line Chart - oscillating severity */}
                                <div className="mock-chart">
                                    <svg viewBox="0 0 400 100" className="w-full h-full" style={{ overflow: 'visible' }}>
                                        {/* Baseline/Threshold */}
                                        <line x1="0" y1="40" x2="400" y2="40" stroke="hsla(var(--danger), 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                                        <polyline
                                            fill="none"
                                            stroke="hsl(var(--warning))"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            points="0,80 60,70 120,20 180,60 240,85 300,90 360,50 400,30"
                                        />
                                        {/* Flare up marker */}
                                        <circle cx="120" cy="20" r="5" fill="hsl(var(--danger))" />
                                        <circle cx="400" cy="30" r="5" fill="hsl(var(--warning))" />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-sm font-semibold mb-2">{t('dashboard.management.ailmentRepo')}</div>
                            <div className="w-full">
                                {[
                                    { date: 'Nov 20', type: 'image', title: 'Routine Snapshot Upload', desc: 'Mild scaling on elbow. Uploaded for reference.', badge: 'Routine' },
                                    { date: 'Nov 12', type: 'doc', title: 'Dr. Smith Prescription', desc: 'Added corticosteroid ointment to routine.', badge: 'Prescription' },
                                    { date: 'Nov 02', type: 'symptom', title: 'Severe Flare-up Logged', desc: 'Increased redness and itching due to weather change.', badge: 'Flare-up', isDanger: true },
                                    { date: 'Oct 15', type: 'doc', title: 'Initial Dermatologist Diagnosis', desc: 'Plaque Psoriasis confirmation.', badge: 'Diagnosis' },
                                ].map((entry, idx) => (
                                    <div key={idx} className="flex gap-4 items-center p-3 border-b border-main-10 last:border-0 hover:bg-main-5 transition-colors">
                                        <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 ${entry.isDanger ? 'bg-danger-10 text-danger' : 'bg-primary-10 text-primary'}`}>
                                            {entry.type === 'image' && <ImageIcon size={20} />}
                                            {entry.type === 'doc' && <FileText size={20} />}
                                            {entry.type === 'symptom' && <Activity size={20} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex gap-2 items-center">
                                                <span className="font-semibold text-sm flex items-center gap-1"><Calendar size={12} /> {entry.date}</span>
                                                <span className={`badge px-2 py-0 ${entry.isDanger ? 'danger' : 'success'}`} style={{ fontSize: '0.65rem' }}>{entry.badge}</span>
                                            </div>
                                            <div className="text-sm font-medium mt-1">{entry.title}</div>
                                            <div className="text-xs text-muted mt-0.5">{entry.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManagementView;
