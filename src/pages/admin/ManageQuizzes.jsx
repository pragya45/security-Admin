import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteQuizApi, getQuizzesApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./ManageQuizzes.module.css";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzesApi();
        setQuizzes(response.data);
      } catch (error) {
        toast.error("Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    try {
      await deleteQuizApi(quizId);
      toast.success("Quiz deleted successfully");
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      toast.error("Failed to delete quiz");
    }
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Manage Quizzes</h1>
        {quizzes.map((quiz) => (
          <div key={quiz._id} className={styles.quizItem}>
            <h3>{quiz.title}</h3>
            <div className={styles.actions}>
              <Link
                to={`/admin/edit-quiz/${quiz._id}`}
                className={styles.editButton}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDeleteQuiz(quiz._id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageQuizzes;
