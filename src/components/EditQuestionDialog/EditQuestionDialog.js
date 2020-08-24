import React, { useState, forwardRef } from 'react'
import { useFirestore } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
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

const EditQuestionDialog = ({ editQuestionOpen, setEditQuestionOpen, question }) => {
  // Firestore Questions Ref
  const firestore = useFirestore
  const questionRef = firestore().collection('questions').doc(question.id)
  const { Timestamp } = firestore
  // Classes for styles usages
  const classes = useStyles()
  // Display Fullscreen Dialog on Small Devices
  const theme = useTheme()
  const isSmallDevices = useMediaQuery(theme.breakpoints.down('sm'))
  // Set Loading Backdrop
  const [isLoading, setIsLoading] = useState(false)
  // Exam state
  const [exam, setExam] = useState(question.exam)
  // Category state
  const [category, setCategory] = useState(question.category)
  // Description state
  const [description, setDescription] = useState(question.description)
  // Title state
  const [title, setTitle] = useState(question.title)
  // Options state
  const [options, setOptions] = useState(question.options.map(option => option.content))
  // Correct Answer state
  const [correctAnswer, setCorrectAnswer] = useState(question.options.find(option => option.isCorrect).content)
  // Explanation state
  const [explanation, setExplanation] = useState(question.explanation)
  // Save Question
  const saveQuestion = async (e) => {
    e.preventDefault()
    if (!validateQuestionInputs({ exam, category, description, title, options, correctAnswer, explanation})) {
      return false
    }
    setIsLoading(true)
    setEditQuestionOpen(false)
    try {
      await questionRef.update({
        updatedAt: Timestamp.fromDate(new Date()),
        exam,
        category,
        description,
        title,
        options: options.map((option, index) => {
          return {
            ...question.options[index],
            content: option,
            isCorrect: option === correctAnswer
          }
        }),
        explanation
      })
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="EditQuestion">
      <Backdrop className={classes.backdrop} open={isLoading} onClick={() => setIsLoading(false)}>
        <CircularProgress color="inherit" />
        <div style={{ marginLeft: 16 }}>Đang lưu câu hỏi ...</div>
      </Backdrop>
      <Dialog
        aria-describedby={`question-${question.id}`}
        fullScreen={isSmallDevices}
        open={editQuestionOpen}
        onClose={() => setEditQuestionOpen(false)}
        TransitionComponent={isSmallDevices ? SlideTransition : FadeTransition}
      >
        <AppBar className={classes.appBar} color="inherit" position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setEditQuestionOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              CHỈNH SỬA CÂU HỎI
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
            name={`exam-${question.id}`}
            label="Kỳ thi"
            className={classes.textField}
            fullWidth
            variant="outlined"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
          />
          <TextField
            name={`category-${question.id}`}
            label="Dạng câu hỏi"
            className={classes.textField}
            fullWidth
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            name={`description-${question.id}`}
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
            name={`title-${question.id}`}
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
            question={question}
            options={options}
            setOptions={setOptions}
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
          />
          <TextField
            name={`explanation-${question.id}`}
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

export default EditQuestionDialog
