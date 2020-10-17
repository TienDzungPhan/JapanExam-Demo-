export const addQuestion = async (questionsRef, params) => {
  await questionsRef.add(params);
}

export const updateQuestion = async (questionRef, params) => {
  await questionRef.update(params);
}

export const removeQuestion = async (questionRef) => {
  await questionRef.delete();
}