import React, { useState } from "react";
import "./ScanForm.css";
import Button from "../ui/Button";
import axios from "axios";
import { Scan } from "../../types/Scan";

interface ScanFormProps {
  openModal: boolean;
  onClose: () => void;
  onScanSubmit: (scan: Scan) => void;
}

enum Tools {
  theHarvester = "theHarvester",
  Amass = "Amass",
}

const ScanForm: React.FC<ScanFormProps> = ({
  openModal,
  onClose,
  onScanSubmit,
}) => {
  const [domain, setDomain] = useState<string>("");
  const [tool, setTool] = useState<Tools>(Tools.theHarvester);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/scan", {
        domain,
        tool,
      });
      onScanSubmit(response.data);
      setDomain("");
      setTool(Tools.theHarvester);
      onClose();
    } catch (error) {
      console.error("Error submitting scan:", error);
    }
  };

  return (
    <>
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <form className="scan-form" onSubmit={handleSubmit}>
              <h2>Scan Domain</h2>
              <input
                type="text"
                id="domain"
                name="domain"
                placeholder="Enter domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
              <select
                value={tool}
                onChange={(e) => setTool(e.target.value as Tools)}
              >
                <option value={Tools.theHarvester}>theHarvester</option>
                <option value={Tools.Amass}>Amass</option>
              </select>
              <div className="modal-buttons">
                <Button text="Scan" buttonType="submit" />
                <Button text="Cancel" onClick={onClose} />
              </div>
            </form>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ScanForm;
