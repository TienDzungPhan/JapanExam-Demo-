import React, { Suspense } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import './NavBar.css'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Skeleton from '@material-ui/lab/Skeleton'
import AuthButton from './AuthButton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    textDecoration: "none"
  },
  loadingSkeleton: {
    marginLeft: "auto",
    height: "2.5rem",
    width: "5rem",
  }
}))

const NavBar = () => {
  // Classes for styles usages
  const classes = useStyles()
  return (
    <div className={`NavBar ${classes.root}`}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              color="inherit"
              variant="inherit"
              component={RouterLink}
              to="/"
            >
              JapanExam
            </Link>
          </Typography>
          <Suspense fallback={<Skeleton className={classes.loadingSkeleton} />}>
            <AuthButton />
          </Suspense>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
