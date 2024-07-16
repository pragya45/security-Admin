import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteReportApi, getReportsApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./ManageReports.module.css";

const ManageReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReportsApi();
        console.log(response.data);
        setReports(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch reports");
      }
    };
    fetchReports();
  }, []);

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReportApi(reportId);
      setReports(reports.filter((report) => report._id !== reportId));
      toast.success("Report deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete report");
    }
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Manage Reports</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.title}</td>
                  <td>{report.description}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteReport(report._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageReports;
