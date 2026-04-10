import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemStatement from './components/ProblemStatement'
import Features from './components/Features'
import TargetUsers from './components/TargetUsers'
import Footer from './components/Footer'
import Auth from './components/Auth'
import Dashboard from './components/dashboard/DashboardLayout'
import './App.css'

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) setIsAuthOpen(false); // Close auth modal on successful login
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    return <Dashboard session={session} onLogout={() => supabase.auth.signOut()} />
  }

  return (
    <div className="app">
      <Navbar onLoginClick={() => setIsAuthOpen(true)} session={session} onLogout={() => supabase.auth.signOut()} />
      <main>
        <Hero />
        <ProblemStatement />
        <Features />
        <TargetUsers />
      </main>
      <Footer />
      {isAuthOpen && <Auth onClose={() => setIsAuthOpen(false)} />}
    </div>
  )
}

export default App
