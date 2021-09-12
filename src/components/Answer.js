import React from 'react'
import classes from '../styles/Answers.module.css'
import Checkbox from './Checkbox'

const Answer = ({ options = [], handleChange }) => {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Checkbox className={classes.answer} text={option.title} value={index} checked={option.checked} key={index} onChange={(e) => handleChange(e, index)} />
      ))}
    </div>
  )
}

export default Answer
