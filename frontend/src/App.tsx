import React, { useEffect, useState } from "react";
import ScanForm from "./components/ScanForm/ScanForm";
import ScanResults from "./components/ScanResults/ScanResults";
import { getScanResults } from "./services/api";
import "./App.css";

const App = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScanResults = async () => {
      try {
        const results = await getScanResults();
        setScans(results);
      } catch (error) {
        // Handle error
      }
    };

    fetchScanResults();
  }, []);

  const handleScanInitiated = (scanDetails) => {
    setScans([...scans, scanDetails]);
  };

  return (
    <div className="app">
      <h1>OSINT Web Application</h1>
      <ScanForm onScanInitiated={handleScanInitiated} />
      <ScanResults scans={scans} />
    </div>
  );
};

export default App;
