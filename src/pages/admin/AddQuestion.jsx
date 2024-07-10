import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addQuestionApi } from "../../api/Api";
import AdminNavbar from "../../components/AdminNavbar";
import styles from "./AddQuestion.module.css";

const AddQuestion = () => {
  const { quizId } = useParams();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { optionText: "", isCorrect: false },
  ]);

  const handleAddQuestion = async () => {
    try {
      await addQuestionApi(quizId, { questionText, options });
      toast.success("Question added successfully");
      setQuestionText("");
      setOptions([{ optionText: "", isCorrect: false }]);
    } catch (error) {
      toast.error("Failed to add question");
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { optionText: "", isCorrect: false }]);
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Add Question</h1>
        <textarea
          placeholder="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className={styles.textarea}
        />
        {options.map((option, index) => (
          <div key={index} className={styles.optionContainer}>
            <input
              type="text"
              placeholder="Option Text"
              value={option.optionText}
              onChange={(e) =>
                handleOptionChange(index, "optionText", e.target.value)
              }
              className={styles.input}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) =>
                  handleOptionChange(index, "isCorrect", e.target.checked)
                }
              />
              Is Correct?
            </label>
          </div>
        ))}
        <button onClick={handleAddOption} className={styles.button}>
          Add Option
        </button>
        <button onClick={handleAddQuestion} className={styles.button}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AddQuestion;
