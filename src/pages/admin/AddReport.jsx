import React, { useState } from "react";
import { toast } from "react-toastify";
import { createReportApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./AddReport.module.css";

const AddReport = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateReport = async () => {
    if (!title || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const reportData = { title, description };
      await createReportApi(reportData);
      toast.success("Report created successfully");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create report");
    }
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Add New Report</h1>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Report Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            placeholder="Report Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <button onClick={handleCreateReport} className={styles.button}>
          Create Report
        </button>
      </div>
    </div>
  );
};

export default AddReport;
