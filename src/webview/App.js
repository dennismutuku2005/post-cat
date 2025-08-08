import React, { useState } from 'react';
import { RequestPanel } from './components/RequestPanel';
import { ResponsePanel } from './components/ResponsePanel';
import { HistoryPanel } from './components/HistoryPanel';
import { Header } from './components/Header';
import { AuthPanel } from './components/AuthPanel';
import './styles.css';

export const App = () => {
  const [activeTab, setActiveTab] = useState('request');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-container ${darkMode ? 'dark' : 'light'}`}>
      <Header 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
      />
      
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'request' ? 'active' : ''}`}
          onClick={() => setActiveTab('request')}
        >
          Request
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      
      {activeTab === 'request' ? (
        <div className="request-view">
          <div className="main-panel">
            <RequestPanel />
            <ResponsePanel />
          </div>
          <div className="side-panel">
            <AuthPanel />
          </div>
        </div>
      ) : (
        <HistoryPanel />
      )}
    </div>
  );
};