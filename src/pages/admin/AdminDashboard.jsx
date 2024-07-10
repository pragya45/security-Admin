import React, { useEffect, useState } from "react";
import { getUsersCountApi } from "../../api/Api"; // Assuming you have this API to fetch user count
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await getUsersCountApi(); // Call API to get user count
        setUserCount(response.data.count); // Assuming response contains user count
      } catch (error) {
        console.error("Failed to fetch user count", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
        <p>
          This platform is dedicated to enhancing your knowledge and awareness
          about cybersecurity. Cybersecurity is the practice of protecting
          systems, networks, and programs from digital attacks. These attacks
          are usually aimed at accessing, changing, or destroying sensitive
          information; extorting money from users; or interrupting normal
          business processes.
        </p>
        <p>
          As an administrator, you can manage quizzes, articles, and reports to
          ensure that users stay informed and aware of the latest in
          cybersecurity. Our platform currently has <strong>{userCount}</strong>{" "}
          registered users.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
