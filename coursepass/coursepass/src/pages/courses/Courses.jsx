import React from 'react'
import s from "./Courses.module.css"

const Courses = () => {
  return (
    <>
    <div className={s.container}> 
      <div className={s.content}>
        <h2> Physics 101: Introduction to the Fundamentals of Physics</h2>
        <p>
        Physics 101: Introduction to the Fundamentals of Physics
Physics 101 serves as the foundational course for understanding the principles governing the natural world. It explores the laws of motion, forces, energy, and matter that define the universe. Students are introduced to classical mechanics, a branch of physics that describes how objects move under the influence of various forces. Key concepts such as Newton's laws of motion, kinematics, and dynamics are covered in detail.

The course also delves into the study of energy, including kinetic energy, potential energy, and the principle of conservation of energy. Students learn how these principles apply to everyday phenomena, from the motion of a car to the trajectory of a projectile. Physics 101 emphasizes problem-solving skills, requiring students to analyze and calculate physical scenarios using mathematical techniques.

Another critical area of focus is the behavior of waves and sound. Students explore wave properties such as frequency, wavelength, and amplitude, along with the concepts of reflection, refraction, and interference. The course also touches upon the fundamentals of thermodynamics, introducing concepts like heat transfer, temperature, and the laws of thermodynamics.

Electricity and magnetism are integral parts of Physics 101. Students study electric forces, fields, circuits, and magnetic effects, learning how these forces interact and contribute to the functioning of modern technology. Simple circuit diagrams and Ohm's law help students grasp the basics of electrical currents and resistance.

An introduction to modern physics is often included, giving students a glimpse of topics such as relativity and quantum mechanics. These concepts highlight the limits of classical mechanics and introduce groundbreaking ideas about the nature of space, time, and subatomic particles.

Laboratory experiments are a key component of Physics 101. Students perform hands-on activities to reinforce theoretical concepts, such as measuring acceleration due to gravity, analyzing pendulum motion, or observing wave behavior in ripple tanks. This practical experience helps students understand the scientific method and develop data analysis skills.

Physics 101 also emphasizes the interconnectedness of scientific disciplines. Concepts from chemistry, mathematics, and biology often intersect with physics, providing a holistic understanding of natural phenomena. For example, the study of thermodynamics overlaps with chemical reactions, while kinematics can describe biological locomotion.

Applications of physics in everyday life and technology are highlighted to inspire students and demonstrate the relevance of the subject. From understanding how a car engine works to exploring the principles behind renewable energy technologies, the course bridges the gap between theory and practical use.

By the end of Physics 101, students gain a comprehensive understanding of the fundamental principles of physics, develop critical thinking skills, and build a strong foundation for more advanced courses in science and engineering.







    </p>
      </div>
      <div id="chatContainer">
        <div className="responConatiner">
        <div className={s.messageUser}>
            <p>Hello, AI!</p>
          </div>


          <div className={s.messageAi}>
            <p>Hi there! How can I assist you today?</p>
          </div>


        </div>

          
          <div id={s.inputContainer}>
            <textarea id={s.userInput} placeholder="Type your message..."></textarea>
            <button id={s.sendButton}>Send</button>
          </div>
        </div>
    </div>
    </>
  )
}

export default Courses