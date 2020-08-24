import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute'
import NavBar from './NavBar'
import HomePage from '../routes/HomePage'
import SkeletonPage from '../routes/SkeletonPage'
import ProfilePage from '../routes/ProfilePage'
import AuthDialog from './AuthDialog/AuthDialog'
import DialogContextProvider from '../contexts/DialogContext'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <DialogContextProvider>
          <NavBar />
          <main className="MainContent">
            <Suspense fallback={<SkeletonPage />}>
              <Switch>
                <ProtectedRoute path="/profile"><ProfilePage /></ProtectedRoute>
                <Route path="/"><HomePage /></Route>
              </Switch>
              <AuthDialog />
            </Suspense>
          </main>
        </DialogContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
