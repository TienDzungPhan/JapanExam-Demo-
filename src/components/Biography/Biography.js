import React from 'react'
import { useAuth, useUser, useFirestore, useFirestoreDocData } from 'reactfire'
import Button from '@material-ui/core/Button'
import UserAvatar from '../UserAvatar'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    textAlign: 'left',
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'center'
  },
  logoutButton: {
    marginTop: theme.spacing(2)
  }
}))

const Biography = ({ userId }) => {
  // Classes for styles usages
  const classes = useStyles()
  // Firebase Auth
  const auth = useAuth()
  // Firebase Auth Current User
  const currentUser = useUser()
  // Firestore User Ref
  const userDetailsRef = useFirestore().collection("users").doc(userId ? userId : (currentUser ? currentUser.uid : '1'))
  // User Details
  const { displayName } = useFirestoreDocData(userDetailsRef)
  // Logout Current User
  const logout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Paper className={classes.root} elevation={3} square>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid className={classes.avatarSection} item sm={5}>
          <UserAvatar userId={userId} size="large" />
        </Grid>
        <Grid className={classes.nameSection} item sm={7}>
          <Typography variant="h3">{displayName}</Typography>
          <Button
            className={classes.logoutButton}
            color="secondary"
            variant="contained"
            onClick={logout}
          >
            Đăng xuất
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Biography
