import React, { useState, forwardRef } from 'react'
import { useUser, useFirestore } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import Slide from '@material-ui/core/Slide'
import Fade from '@material-ui/core/Fade'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import OptionsForm from '../OptionsForm'
import { validateQuestionInputs } from '../../utils/validate'
import { addQuestion } from '../../helper/question'

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  dialogContent: {
    marginBottom: theme.spacing(4)
  },
  textField: {
    marginTop: theme.spacing(3),
    width: "100%"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const SlideTransition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FadeTransition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const CreateQuestionDialog = ({ createQuestionOpen, setCreateQuestionOpen }) => {
  // Firebase Auth Current User
  const currentUser = useUser()
  // Firestore Questions Ref
  const firestore = useFirestore
  const questionsRef = firestore().collection('questions')
  const { Timestamp } = firestore
  // Classes for styles usages
  const classes = useStyles()
  // Display Fullscreen Dialog on Small Devices
  const theme = useTheme()
  const isSmallDevices = useMediaQuery(theme.breakpoints.down('sm'))
  // Set Loading Backdrop
  const [isLoading, setIsLoading] = useState(false)
  // Exam state
  const [exam, setExam] = useState('')
  // Category state
  const [category, setCategory] = useState('')
  // Description state
  const [description, setDescription] = useState('')
  // Title state
  const [title, setTitle] = useState('')
  // Options state
  const [options, setOptions] = useState(['', '', '', ''])
  // Correct Answer state
  const [correctAnswer, setCorrectAnswer] = useState(null)
  // Explanation state
  const [explanation, setExplanation] = useState('')
  // Save Question
  const saveQuestion = async (e) => {
    e.preventDefault()
    if (!validateQuestionInputs({ exam, category, description, title, options, correctAnswer, explanation})) {
      return false
    }
    setIsLoading(true)
    setCreateQuestionOpen(false)
    try {
      await addQuestion(questionsRef, {
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
        exam,
        category,
        description,
        title,
        options: options.map(option => {
          return {
            content: option,
            isCorrect: option === correctAnswer,
            selectedCount: 0
          }
        })
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="CreateQuestion">
      <Backdrop className={classes.backdrop} open={isLoading} onClick={() => setIsLoading(false)}>
        <CircularProgress color="inherit" />
        <div style={{ marginLeft: 16 }}>Đang lưu câu hỏi ...</div>
      </Backdrop>
      <Dialog
        aria-describedby="question-create"
        fullScreen={isSmallDevices}
        open={createQuestionOpen}
        onClose={() => setCreateQuestionOpen(false)}
        TransitionComponent={isSmallDevices ? SlideTransition : FadeTransition}
      >
        <AppBar className={classes.appBar} color="inherit" position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setCreateQuestionOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              TẠO CÂU HỎI MỚI 
            </Typography>
            <IconButton
              onClick={saveQuestion}
              color="inherit"
              aria-label="save"
            >
              <SaveRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.dialogContent}>
          <TextField
            name="exam"
            label="Kỳ thi"
            className={classes.textField}
            fullWidth
            variant="outlined"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          />
          <TextField
            name="category"
            label="Dạng câu hỏi"
            className={classes.textField}
            fullWidth
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            name="description"
            label="Mô tả câu hỏi"
            className={classes.textField}
            multiline
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            name="title"
            label="Nội dung câu hỏi"
            className={classes.textField}
            multiline
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <OptionsForm
            options={options}
            setOptions={setOptions}
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
          />
          <TextField
            name="explanation"
            label="Giải thích"
            className={classes.textField}
            multiline
            fullWidth
            variant="outlined"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateQuestionDialog
