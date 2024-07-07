import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddQuestion from './pages/admin/AddQuestion';
import AddReport from './pages/admin/AddReport';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateQuiz from './pages/admin/CreateQuiz';
import EditArticle from './pages/admin/EditArticle';
import EditQuiz from './pages/admin/EditQuiz';
import ManageArticles from './pages/admin/ManageArticles';
import ManageQuizzes from './pages/admin/ManageQuizzes';
import ManageReports from './pages/admin/ManageReports';
import ViewArticles from './pages/admin/ViewArticles';
import ViewAuditLogs from './pages/admin/ViewAuditLogs';
import ViewUsers from './pages/admin/ViewUsers';
import LoginPage from './pages/login/LoginPage';
import Verify2FAPage from './pages/login/Verify2FAPage';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser && loggedInUser !== "undefined") {
      try {
        const foundUser = JSON.parse(loggedInUser);
        if (foundUser && foundUser.role) {
          setUser(foundUser);
        } else {
          localStorage.removeItem('user'); // Remove corrupted data
        }
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem('user'); // Remove corrupted data
      }
    }
  }, []); // Empty dependency array ensures it only runs once



  const isAdmin = user && user.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ?
              (isAdmin ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/" replace />) :
              <LoginPage setUser={setUser} />
          }
        />

        <Route
          path="/verify-2fa"
          element={
            isAuthenticated || localStorage.getItem("userId") ? (
              <Verify2FAPage setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {isAdmin && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/create-quiz" element={<CreateQuiz />} />
            <Route path="/admin/quiz/:quizId" element={<AddQuestion />} />
            <Route path="/admin/manage-articles" element={<ManageArticles />} />
            <Route path="/admin/view-articles" element={<ViewArticles />} />
            <Route path="/admin/edit-article/:id" element={<EditArticle />} />
            <Route path="/admin/edit-quiz/:quizId" element={<EditQuiz />} />
            <Route path="/admin/manage-quizzes" element={<ManageQuizzes />} />
            <Route path="/admin/manage-reports" element={<ManageReports />} />
            <Route path="/admin/add-report" element={<AddReport />} />
            <Route path="/admin/view-users" element={<ViewUsers />} />
            <Route path="/admin/view-audit-logs" element={<ViewAuditLogs />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
