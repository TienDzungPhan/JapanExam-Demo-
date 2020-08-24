import React, { createContext, useState } from 'react'

export const DialogContext = createContext()

const DialogContextProvider = (props) => {
  // Auth Dialog Context
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  // Auth Tab Index
  const [authTabIndex, setAuthTabIndex] = useState(0)
  // Question Dialog Context
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false)
  return (
    <DialogContext.Provider
      value={{
        authDialogOpen,
        setAuthDialogOpen,
        authTabIndex,
        setAuthTabIndex,
        questionDialogOpen,
        setQuestionDialogOpen
      }}
    >
      {props.children}
    </DialogContext.Provider>
  )
}

export default DialogContextProvider
