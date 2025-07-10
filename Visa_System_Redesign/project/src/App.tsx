import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import StatusPage from './pages/StatusPage';
import PaymentPage from './pages/PaymentPage';
import DocumentsPage from './pages/DocumentsPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { ApplicationProvider } from './contexts/ApplicationContext';
import ChatBot from './components/ChatBot';
import SystemStatus from './components/SystemStatus';

function App() {
  return (
    <LanguageProvider>
      <ApplicationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <SystemStatus />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/apply" element={<ApplicationPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
              </Routes>
            </main>
            <Footer />
            <ChatBot />
          </div>
        </Router>
      </ApplicationProvider>
    </LanguageProvider>
  );
}

export default App;