// src/pages/Form.js
import React, { useState } from "react";
import EditableForm from "../components/EditableForm";
import UploadReport from "../components/UploadReport";

export default function Form() {
  const [reportData, setReportData] = useState(null);

  return (
    <div>
      <UploadReport onReportData={setReportData} />
      {reportData && <EditableForm initialData={reportData} />}
    </div>
  );
}
