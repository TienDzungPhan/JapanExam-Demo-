import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded'
import EditRoundedIcon from '@material-ui/icons/EditRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { useFirestore, useUser } from 'reactfire'
import { removeQuestion } from '../../../helper/question'

const useStyles = makeStyles((theme) => ({
  icon: {
    minWidth: 36
  },
}))

const ToolsPopover = ({ question, anchorEl, setAnchorEl, setEditQuestionOpen }) => {
  // Classes for styles usages
  const classes = useStyles()
  // Firebase Auth Current User
  const currentUser = useUser()
  // Firestore Question Ref
  const questionRef = useFirestore().collection('questions').doc(question.id)
  // Delete Question from DB
  const deleteQuestion = async () => {
    try {
      await removeQuestion(questionRef)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Popover
      id={Boolean(anchorEl) ? `tools-${question.id}` : undefined}
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List component="nav" aria-label="main tools">
        <ListItem button>
          <ListItemIcon className={classes.icon}>
            <BookmarkRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Lưu" secondary="Lưu về trang cá nhân" />
        </ListItem>
        {(currentUser.uid === question.authorId) &&
          <ListItem button onClick={() => {
            setAnchorEl(null)
            setEditQuestionOpen(true)
          }}>
            <ListItemIcon className={classes.icon}>
              <EditRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Sửa" secondary="Chỉnh sửa câu hỏi" />
          </ListItem>
        }
        {(currentUser.uid === question.authorId) &&
          <ListItem button onClick={deleteQuestion}>
            <ListItemIcon className={classes.icon}>
              <DeleteRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Xoá" secondary="Xoá câu hỏi" />
          </ListItem>
        }
      </List>
    </Popover>
  )
}

export default ToolsPopover
