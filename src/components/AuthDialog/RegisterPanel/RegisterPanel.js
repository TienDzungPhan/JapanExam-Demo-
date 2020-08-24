import React, { useState, useContext } from 'react'
import { DialogContext } from '../../../contexts/DialogContext'
import { useAuth, useFirestore } from 'reactfire'
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

const RegisterPanel = ({ setTabIndex }) => {
  // Classes for styles usages
  const classes = useStyles()
  // Auth Dialog Context
  const { setAuthDialogOpen, setAuthTabIndex } = useContext(DialogContext)
  // Set Loading Backdrop
  const [isLoading, setIsLoading] = useState(false)
  // Display Name State
  const [displayName, setDisplayName] = useState("")
  // Email State
  const [email, setEmail] = useState("")
  // Password State
  const [password, setPassword] = useState("")
  // Password Confirm State
  const [passwordConfirm, setPasswordConfirm] = useState("")
  // Firebase Auth
  const auth = useAuth()
  // Firestore User Ref
  const usersRef = useFirestore().collection("users")
  // Create User with Email and Password
  const createUserWithEmailAndPassword = async (e) => {
    e.preventDefault()
    if (passwordConfirm !== password) return
    setIsLoading(true)
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      await user.updateProfile({
        displayName: displayName
      })
      await usersRef.doc(user.uid).set({
        displayName: displayName
      })
      setIsLoading(false)
      setAuthDialogOpen(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div id='register-panel'>
      <TextField
        id="displayName"
        name="displayName"
        label="Tên hiển thị"
        fullWidth
        variant="outlined"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        required
      />
      <TextField
        id="email"
        name="email"
        type="email"
        className={classes.textField}
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
      <TextField
        id="Confirm"
        name="passwordConfirm"
        type="password"
        className={classes.textField}
        label="Xác nhận mật khẩu"
        fullWidth
        variant="outlined"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        fullWidth
        onClick={createUserWithEmailAndPassword}
        disabled={isLoading}
      >
        {!isLoading ?
          'Đăng ký' :
          <span id="loading">
            Đang đăng ký <CircularProgress color="inherit" size="1rem" />
          </span>
        }
      </Button>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginTop: 8 }}
        fullWidth
        onClick={() => setAuthTabIndex(0)}
      >
        Đã có tài khoản?
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

export default RegisterPanel
