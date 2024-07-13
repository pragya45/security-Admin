import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AdminNavbar from "../../components/AdminNavbar";
import {
  addQuestionApi,
  getQuizByIdApi,
  updateQuestionApi,
  updateQuizApi,
} from "../../api/Api";
import styles from "./EditQuiz.module.css";

const EditQuiz = () => {
  const { quizId } = useParams();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    questionText: "",
    options: [{ text: "", isCorrect: false }],
  });

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await getQuizByIdApi(quizId);
        setTitle(response.data.title);
        setQuestions(response.data.questions);
      } catch (error) {
        toast.error("Failed to fetch quiz");
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleUpdateQuizTitle = async () => {
    try {
      await updateQuizApi(quizId, { title });
      toast.success("Quiz title updated successfully");
    } catch (error) {
      toast.error("Failed to update quiz title");
    }
  };

  const handleUpdateQuestion = async (questionId, questionText, options) => {
    try {
      await updateQuestionApi(quizId, questionId, { questionText, options });
      toast.success("Question updated successfully");
    } catch (error) {
      toast.error("Failed to update question");
    }
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push({ text: "", isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const handleAddNewQuestion = async () => {
    try {
      await addQuestionApi(quizId, newQuestion);
      toast.success("New question added successfully");
      setNewQuestion({
        questionText: "",
        options: [{ text: "", isCorrect: false }],
      });
    } catch (error) {
      toast.error("Failed to add new question");
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <div className={styles.content}>
        <h1 className={styles.heading}>Edit Quiz</h1>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleUpdateQuizTitle} className={styles.button}>Update Quiz Title</button>

        <h2 className={styles.subheading}>Edit Questions</h2>
        {questions.map((question, index) => (
          <div key={question._id} className={styles.questionContainer}>
            <textarea
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              className={styles.textarea}
            />
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className={styles.optionContainer}>
                <input
                  type="text"
                  placeholder="Option Text"
                  value={option.text}
                  onChange={(e) => {
                    const updatedOptions = [...question.options];
                    updatedOptions[optIndex].text = e.target.value;
                    handleQuestionChange(index, "options", updatedOptions);
                  }}
                  className={styles.input}
                />
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) => {
                      const updatedOptions = [...question.options];
                      updatedOptions[optIndex].isCorrect = e.target.checked;
                      handleQuestionChange(index, "options", updatedOptions);
                    }}
                  />
                  Is Correct?
                </label>
              </div>
            ))}
            <button onClick={() => handleAddOption(index)} className={styles.button}>Add Option</button>
            <button
              onClick={() =>
                handleUpdateQuestion(
                  question._id,
                  question.questionText,
                  question.options
                )
              }
              className={styles.button}
            >
              Update Question
            </button>
          </div>
        ))}

        <h2 className={styles.subheading}>Add New Question</h2>
        <textarea
          placeholder="New Question Text"
          value={newQuestion.questionText}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, questionText: e.target.value })
          }
          className={styles.textarea}
        />
        {newQuestion.options.map((option, index) => (
          <div key={index} className={styles.optionContainer}>
            <input
              type="text"
              placeholder="Option Text"
              value={option.text}
              onChange={(e) => {
                const updatedOptions = [...newQuestion.options];
                updatedOptions[index].text = e.target.value;
                setNewQuestion({ ...newQuestion, options: updatedOptions });
              }}
              className={styles.input}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={option.isCorrect}
                onChange={(e) => {
                  const updatedOptions = [...newQuestion.options];
                  updatedOptions[index].isCorrect = e.target.checked;
                  setNewQuestion({ ...newQuestion, options: updatedOptions });
                }}
              />
              Is Correct?
            </label>
          </div>
        ))}
        <button
          onClick={() =>
            setNewQuestion({
              ...newQuestion,
              options: [...newQuestion.options, { text: "", isCorrect: false }],
            })
          }
          className={styles.button}
        >
          Add Option
        </button>
        <button onClick={handleAddNewQuestion} className={styles.button}>Add Question</button>
      </div>
    </div>
  );
};

export default EditQuiz;
