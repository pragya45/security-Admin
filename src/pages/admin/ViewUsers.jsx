import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { getUsersApi } from "../../api/Api";
import styles from "./ViewUsers.module.css";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersApi();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <h1 className={styles.heading}>View Users</h1>
      <div className={styles.userList}>
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className={styles.userCard}>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
            </div>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
