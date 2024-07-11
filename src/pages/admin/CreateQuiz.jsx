import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createQuizApi } from '../../api/Api';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from "../../components/AdminNavbar";
import styles from './CreateQuiz.module.css';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleCreateQuiz = async () => {
    try {
      const response = await createQuizApi({ title });
      toast.success('Quiz created successfully');
      navigate(`/admin/quiz/${response.data._id}`);
    } catch (error) {
      toast.error('Failed to create quiz');
    }
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Create Quiz</h1>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleCreateQuiz} className={styles.button}>
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
