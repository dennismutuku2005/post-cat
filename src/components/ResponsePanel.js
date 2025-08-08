import React from 'react';
import ReactJsonPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

export const ResponsePanel = ({ response, status, time, headers }) => {
  return (
    <div className="response-panel">
      <h2 className="panel-title">Response</h2>
      
      <div className="response-meta">
        {status && (
          <span className={`status-badge status-${Math.floor(status / 100)}xx`}>
            Status: {status}
          </span>
        )}
        {time && (
          <span className="time-badge">
            Time: {time}ms
          </span>
        )}
      </div>

      <div className="headers-section">
        <h3>Headers</h3>
        {headers ? (
          <ReactJsonPretty 
            data={headers}
            theme="monikai"
            style={{ 
              fontSize: '14px',
              backgroundColor: 'transparent',
              marginTop: '8px'
            }}
          />
        ) : (
          <p className="no-data">No headers received</p>
        )}
      </div>

      <div className="body-section">
        <h3>Body</h3>
        {response ? (
          <ReactJsonPretty 
            data={response}
            theme="monikai"
            style={{ 
              fontSize: '14px',
              backgroundColor: 'transparent',
              marginTop: '8px',
              maxHeight: '400px',
              overflow: 'auto'
            }}
          />
        ) : (
          <p className="no-data">No response yet. Send a request to see results.</p>
        )}
      </div>
    </div>
  );
};