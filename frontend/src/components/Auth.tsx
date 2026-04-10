import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import './Auth.css';

interface AuthProps {
    onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [role, setRole] = useState<'patient' | 'healthcare_provider'>('patient');

    const roleLabel = role === 'healthcare_provider' ? 'Healthcare Provider' : 'Patient';

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    setMessage(error.message);
                } else {
                    const currentMetadata = data.user?.user_metadata || {};
                    if (currentMetadata.role !== role) {
                        const { error: updateError } = await supabase.auth.updateUser({
                            data: {
                                ...currentMetadata,
                                role,
                            }
                        });

                        if (updateError) {
                            setMessage(updateError.message);
                            return;
                        }
                    }
                    onClose(); // Close modal immediately on successful login
                }
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                            phone: phone,
                            age: role === 'patient' ? age : '',
                            gender: role === 'patient' ? gender : '',
                            specialty: role === 'healthcare_provider' ? specialty : '',
                            role,
                        }
                    }
                });
                if (error) {
                    setMessage(error.message);
                } else {
                    setMessage('Account created! Please check your email for the confirmation link.');
                }
            }
        } catch (error: any) {
            setMessage(error.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay animate-fade-in">
            <div className="auth-modal glass-panel">
                <button className="auth-close" onClick={onClose} aria-label="Close modal">×</button>
                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
                    <p>{isLogin ? 'Sign in and choose your workspace type' : 'Sign up to start your journey'}</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="role-switch">
                        <button
                            type="button"
                            className={`role-option ${role === 'patient' ? 'active' : ''}`}
                            onClick={() => setRole('patient')}
                        >
                            <span className="role-title">Patient</span>
                            <span className="role-desc">Personal monitoring and self-care workspace</span>
                        </button>
                        <button
                            type="button"
                            className={`role-option ${role === 'healthcare_provider' ? 'active' : ''}`}
                            onClick={() => setRole('healthcare_provider')}
                        >
                            <span className="role-title">Healthcare Provider</span>
                            <span className="role-desc">Clinical dashboard for managing multiple patients</span>
                        </button>
                    </div>

                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <input
                                    className="auth-input"
                                    type="text"
                                    placeholder="Full Name"
                                    value={fullName}
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                            {role === 'patient' ? (
                                <div className="form-group flex gap-2">
                                    <input
                                        className="auth-input"
                                        type="number"
                                        placeholder="Age"
                                        value={age}
                                        required
                                        onChange={(e) => setAge(e.target.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <select
                                        className="auth-input auth-select"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                        style={{ flex: 2 }}
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="form-group">
                                    <input
                                        className="auth-input"
                                        type="text"
                                        placeholder="Specialty or Department"
                                        value={specialty}
                                        required
                                        onChange={(e) => setSpecialty(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="form-group">
                                <input
                                    className="auth-input"
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    required
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    {isLogin && (
                        <div className="auth-role-note">
                            Continuing as <strong>{roleLabel}</strong>.
                        </div>
                    )}

                    <div className="form-group">
                        <input
                            className="auth-input"
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            required
                            minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="btn-primary auth-submit" disabled={loading}>
                        {loading ? <span>Processing...</span> : <span>{isLogin ? 'Log In' : 'Sign Up'}</span>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button
                        type="button"
                        style={{ fontSize: '0.85rem', color: 'hsl(var(--primary))' }}
                        onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
                    </button>
                </div>

                {message && (
                    <div className={`auth-message ${message.includes('check your email') ? 'success' : 'error'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Auth;
