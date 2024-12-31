import React from 'react'
import Latex from 'react-latex'

const fraction = `When $a \\ne 0$, there are two solutions to \\(ax^2 + bx + c = 0\\) and they are $$\\displaystyle x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`

export const Maths = () => {
  return (
    <>
   <Latex>
    {fraction}
   </Latex>
    </>
    
  )
}
