// import React, { useState, useEffect } from 'react';
// import AdminNavbar from '../../components/AdminNavbar';
// import { getArticleByIdApi, updateArticleApi } from '../../api/Api';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const EditArticle = () => {
//   const { id } = useParams();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await getArticleByIdApi(id);
//         setTitle(response.data.title);
//         setContent(response.data.content);
//       } catch (error) {
//         toast.error("Failed to fetch article details");
//       }
//     };

//     fetchArticle();
//   }, [id]);

//   const handleUpdateArticle = async () => {
//     try {
//       await updateArticleApi(id, { title, content });
//       toast.success("Article updated successfully");
//       navigate('/admin/view-articles');
//     } catch (error) {
//       toast.error("Failed to update article");
//     }
//   };

//   return (
//     <div>
//       <AdminNavbar />
//       <h1>Edit Article</h1>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <textarea
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />
//       <button onClick={handleUpdateArticle}>Update Article</button>
//     </div>
//   );
// };

// export default EditArticle;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getArticleByIdApi, updateArticleApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./EditArticle.module.css";

const EditArticle = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleByIdApi(id);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        toast.error("Failed to fetch article details");
      }
    };

    fetchArticle();
  }, [id]);

  const handleUpdateArticle = async () => {
    try {
      await updateArticleApi(id, { title, content });
      toast.success("Article updated successfully");
      navigate("/admin/view-articles");
    } catch (error) {
      toast.error("Failed to update article");
    }
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Edit Article</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          className={styles.textarea}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleUpdateArticle} className={styles.button}>
          Update Article
        </button>
      </div>
    </div>
  );
};

export default EditArticle;
