import React, { useState, useContext } from 'react'
import { DialogContext } from '../../../contexts/DialogContext'
import { useAuth } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(3)
  },
}))

const LoginPanel = ({ setTabIndex }) => {
  // Classes for styles usages
  const classes = useStyles()
  // Auth Dialog Context
  const { setAuthDialogOpen, setAuthTabIndex } = useContext(DialogContext)
  // Set Loading Backdrop
  const [isLoading, setIsLoading] = useState(false)
  // Set Loading Backdrop
  const [isGuestLoading, setIsGuestLoading] = useState(false)
  // Email state
  const [email, setEmail] = useState('')
  // Password state
  const [password, setPassword] = useState('')
  // Firebase Auth
  const auth = useAuth()
  // Login with Email and Password
  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await auth.signInWithEmailAndPassword(email, password)
      setIsLoading(false)
      setAuthDialogOpen(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  // Login as Guest
  const loginAsGuest = async (e) => {
    e.preventDefault()
    setIsGuestLoading(true)
    try {
      await auth.signInWithEmailAndPassword('guest@email.com', 'xyftyt-zuwzEk-6dyzje')
      setIsGuestLoading(false)
      setAuthDialogOpen(false)
    } catch (error) {
      setIsGuestLoading(false)
      console.log(error)
    }
  }
  return (
    <div id="login-panel">
      <TextField
        id="email"
        name="email"
        type="email"
        label="Địa chỉ Email"
        fullWidth
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        id="password"
        name="password"
        type="password"
        className={classes.textField}
        label="Mật khẩu"
        fullWidth
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        fullWidth
        onClick={loginWithEmailAndPassword}
        disabled={isLoading}
      >
        {!isLoading ?
          'Đăng nhập' :
          <span id="loading">
            Đang đăng nhập <CircularProgress color="inherit" size="1rem" />
          </span>
        }
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 8 }}
        fullWidth
        onClick={() => setAuthTabIndex(1)}
      >
        Tạo tài khoản mới
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: 8 }}
        fullWidth
        onClick={loginAsGuest}
        disabled={isGuestLoading}
      >
        {!isGuestLoading ?
          'Đăng nhập không cần tài khoản' :
          <span id="loading">
            Đang đăng nhập <CircularProgress color="inherit" size="1rem" />
          </span>
        }
      </Button>
      {/* <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: 8 }}
        fullWidth
      >
        Đăng nhập bằng Google
      </Button>
      <Button
        variant="outlined"
        color="primary"
        style={{ marginTop: 8 }}
        fullWidth
      >
        Đăng nhập bằng Facebook
      </Button> */}
    </div>
  )
}

export default LoginPanel
