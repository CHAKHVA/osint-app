import React from "react";
import "./ScanCard.css";
import { Scan } from "../../types/Scan";

interface ScanCardProps {
  scan: Scan;
}

const ScanCard: React.FC<ScanCardProps> = ({ scan }) => {
  return (
    <div className="scan-card">
      <h3>Scan Results</h3>
      <p>Domain: {scan.domain}</p>
      <p>Tool: {scan.tool}</p>
      <p>Start Time: {scan.start_time}</p>
      <p>End Time: {scan.end_time}</p>
      <pre>{JSON.stringify(scan.result, null, 2)}</pre>
    </div>
  );
};

export default ScanCard;
