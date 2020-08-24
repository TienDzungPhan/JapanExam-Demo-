import React, { useState } from 'react'
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

const RegisterPage = () => {
  // Classes for styles usages
  const classes = useStyles()
  // Email state
  const [email, setEmail] = useState("")
  // Password state
  const [password, setPassword] = useState("")
  // Password Confirm State
  const [passwordConfirm, setPasswordConfirm] = useState("")
  // Firebase Auth
  const auth = useAuth()
  // Create User with Email and Password
  const createUserWithEmailAndPassword = async (e) => {
    e.preventDefault()
    if (passwordConfirm !== password) return
    try {
      await auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="RegisterPage">
      <Container>
        <h3>TẠO TÀI KHOẢN JAPANEXAM</h3>
        <form className="LoginForm" onSubmit={createUserWithEmailAndPassword}>
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
            helperText="Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ, số và ký tự đặc biệt"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            id="password"
            name="password"
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
          >Tạo tài khoản mới</Button>
        </form>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginTop: 8 }}
          fullWidth
        >Đăng nhập bằng tài khoản Google</Button>
      </Container>
    </div>
  )
}

export default RegisterPage
