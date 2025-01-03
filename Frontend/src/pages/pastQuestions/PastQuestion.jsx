import React from 'react'
import s from './PastQuestion.module.css'

export const PastQuestion = () => {
  return (
    <>
    <div className={s.past_question_container}>
        <header className={s.quiz_header}>
            <div className={s.timer}>00:00</div>
            <div className={s.question_number}>Question 1 0f 5</div>
        </header>
        <main className={s.question_container}>
            <div className={s.question_section}>
                <div className={s.question}>What is the capital of Nigeria?</div>
                <div className={s.options}>
                    <div className={s.option}>Lagos</div>
                    <div className={s.option}>Abuja</div>
                    <div className={s.option}>Kano</div>
                    <div className={s.option}>Ibadan</div>
                </div>
                <div className={s.explanation}>explanation</div>
            </div>
            <div className={s.button_section}> 
                <button className={s.prv_btn}>Previous</button>
                <button className={s.next_btn}>Next</button>
                <button className={s.submit_btn}>Submit</button>
            </div>
        </main>
    </div>
    </>
  )
}
