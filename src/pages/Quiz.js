import _ from 'lodash'
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router'
import Answer from '../components/Answer'
import MiniPlayer from '../components/MiniPlayer'
import ProgressBar from '../components/ProgressBar'
import useQuestion from '../hooks/useQuestion'

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach(question => {
        question.options.forEach(option => {
          option.checked = false;
        })
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state)
      questions[action.questionID].options[action.optionIndex].checked = action.value;

      return questions;

    default:
      return state;
  }
}

const Quiz = () => {
  const { id } = useParams()
  const { loading, error, questions } = useQuestion(id)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [qna, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    })
  }, [questions])

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    })
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answer options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
          <ProgressBar />
          <MiniPlayer />
        </>
      )}
    </>
  )
}

export default Quiz;
