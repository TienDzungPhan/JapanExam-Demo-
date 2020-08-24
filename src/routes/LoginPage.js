import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(3)
  }
}))

const LoginPage = () => {
  // Classes for styles usages
  const classes = useStyles()
  // Email state
  const [email, setEmail] = useState("")
  // Password state
  const [password, setPassword] = useState("")
  // Firebase Auth
  const auth = useAuth()
  // Login with Email and Password
  const loginWithEmailAndPassword = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="RegisterPage">
      <Container>
        <h3>ĐĂNG NHẬP</h3>
        <form className="LoginForm" onSubmit={loginWithEmailAndPassword}>
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            fullWidth
          >
            Đăng nhập
          </Button>
        </form>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 8 }}
          component={RouterLink}
          to="/register"
          fullWidth
        >
          Tạo tài khoản mới
        </Button>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: 8 }}
          fullWidth
        >
          Đăng nhập bằng tài khoản Google
        </Button>
      </Container>
    </div>
  )
}

export default LoginPage
