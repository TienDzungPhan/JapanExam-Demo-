import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { DialogContext } from '../../contexts/DialogContext'
import SwipeableViews from 'react-swipeable-views'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import LoginPanel from './LoginPanel'
import RegisterPanel from './RegisterPanel'

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div style={{ paddingTop: 24, paddingBottom: 24 }}>
          {children}
        </div>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `auth-tab-${index}`,
    'aria-controls': `auth-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  
}))

const AuthDialog = () => {
  // Classes for style usages
  const classes = useStyles()
  // Auth Dialog Context
  const { authDialogOpen, setAuthDialogOpen, authTabIndex, setAuthTabIndex } = useContext(DialogContext)
  // Display Fullscreen Dialog on Small Devices
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  // Switch Tab
  const switchTab = (e, newValue) => setAuthTabIndex(newValue)
  // Swipe Effect
  const handleChangeIndex = (index) => setAuthTabIndex(index)
  return (
    <Dialog
      className={classes.root}
      open={authDialogOpen}
      onClose={() => setAuthDialogOpen(false)}
      aria-labelledby="form-dialog-title"
      fullScreen={fullScreen}
      transitionDuration={500}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={authTabIndex}
          onChange={switchTab}
          indicatorColor="primary"
          textColor="primary"
          centered
          aria-label="auth tabs"
        >
          <Tab label="Đăng Nhập" {...a11yProps(0)} />
          <Tab label="Đăng Ký" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <DialogContent>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={authTabIndex}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={authTabIndex} index={0} dir={theme.direction}>
            <LoginPanel />
          </TabPanel>
          <TabPanel value={authTabIndex} index={1} dir={theme.direction}>
            <RegisterPanel />
          </TabPanel>
        </SwipeableViews>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setAuthDialogOpen(false)}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthDialog
