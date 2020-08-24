import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DialogContext } from '../../../contexts/DialogContext'
import { AuthCheck } from 'reactfire'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import UserAvatar from '../../UserAvatar'
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded'
// import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded'
import CreateQuestionDialog from '../../CreateQuestionDialog'
// import { useTheme } from '@material-ui/core/styles'
// import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  authButton: {
    marginLeft: "auto",
    textDecoration: "none",
    display: "flex"
  },
  authNav: {
    marginRight: theme.spacing(1),
  }
}))

const AuthButton = () => {
  // Classes for styles usages
  const classes = useStyles()
  // Auth Dialog Context
  const { setAuthDialogOpen, setAuthTabIndex } = useContext(DialogContext)
  // Do not display AuthNav on Small Devices
  // const theme = useTheme()
  // const isSmallDevices = useMediaQuery(theme.breakpoints.down('sm'))
  // Create Question Dialog Open State
  const [createQuestionOpen, setCreateQuestionOpen] = useState(false)
  return (
    <AuthCheck
      fallback={
        <div className={classes.authButton}>
          <Button
            color="inherit"
            onClick={() => {
              setAuthTabIndex(0)
              setAuthDialogOpen(true)
            }}
          >
            ĐĂNG NHẬP
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setAuthTabIndex(1)
              setAuthDialogOpen(true)
            }}
          >
            ĐĂNG KÝ
          </Button>
        </div>
      }
    >
      <div className={classes.authButton}>
        {/* {!isSmallDevices && */}
          <div className={classes.authNav}>
            <IconButton
              color="inherit"
              aria-label="create"
              onClick={() => setCreateQuestionOpen(true)}
            >
              <PostAddRoundedIcon />
            </IconButton>
            {/* <IconButton
              color="inherit"
              aria-label="notifications"
            >
              <NotificationsRoundedIcon />
            </IconButton> */}
            <CreateQuestionDialog
              createQuestionOpen={createQuestionOpen}
              setCreateQuestionOpen={setCreateQuestionOpen}
            />
          </div>
        {/* } */}
        <UserAvatar />
      </div>
    </AuthCheck>
  )
}

export default AuthButton
