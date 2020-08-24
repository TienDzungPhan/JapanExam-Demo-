import React from 'react'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import Question from '../components/Question'

const HomePage = () => {
  // Firestore Questions Ref
  const questionsRefs = useFirestore().collection('questions')
  // Questions Data
  const questions = useFirestoreCollectionData(questionsRefs, { idField: 'id' })
  return (
    <div className="HomePage">
      {questions.map(question => 
        <Question key={question.id} question={question} />
      )}
    </div>
  )
}

export default HomePage
