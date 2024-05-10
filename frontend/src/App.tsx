import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import ScanForm from "./components/ScanForm/ScanForm";
import ScanHistory from "./components/ScanHistory/ScanHistory";
import { Scan } from "./types/Scan";
import Button from "./components/ui/Button";
import axios from "axios";

const App: React.FC = () => {
  const [scans, setScans] = useState<Scan[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchScanResults = async () => {
      try {
        const response = await axios.get("http://localhost:8000/results");
        setScans(response.data.results);
      } catch (error) {
        console.error("Error fetching scan results:", error);
      }
    };

    fetchScanResults();
  }, []);

  const handleScanSubmit = (newScan: Scan) => {
    setScans((prevScans) => [...prevScans, newScan]);
  };

  return (
    <div className="container">
      <Header />
      <main className="main">
        <div className="scan-button-container">
          <Button text="Open Scan Modal" onClick={() => setOpenModal(true)} />
        </div>
        <ScanHistory scans={scans} />
      </main>
      <ScanForm
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        onScanSubmit={handleScanSubmit}
      />
    </div>
  );
};

export default App;
