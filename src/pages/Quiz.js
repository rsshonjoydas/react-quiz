import { getDatabase, ref, set } from '@firebase/database'
import _ from 'lodash'
import React, { useEffect, useReducer, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Answer from '../components/Answer'
import MiniPlayer from '../components/MiniPlayer'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../contexts/AuthContext'
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
  const { currentUser } = useAuth();
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const { videoTitle } = state;

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

  // TODO: handle users clicks the next button to get the next questions
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1)
    }
  }

  // TODO: handle users clicks the previous button to get the previous questions
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1)
    }
  }

  // TODO: calculate percentage of progress
  const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // TODO: submit quiz
  async function submit() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `result/${uid}`)

    await set(resultRef, {
      [id]: qna
    })

    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      }
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
          <Answer
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submit}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  )
}

export default Quiz;
