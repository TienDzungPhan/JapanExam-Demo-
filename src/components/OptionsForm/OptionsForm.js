import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  optionsRadio: {
    marginTop: theme.spacing(3),
    width: "100%"
  },
  radioGroup: {
    '& > *': {
      display: "flex",
      '& > span + span': {
        alignSelf: "center",
        width: "100%"
      }
    }
  },
}))

const OptionsForm = ({ question, options, setOptions, correctAnswer, setCorrectAnswer }) => {
  // Classes for styles usages
  const classes = useStyles()
  return (
    <FormControl component="fieldset" className={classes.optionsRadio}>
      <FormLabel component="legend">Đáp án</FormLabel>
      <RadioGroup
        aria-label={`options${question && `-${question.id}`}`}
        name={`options${question && `-${question.id}`}`}
        className={classes.radioGroup}
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      >
        {options.map((option, index) => 
          <FormControlLabel
            key={`option${question && `-${question.id}`}-${index}`}
            value={option}
            control={<Radio color="primary" />}
            label={
              <TextField
                name={`option${question && `-${question.id}`}-${index}`}
                label={`Đáp án ${index+1}`}
                className={classes.textField}
                fullWidth
                variant="outlined"
                value={option}
                onChange={(e) => {
                  let newOptions = [...options]
                  newOptions[index] = e.target.value
                  setOptions(newOptions)
                }}
                required
              />
            }
          />
        )}
      </RadioGroup>
    </FormControl>
  )
}

export default OptionsForm
