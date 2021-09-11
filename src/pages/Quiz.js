import React from 'react'
import Answer from '../components/Answer'
import MiniPlayer from '../components/MiniPlayer'
import ProgressBar from '../components/ProgressBar'

const Quiz = () => {
  return (
    <>
      <h1>Pick three of your favorite Star Wars Films</h1>
      <h4>Question can have multiple answers</h4>
      <Answer />
      <ProgressBar />
      <MiniPlayer />
    </>
  )
}

export default Quiz
