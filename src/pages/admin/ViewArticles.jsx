import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteArticleApi, getArticlesApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./ViewArticles.module.css";

const ViewArticles = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await getArticlesApi();
        setArticles(data);
      } catch (error) {
        toast.error("Failed to fetch articles.");
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteArticleApi(id);
      toast.success("Article deleted successfully!");
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      toast.error("Failed to delete article");
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-article/${id}`);
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>View Articles</h1>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className={styles.article}>
              <h3 className={styles.title}>{article.title}</h3>
              <p className={styles.content}>{article.content}</p>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(article._id)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(article._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No articles available</p>
        )}
      </div>
    </div>
  );
};

export default ViewArticles;
