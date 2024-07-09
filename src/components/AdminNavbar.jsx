import React, { useState } from "react";
import { FaBars } from "react-icons/fa"; // Icon for mobile menu
import { Link } from "react-router-dom";
import styles from "./AdminNavbar.module.css";

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>CyberSecurity Platform</h1>
      <FaBars className={styles.menuToggle} onClick={toggleMenu} />
      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
        <li>
          <Link to="/admin/create-quiz">Create Quiz</Link>
        </li>
        <li>
          <Link to="/admin/manage-quizzes">Manage Quizzes</Link>
        </li>
        <li>
          <Link to="/admin/manage-articles">Manage Articles</Link>
        </li>
        <li>
          <Link to="/admin/view-articles">View Articles</Link>
        </li>
        <li>
          <Link to="/admin/manage-reports">Manage Reports</Link>
        </li>
        <li>
          <Link to="/admin/add-report">Add Report</Link>
        </li>
        <li>
          <Link to="/admin/view-users">View Users</Link>
        </li>
        <li>
          <Link to="/admin/view-audit-logs">View Audit Logs</Link>
        </li>
        <li>
          <button onClick={handleLogout} className={styles.logout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
