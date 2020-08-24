import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useUser, useFirestore, useFirestoreDocData } from 'reactfire'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  authButton: {
    textDecoration: 'none',
    alignSelf: 'center'
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: '.7rem'
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: theme.spacing(10)
  }
}))

const UserAvatar = ({ userId, size }) => {
  // Classes for styles usages
  const classes = useStyles()
  // Firebase Auth Current User
  const currentUser = useUser()
  // Firestore User Ref
  const userDetailsRef = useFirestore().collection("users").doc(userId ? userId : (currentUser ? currentUser.uid : '1'))
  // User Details
  const { displayName } = useFirestoreDocData(userDetailsRef)
  return (
    <Avatar
      className={`${classes.authButton} ${classes[size]}`}
      component={RouterLink}
      to="/profile"
    >
      {displayName && displayName[0].toUpperCase()}
    </Avatar>
  )
}

export default UserAvatar
