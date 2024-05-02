import React, { useState } from "react";
import { initiatePostRequest } from "../../services/api";
import "./ScanForm.css";

const ScanForm = ({ onScanInitiated }) => {
  const [domain, setDomain] = useState("");
  const [tool, setTool] = useState("theHarvester");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await initiatePostRequest("/scan", { domain, tool });
      onScanInitiated(response.data);
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form className="scan-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <select value={tool} onChange={(e) => setTool(e.target.value)}>
        <option value="theHarvester">theHarvester</option>
        <option value="Amass">Amass</option>
      </select>
      <button type="submit">Scan</button>
    </form>
  );
};

export default ScanForm;
