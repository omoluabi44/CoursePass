import React, {useState}from 'react'
import s from './PastQuestion.module.css'
import { nextQuestion,prevQuestion } from '../../redux/questionSlice'
import { useDispatch, useSelector, } from 'react-redux';

export const PastQuestion = () => {

    const dispatch = useDispatch();
    const { questions, currentQuestionIndex } = useSelector((state) => state.questions);
    const currentQuestion  = questions[currentQuestionIndex];
    const [showExplanation, setShowExplanation] = useState(false);
    const toggleExplanation = () => {
        setShowExplanation(!showExplanation);
    }
    const handleNext = () => {
        dispatch(nextQuestion()); 
    }
    const handlePrev = () => {
        dispatch(prevQuestion());
    }
    if(!currentQuestion ) { 
        return <div>loading question </div>
    }

  return (
    <>
    <div className={s.past_question_container}>
        <header className={s.quiz_header}>
            <div className={s.timer}>00:00</div>
            <div className={s.question_number}>Question {currentQuestionIndex + 1} 0f {questions.length}</div>
        </header>
        <main className={s.question_container}>
            <div className={s.question_section}>
                <div className={s.question}>{currentQuestion.questionText}</div>
                <div className={s.options}>
                   {
                    Object.keys(currentQuestion.options).map((keys)=>
                   <div className={s.option} key={keys}>
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
                <button className={s.submit_btn}>Submit</button>
            </div>
        </main>
    </div>
    </>
  )
}
