import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUserStore } from './store/userStore';
import Sidebar from './components/layout/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Learn from './pages/Learn';
import Progress from './pages/Progress';
import Recommendations from './pages/Recommendations';
import Community from './pages/Community';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <>{children}</> : null;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout><Home /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/courses" element={
          <ProtectedRoute>
            <AppLayout><Courses /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/learn/:courseId/:moduleType" element={
          <ProtectedRoute>
            <Learn />
          </ProtectedRoute>
        } />
        
        <Route path="/progress" element={
          <ProtectedRoute>
            <AppLayout><Progress /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/recommendations" element={
          <ProtectedRoute>
            <AppLayout><Recommendations /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/community" element={
          <ProtectedRoute>
            <AppLayout><Community /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/achievements" element={
          <ProtectedRoute>
            <AppLayout><Achievements /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout><Profile /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
