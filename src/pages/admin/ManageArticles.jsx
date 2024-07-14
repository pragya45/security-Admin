import React, { useState } from "react";
import { toast } from "react-toastify";
import { createArticleApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./ManageArticles.module.css";

const ManageArticles = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleCreateArticle = async () => {
    try {
      await createArticleApi({ title, content });
      toast.success("Article created successfully");
      setTitle("");
      setContent("");
    } catch (error) {
      setError("Failed to create article.");
      toast.error("Failed to create article");
    }
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Manage Articles</h1>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <button onClick={handleCreateArticle} className={styles.button}>
          Create Article
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ManageArticles;
