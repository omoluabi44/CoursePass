import React, {useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';
import s from './PastQuestion.module.css'
import { decrementTimer, nextQuestion,prevQuestion, setTimer,stopTimer, storeAnswer } from '../../redux/questionSlice'
import { useDispatch, useSelector, } from 'react-redux';

export const PastQuestion = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, currentQuestionIndex, timer,selectedAnswers  } = useSelector((state) => state.questions);
    const currentQuestion  = questions[currentQuestionIndex];
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)
    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    }
    useEffect(() => {
        dispatch(setTimer(7200));
    }, [dispatch]);

    useEffect(()=>
    {
        if (timer === 0) return;
        const interval = setInterval(()=>{
            dispatch(decrementTimer());
        }, 1000);
        return () => clearInterval(interval);
    },[timer, dispatch])

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600); 
        const minutes = Math.floor((time % 3600) / 60); 
        const seconds = time % 60;
    
     
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };
    const handleNext = () => {
        if (selectedOption) {
            dispatch(storeAnswer({ questionIndex: currentQuestionIndex, answer: selectedOption }));
        }
        dispatch(nextQuestion()); 
    }
    const handlePrev = () => {
        if (selectedOption) {
            dispatch(storeAnswer({ questionIndex: currentQuestionIndex, answer: selectedOption }));
        }
        dispatch(prevQuestion());
    }
    if(!currentQuestion ) { 
        return <div>loading question </div>
    }
    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };
    const handleSubmit = () => {
        dispatch(stopTimer())
        let score = 0;
        questions.forEach((question, index) =>{
            if(selectedAnswers[index]=== question.correctAnswer){
                score += 1;
            }
        })
        navigate(`/score?score=${score}&total=${questions.length}`);

    }

  return (
    <>
    <div className={s.past_question_container}>
        <header className={s.quiz_header}>
            <div className={s.timer}>{formatTime(timer)}</div>
            <div className={s.question_number}>Question {currentQuestionIndex + 1} 0f {questions.length}</div>
        </header>
        <main className={s.question_container}>
            <div className={s.question_section}>
                <div className={s.question}>{currentQuestion.questionText}</div>
                <div className={s.options}>
                   {
                    Object.keys(currentQuestion.options).map((keys)=>
                   <div 
                    className={`${s.option} ${selectedOption === keys ? s.selected : ''}`}
                     key={keys}
                     onClick={()=> handleSelectOption(keys)}
                   >
                    {keys}:{currentQuestion.options[keys]}
                   
                   </div>
                    )
                   }
                </div>
                {
                showExplanation &&(
                <div className={s.explanation}>{currentQuestion.explanation}</div>
                )}
                <button
                    className={s.explanation_btn}
                    onClick={toggleExplanation}
                >

                    {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </button>
            </div>
            <div className={s.button_section}> 
                <button 
                    className={s.prv_btn}
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0} >
                        Previous
                </button>
                <button 
                    className={s.next_btn}
                    onClick={handleNext} 
                    disabled={currentQuestionIndex === questions.length - 1}>
                        Next
                </button>
                <button onClick={handleSubmit}
                className={s.submit_btn}
                >
                    Submit
                </button>
            </div>
        </main>
    </div>
    </>
  )
}
