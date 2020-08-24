export function validateQuestionInputs ({
  exam, category, description, title, options, correctAnswer, explanation
}) {
  if (
    description.length === 0 ||
    title.length === 0 ||
    options.some(option => option.length === 0) ||
    correctAnswer.length === 0 ||
    explanation.length === 0
  ) {
    return false
  }
  return true
}