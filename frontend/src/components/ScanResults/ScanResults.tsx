import React from "react";
import "./ScanResults.css";

const ScanResults = ({ scans }) => {
  return (
    <div className="scan-results">
      <h2>Scan Results</h2>
      {scans.map((scan, index) => (
        <div key={index} className="scan-card">
          <h3>{scan.domain}</h3>
          <p>Start Time: {scan.startTime}</p>
          <p>End Time: {scan.endTime}</p>
          {scan.results.length > 0 ? (
            <ul>
              {scan.results.map((result, i) => (
                <li key={i}>{result}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScanResults;
