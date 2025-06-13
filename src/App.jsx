import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SessionsPage from "./pages/SessionsPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import SessionDetailPage from "./pages/SessionDetailPage.jsx";
import MySessionPage from "./pages/MySessionPage.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/my-sessions" element={<MySessionPage />} />

            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/sessions/:id" element={<SessionDetailPage />} />
            <Route path="/locations" element={<LocationPage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
