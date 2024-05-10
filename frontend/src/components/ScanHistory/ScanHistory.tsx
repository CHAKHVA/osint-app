import React from "react";
import ScanCard from "../ScanCard/ScanCard";
import "./ScanHistory.css";
import { Scan } from "../../types/Scan";
import * as XLSX from "xlsx";

interface ScanHistoryProps {
  scans: Scan[];
}

const ScanHistory: React.FC<ScanHistoryProps> = ({ scans }) => {
  const onExportResults = () => {
    const worksheet = XLSX.utils.json_to_sheet(scans);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Scan History");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "scan_history.xlsx";
    link.click();
  };

  return (
    <div className="scan-history">
      <div className="scan-history-header">
        <h2>Scan History</h2>
        <button onClick={onExportResults}>Export to Excel</button>
      </div>
      {scans.map((scan) => (
        <ScanCard key={scan.scan_id} scan={scan} />
      ))}
    </div>
  );
};

export default ScanHistory;
