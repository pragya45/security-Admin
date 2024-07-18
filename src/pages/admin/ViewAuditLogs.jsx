import React, { useEffect, useState } from 'react';
import { getAuditLogsApi } from '../../api/Api';
import styles from './ViewAuditLogs.module.css'; // Importing the CSS module
import AdminNavbar from '../../components/AdminNavbar'; 

const ViewAuditLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getAuditLogsApi();
                setLogs(response.data);
            } catch (error) {
                console.error('Failed to fetch audit logs:', error);
            }
        };
        fetchLogs();
    }, []);

    return (
        <>
            <AdminNavbar />  {/* Add the AdminNavbar component here */}
            <div className={styles['audit-logs-container']}>
                {/* <h2>Audit Logs</h2> */}
                <table className={styles['audit-logs-table']}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Action</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr key={index}>
                                <td>{new Date(log.timestamp).toLocaleString()}</td>
                                <td>{log.userId}</td>
                                <td>{log.action}</td>
                                <td>{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ViewAuditLogs;
