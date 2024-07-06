import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./Verify2FAPage.module.css";

const Verify2FAPage = () => {
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/verify-2fa",
        {
          userId,
          twoFactorCode,
        }
      );

      if (res.status === 200 && res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success("2FA verification successful! Logged in.");
        navigate("/admin/dashboard");
      } else {
        toast.error("Failed to verify 2FA, please try again.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "2FA verification failed, please try again."
      );
    }
  };

  return (
    <div className={styles.verifyContainer}>
      <div className={styles.verifyBox}>
        <h2 className={styles.title}>Enter 2FA Code</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="twoFactorCode">2FA Code</label>
            <input
              type="text"
              id="twoFactorCode"
              placeholder="Enter the code sent to your email"
              value={twoFactorCode}
              onChange={(e) => setTwoFactorCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.verifyButton}>
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify2FAPage;
