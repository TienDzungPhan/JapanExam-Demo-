import React, { useState, useContext } from 'react'
import { AuthCheck, useFirestore, useUser } from 'reactfire'
import { DialogContext } from '../../contexts/DialogContext'
import QuestionHeader from './QuestionHeader'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
    whiteSpace: 'pre-line'
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  description: {
    marginTop: theme.spacing(2)
  },
  answerForm: {
    width: '100%',
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1)
  },
  answerLabel: {
    borderRadius: '4px',
    padding: '0 1rem',
    marginTop: theme.spacing(1),
    '& > span:last-child': {
      width: '100%'
    }
  },
  correct: {
    background: 'springgreen',
    color: 'white'
  },
  incorrect: {
    background: 'salmon',
    color: 'white'
  },
  answersCount: {
    margin: theme.spacing(1)
  }
}))

const Question = ({ question }) => {
  // Firebase Auth Current User
  const currentUser = useUser()
  // Auth Dialog Context
  const { setAuthDialogOpen, setAuthTabIndex } = useContext(DialogContext)
  // Classes for styles usages
  const classes = useStyles()
  // Selected Option
  const [selectedOption, setSelectedOption] = useState(null)
  // Correct Answer
  const correctAnswer = question.options.find(option => option.isCorrect).content
  // Answer State
  const [isAnswered, setIsAnswered] = useState(false)
  // Correct State
  const isCorrect = (selectedOption === correctAnswer)
  // Firestore Answer Ref
  const answerRef = useFirestore().collection('answers').doc(`${currentUser && currentUser.uid}_${question.id}`)
  // Submit Answer to DB
  const submitAnswer = async () => {
    try {
      await answerRef.set({
        questionId: question.id,
        userId: currentUser.uid,
        selectedOption
      })
      setIsAnswered(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className={classes.root} elevation={3}>
      <QuestionHeader question={question} />
      <CardContent>
        {question.exam &&
          <Chip
            className={classes.chip}
            label={question.exam}
            size="small"
            variant="outlined"
            color="primary"
            clickable
          />
        }
        {question.category &&
          <Chip
            className={classes.chip}
            label={question.category}
            size="small"
            variant="outlined"
            color="secondary"
            clickable
          />
        }
        <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
          {question.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography variant="h6" component="h2">
          {question.title}
        </Typography>
        <FormControl component="fieldset" className={classes.answerForm}>
          <RadioGroup
            aria-label={`answer-${question.id}`}
            name={`answer-${question.id}`}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {question.options.map((option, index) =>
              <FormControlLabel
                className={`
                  ${classes.answerLabel}
                  ${isAnswered && (selectedOption === option.content) && (!isCorrect && classes.incorrect)}
                  ${isAnswered && (option.content === correctAnswer) && classes.correct}
                `}
                key={`${question.id}-${index}`}
                value={option.content}
                control={<Radio color="primary" />}
                label={
                  <div className="OptionLabel" style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <span>{(selectedOption === option.content) ? <strong>{option.content}</strong> : option.content}</span>
                    {isAnswered &&
                      <small style={{ marginLeft: 'auto' }}>
                        {!question.answersCount ? 0 : Math.round((option.selectedCount / question.answersCount) * 100)}%
                      </small>
                    }
                  </div>
                }
                disabled={isAnswered}
              />  
            )}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions>
        {!isAnswered ?
          <AuthCheck
            fallback={
              <Button
                disabled={!selectedOption}
                onClick={() => {
                  setAuthTabIndex(0)
                  setAuthDialogOpen(true)
                }}
                fullWidth
              >
                Đăng nhập để xem kết quả
              </Button>
            }
          >
            <Button
              disabled={!selectedOption}
              onClick={submitAnswer}
              fullWidth
            >
              Xem kết quả
            </Button>
          </AuthCheck> :
          <Typography className={classes.answersCount} variant="body1" component="p">
            {!question.answersCount ? 'Chưa có ai' : `${question.answersCount} người đã`} trả lời câu hỏi này
          </Typography>
        }
      </CardActions>
    </Card>
  )
}

export default Question
