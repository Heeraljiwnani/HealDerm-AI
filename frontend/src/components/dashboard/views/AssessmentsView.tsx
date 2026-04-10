import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, ShieldAlert, Upload, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    assessSkinImage,
    assessWoundImage,
    type SkinAssessmentResult,
    type WoundAssessmentResult,
} from '../../../services/woundApi';

type AssessmentResult =
    | { type: 'wound'; data: WoundAssessmentResult }
    | { type: 'skin'; data: SkinAssessmentResult };

const AssessmentsView: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState<'wound' | 'skin'>('wound');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<AssessmentResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setResult(null);
            setError(null);
        }
    };

    const handleUploadClick = () => {
        const fileInput = document.getElementById('file-upload');
        if (fileInput) {
            fileInput.click();
        }
    };

    const clearSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
    };

    const handleScan = async () => {
        if (!file) return;

        setIsScanning(true);
        setError(null);

        try {
            if (activeTab === 'wound') {
                const assessment = await assessWoundImage(file);
                setResult({ type: 'wound', data: assessment });
            } else {
                const assessment = await assessSkinImage(file);
                setResult({ type: 'skin', data: assessment });
            }
        } catch (scanError) {
            setError(
                scanError instanceof Error
                    ? scanError.message
                    : t(activeTab === 'wound'
                        ? 'dashboard.assessments.scanFailed'
                        : 'dashboard.assessments.skinScanFailed')
            );
        } finally {
            setIsScanning(false);
        }
    };

    const woundResult = result?.type === 'wound' ? result.data : null;
    const skinResult = result?.type === 'skin' ? result.data : null;
    const progressValue = woundResult ? Math.max(0, 100 - woundResult.severity_score) : 0;
    const riskBadgeClass =
        woundResult?.risk_level === 'HIGH'
            ? 'danger'
            : woundResult?.risk_level === 'MEDIUM'
                ? 'warning'
                : 'success';
    const skinConfidenceWidth = skinResult ? `${skinResult.confidence_percent}%` : '0%';

    return (
        <div className="view-container animate-fade-in">
            <div className="view-header mb-6">
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'wound' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('wound'); setResult(null); setError(null); }}
                    >
                        {t('dashboard.assessments.tabWound')}
                    </button>
                    <button
                        className={`tab ${activeTab === 'skin' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('skin'); setResult(null); setError(null); }}
                    >
                        {t('dashboard.assessments.tabSkin')}
                    </button>
                </div>
            </div>

            <div className="dashboard-grid split-2-1">
                {/* Upload Section */}
                <div className="card glass-panel h-full">
                    <h2 className="mb-2">{t('dashboard.assessments.newAssessment')}</h2>
                    <p className="text-muted mb-6">
                        {activeTab === 'wound'
                            ? t('dashboard.assessments.uploadWound')
                            : t('dashboard.assessments.uploadSkin')
                        }
                    </p>

                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {!file ? (
                        <div
                            className="upload-area border-2 border-dashed border-main-20 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-main-5 transition-colors"
                            onClick={handleUploadClick}
                        >
                            <div className="w-16 h-16 rounded-full bg-primary-10 flex items-center justify-center mb-4 text-primary">
                                <Upload size={32} />
                            </div>
                            <h3 className="mb-2">{t('dashboard.assessments.clickUpload')}</h3>
                            <p className="text-sm text-muted">{t('dashboard.assessments.dragDrop')}</p>
                        </div>
                    ) : (
                        <div className="preview-area border rounded-xl overflow-hidden relative" style={{ height: '300px' }}>
                            <img src={previewUrl!} alt="Preview" className="w-full h-full object-cover" />
                            <button
                                className="absolute top-2 right-2 w-8 h-8 bg-surface-color rounded-full flex items-center justify-center text-danger hover:bg-danger hover:text-white transition-colors"
                                onClick={clearSelection}
                            >
                                <X size={16} />
                            </button>
                            {!result && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                                    <button
                                        className="btn-primary"
                                        onClick={handleScan}
                                        disabled={isScanning}
                                    >
                                        {isScanning ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> {t('dashboard.assessments.scanning')}</span> : t('dashboard.assessments.analyzeBtn')}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'skin' && !skinResult && (
                        <div className="status-note mt-4">
                            <AlertCircle size={16} className="shrink-0" />
                            <span>{t('dashboard.assessments.skinConnected')}</span>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="card glass-panel h-full flex flex-col">
                    <h2 className="mb-4">{t('dashboard.assessments.recentResults')}</h2>

                    {!result ? (
                        <div className="flex-1 border-2 border-dashed border-main-10 rounded-xl flex items-center justify-center text-muted">
                            <div className="text-center">
                                {error ? <AlertCircle size={32} className="mx-auto mb-2 opacity-70" /> : <Clock size={32} className="mx-auto mb-2 opacity-50" />}
                                <p>{error ?? t('dashboard.assessments.awaitingScan')}</p>
                            </div>
                        </div>
                    ) : woundResult ? (
                        <div className="flex-1 flex flex-col gap-4 animate-fade-in">
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.tissueType')}</span>
                                <span className="font-semibold text-capitalize">{woundResult.tissue_type}</span>
                            </div>
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.sizeCategory')}</span>
                                <span className="font-semibold text-capitalize">{woundResult.size_category}</span>
                            </div>
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.woundArea')}</span>
                                <span className="font-semibold">{woundResult.wound_area.toFixed(2)} px²</span>
                            </div>
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.rednessIndex')}</span>
                                <span className="font-semibold">{woundResult.redness_index.toFixed(3)}</span>
                            </div>
                            <div className="detail-row border-t border-main-10 pt-3 mt-1">
                                <span className="text-muted">{t('dashboard.assessments.riskLevel')}</span>
                                <span className={`badge ${riskBadgeClass} flex items-center gap-1`}>
                                    <ShieldAlert size={14} />
                                    {woundResult.risk_level}
                                </span>
                            </div>

                            <div className="mt-auto pt-4 border-t border-main-10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold">{t('dashboard.assessments.severityScore')}</span>
                                    <span className="text-primary font-bold text-xl">{woundResult.severity_score}/100</span>
                                </div>
                                <div className="w-full bg-main-10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-success h-full" style={{ width: `${progressValue}%` }}></div>
                                </div>
                                <p className="text-sm text-muted mt-2">
                                    {t('dashboard.assessments.healingSignal', { value: progressValue.toFixed(0) })}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col gap-4 animate-fade-in">
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.skinPrediction')}</span>
                                <span className="font-semibold">{skinResult?.prediction}</span>
                            </div>
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.skinConfidence')}</span>
                                <span className="font-semibold">{skinResult?.confidence_percent.toFixed(2)}%</span>
                            </div>
                            <div className="detail-row">
                                <span className="text-muted">{t('dashboard.assessments.skinClasses')}</span>
                                <span className="font-semibold">{skinResult?.classes.join(', ')}</span>
                            </div>
                            <div className="mt-auto pt-4 border-t border-main-10">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="font-semibold">{t('dashboard.assessments.skinConfidence')}</span>
                                    <span className="text-primary font-bold text-xl">{skinResult?.confidence_percent.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-main-10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-success h-full" style={{ width: skinConfidenceWidth }}></div>
                                </div>
                                <p className="text-sm text-muted mt-2">
                                    {t('dashboard.assessments.skinResultNote')}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssessmentsView;
