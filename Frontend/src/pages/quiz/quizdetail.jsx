import React, {useEffect, useState, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import ResultPage from './marksheet';
import NotFound from './notfound';


export default function Quiz() {
    const {course, uni, year} = useParams();
    const navigate = useNavigate();

    let user = null;
    try {
        const stored = localStorage.getItem('user');
        if (stored) user = JSON.parse(stored);
    } catch (e) {
        console.error('User parse error', e);
    }
   
    const themeDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [questionId, setQuestionId] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);
    const [selected, setSelected] = useState('');
    const [result, setResult] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setIsError(false);
        try {
            const res = await axios.get(
                `https://api.coursepass.me/api/v1/course/${course}/quizes/${year}/${uni}`
            );
            setData(res.data);
        } catch (err) {
            console.error('Quiz fetch failed', err);
            setIsError(true);
         
            

         
  

        } finally {
            setLoading(false);
        }
    }, [course, uni, year, navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (data.length) {
            const cloned = data.map((q) => ({...q}));
            setQuestions(cloned);
            setAllAnswers(
                shuffle([...cloned[0].incorrect_answers, cloned[0].correct_answer])
            );
            setSelected(cloned[0].userAnswer || '');
        }
    }, [data]);

    const handleNext = () => {
        if (questionId < questions.length - 1) {
            const next = questionId + 1;
            setQuestionId(next);
            setAllAnswers(
                shuffle([
                    ...questions[next].incorrect_answers,
                    questions[next].correct_answer,
                ])
            );
            setSelected(questions[next].userAnswer || '');
        }
    };

    const handlePrev = () => {
        if (questionId > 0) {
            const prev = questionId - 1;
            setQuestionId(prev);
            setAllAnswers(
                shuffle([
                    ...questions[prev].incorrect_answers,
                    questions[prev].correct_answer,
                ])
            );
            setSelected(questions[prev].userAnswer || '');
        }
    };

    const handleSelect = (answer) => {
        const updated = [...questions];
        updated[questionId].userAnswer = answer;
        setQuestions(updated);
        setSelected(answer);
    };

    const handleSubmit = () => {
        setResult(true);
    };

    if (loading) {
        return (
            <p
                style={{
                    textAlign: 'center',
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                    color: themeDark ? '#fff' : '#333',
                    padding: '2rem',
                }}
            >
                Loading quiz…
            </p>
        );
    }

 if (isError) {
  return <NotFound />;
}

    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: themeDark ? '#000' : '#fafafa',
                padding: '5vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
       
            {result ? (
                <ResultPage questions={questions} userID={user?.id} courseID={course} />
            ) : (
                <div
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        backgroundColor: themeDark ? '#1a252f' : '#fff',
                        borderRadius: '1rem',
                        padding: 'clamp(1rem, 4vw, 2rem)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                    }}
                >
                    <p
                        style={{
                            textAlign: 'center',
                            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                            color: themeDark ? '#fff' : '#333',
                            lineHeight: 1.5,
                            margin: 0,
                        }}
                    >
                        {questions[questionId]?.questionText || 'No question'}
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '1rem',
                            justifyContent: 'center',
                        }}
                    >
                        {allAnswers.map((ans, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(ans)}
                                style={{
                                    flex: '1 1 45%',
                                    minWidth: '120px',
                                    padding: '0.75rem',
                                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                    borderRadius: '0.5rem',
                                    border:
                                        selected === ans ? '2px solid #007BFF' : '1px solid #ccc',
                                    backgroundColor:
                                        themeDark && selected === ans
                                            ? '#003087'
                                            : themeDark
                                                ? '#1a252f'
                                                : selected === ans
                                                    ? '#e6f0fa'
                                                    : '#f9f9f9',
                                    color: themeDark ? '#fff' : '#333',
                                    cursor: 'pointer',
                                }}
                            >
                                {ans}
                            </button>
                        ))}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            gap: '1rem',
                        }}
                    >
                        <button
                            onClick={handlePrev}
                            disabled={questionId === 0}
                            style={{
                                flex: '1 1 30%',
                                height: '45px',
                                backgroundColor: questionId === 0 ? '#ccc' : '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                cursor: questionId === 0 ? 'not-allowed' : 'pointer',
                            }}
                        >
                            Previous
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={questionId === questions.length - 1}
                            style={{
                                flex: '1 1 30%',
                                height: '45px',
                                backgroundColor:
                                    questionId === questions.length - 1 ? '#ccc' : '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                cursor:
                                    questionId === questions.length - 1 ? 'not-allowed' : 'pointer',
                            }}
                        >
                            Next
                        </button>

                        <button
                            onClick={handleSubmit}
                            style={{
                                flex: '1 1 30%',
                                height: '45px',
                                backgroundColor: '#007BFF',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                cursor: 'pointer',
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Shuffle helper
function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
}
