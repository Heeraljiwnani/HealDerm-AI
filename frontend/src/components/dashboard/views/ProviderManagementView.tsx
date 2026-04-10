import React, { useMemo, useState } from 'react';
import { AlertTriangle, Camera, CheckCircle2, ChevronRight, Clock3, Image as ImageIcon, UserRound } from 'lucide-react';

type PatientRecord = {
    id: string;
    name: string;
    condition: string;
    risk: 'Low' | 'Moderate' | 'High';
    lastUpdate: string;
    progress: number;
    healingTrend: string;
    note: string;
    photos: string[];
};

const patientRecords: PatientRecord[] = [
    {
        id: 'PT-104',
        name: 'Riya Sharma',
        condition: 'Diabetic foot ulcer',
        risk: 'High',
        lastUpdate: '2 hours ago',
        progress: 34,
        healingTrend: 'Severity increased from 58 to 71 in 5 days',
        note: 'New redness around wound border. Recommend direct review.',
        photos: ['Apr 10', 'Apr 08', 'Apr 05', 'Apr 01'],
    },
    {
        id: 'PT-091',
        name: 'Aman Verma',
        condition: 'Pressure injury follow-up',
        risk: 'Moderate',
        lastUpdate: 'Today',
        progress: 62,
        healingTrend: 'Area reduced by 18% this week',
        note: 'Granulation improving with steady dressing adherence.',
        photos: ['Apr 10', 'Apr 07', 'Apr 03'],
    },
    {
        id: 'PT-077',
        name: 'Maya Iyer',
        condition: 'Skin lesion monitoring',
        risk: 'Low',
        lastUpdate: 'Yesterday',
        progress: 81,
        healingTrend: 'No flare-up in the last 10 days',
        note: 'Current state is stable; continue routine image logs.',
        photos: ['Apr 09', 'Apr 06', 'Apr 02'],
    },
];

const ProviderManagementView: React.FC = () => {
    const [selectedPatientId, setSelectedPatientId] = useState(patientRecords[0].id);

    const selectedPatient = useMemo(
        () => patientRecords.find((patient) => patient.id === selectedPatientId) ?? patientRecords[0],
        [selectedPatientId]
    );

    const riskClass =
        selectedPatient.risk === 'High'
            ? 'danger'
            : selectedPatient.risk === 'Moderate'
                ? 'warning'
                : 'success';

    return (
        <div className="view-container animate-fade-in">
            <div className="view-header provider-header-grid">
                <div>
                    <h2>Patient management</h2>
                    <p className="text-muted">
                        Review progression, uploaded photos, and care notes across all assigned patients.
                    </p>
                </div>

                <div className="provider-toolbar">
                    <div className="provider-toolbar-chip">
                        <Clock3 size={16} />
                        <span>Daily review queue</span>
                    </div>
                    <button className="btn-primary">Export case summary</button>
                </div>
            </div>

            <div className="dashboard-grid split-1-2">
                <div className="card glass-panel">
                    <div className="provider-panel-title">
                        <h3>Assigned patients</h3>
                        <span className="text-sm text-muted">{patientRecords.length} active cases</span>
                    </div>

                    <div className="provider-patient-list">
                        {patientRecords.map((patient) => (
                            <button
                                key={patient.id}
                                className={`provider-patient-card ${selectedPatient.id === patient.id ? 'active' : ''}`}
                                onClick={() => setSelectedPatientId(patient.id)}
                            >
                                <div className="provider-patient-card-top">
                                    <div className="provider-avatar">
                                        <UserRound size={16} />
                                    </div>
                                    <span className={`badge ${patient.risk === 'High' ? 'danger' : patient.risk === 'Moderate' ? 'warning' : 'success'}`}>
                                        {patient.risk}
                                    </span>
                                </div>
                                <div className="provider-patient-card-body">
                                    <h4>{patient.name}</h4>
                                    <p>{patient.condition}</p>
                                    <div className="provider-patient-meta">
                                        <span>{patient.id}</span>
                                        <span>{patient.lastUpdate}</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="service-arrow" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="provider-detail-stack">
                    <div className="card glass-panel">
                        <div className="provider-panel-title">
                            <div>
                                <h3>{selectedPatient.name}</h3>
                                <p className="text-sm text-muted">{selectedPatient.condition}</p>
                            </div>
                            <span className={`badge ${riskClass}`}>{selectedPatient.risk} risk</span>
                        </div>

                        <div className="provider-stats-grid">
                            <div className="stat-box">
                                <div className="text-sm text-muted">Healing progress</div>
                                <div className="provider-big-stat">{selectedPatient.progress}%</div>
                            </div>
                            <div className="stat-box">
                                <div className="text-sm text-muted">Latest update</div>
                                <div className="provider-big-stat provider-big-stat-small">{selectedPatient.lastUpdate}</div>
                            </div>
                        </div>

                        <div className="provider-note-card">
                            <div className="flex gap-2 items-center font-semibold">
                                {selectedPatient.risk === 'High' ? <AlertTriangle size={16} className="text-danger" /> : <CheckCircle2 size={16} className="text-success" />}
                                <span>Clinical note</span>
                            </div>
                            <p>{selectedPatient.note}</p>
                            <div className="text-sm text-muted">{selectedPatient.healingTrend}</div>
                        </div>
                    </div>

                    <div className="card glass-panel">
                        <div className="provider-panel-title">
                            <h3>Uploaded progression photos</h3>
                            <button className="btn-secondary provider-mini-btn">
                                <Camera size={14} />
                                <span>Open gallery</span>
                            </button>
                        </div>

                        <div className="provider-photo-grid">
                            {selectedPatient.photos.map((photoDate) => (
                                <div key={photoDate} className="provider-photo-card">
                                    <div className="provider-photo-thumb">
                                        <ImageIcon size={22} />
                                    </div>
                                    <div className="provider-photo-meta">
                                        <span className="font-semibold">{photoDate}</span>
                                        <span className="text-sm text-muted">Patient upload</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderManagementView;
