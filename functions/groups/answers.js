const functions = require('firebase-functions')
const admin = require('firebase-admin') // Firebase admin instace to interact with firestore

/**
 * Increment answers count of the related question when a new answer is submitted
 */
exports.incrementCount = functions.firestore
  .document('answers/{answerId}')
  .onCreate(async (snap, context) => {
    const submittedAnswer = snap.data()
    const questionRef = admin.firestore().collection('questions').doc(submittedAnswer.questionId)
    const questionDoc = await questionRef.get()
    if (questionDoc.exists) { // Only execute the increment if the question has not been deleted
      const questionData = questionDoc.data()
      const newAnswersCount = questionData.answersCount + 1 // Increment answersCount
      const newOptions = questionData.options.map(option => {
        if (option.content === submittedAnswer.selectedOption) {
          option.selectedCount++ // Increment selectedCount
        }
        return option
      })
      questionRef.update({
        answersCount: newAnswersCount,
        options: newOptions
      })
    }
  })