import React, { useState } from 'react';
import { useRequestStore } from '../stores/requestStore';

export const RequestPanel = () => {
  const { 
    url, 
    method, 
    headers, 
    body, 
    setUrl, 
    setMethod, 
    setHeaders, 
    setBody, 
    sendRequest 
  } = useRequestStore();
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    setIsLoading(true);
    try {
      await sendRequest();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel request-panel">
      <h2>Request</h2>
      <div className="request-controls">
        <select 
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="method-select"
        >
          {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="url-input"
        />
        
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="send-button"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <div className="request-details">
        <div className="headers-section">
          <h3>Headers</h3>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="code-editor"
            spellCheck="false"
          />
        </div>
        
        <div className="body-section">
          <h3>Body</h3>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="code-editor"
            spellCheck="false"
            disabled={method === 'GET' || method === 'DELETE'}
          />
        </div>
      </div>
    </div>
  );
};