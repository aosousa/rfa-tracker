// Core
import { useEffect, useState } from 'react'
import './TopBar.css'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, store } from '../../app/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Components
import Modal from '../modal/Modal'

// Features
import { login, logout } from '../../features/auth/authSlice'

export const TopBar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authData = useSelector(() => store.getState().auth.data)
  const authStatus = useSelector(() => store.getState().auth.status)

  const [theme, setTheme] = useState('theme' in localStorage ? localStorage.theme : 'dark')
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onUsernameChanged = (e: any) => setUsername(e.target.value)
  const onPasswordChanged = (e: any) => setPassword(e.target.value)
  const onLoginButtonClicked = async () => {
    try {
      setLoginError(false)
      await dispatch(
        login({
          username,
          password
        })
      )
    } catch (error) {
      setLoginError(true)
      console.error(`Failed to login: ${error}`)
    }
  }

  const onLogoutButtonClicked = async () => {
    dispatch(logout())
  }

  const changeTheme = (theme: string) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    if (authStatus === 'failed') {
      setLoginError(true)
    } else {
      setLoginError(false)

      if (authStatus === 'succeeded') {
        setLoginModalIsOpen(false)
      }
    }
  }, [authStatus])

  return (
    <div className="top-bar">
      <div className="top-bar__logo-div">
        <div className="top-bar__logo-div-title">RFA Tracker</div>
      </div>

      <div className="top-bar__item">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
          Workouts
        </NavLink>
      </div>

      {authData !== '' && (
        <div className="top-bar__item">
          <NavLink to="/add-workout" className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}>
            Add Workout
          </NavLink>
        </div>
      )}

      <div className="top-bar__mode">
        {theme === 'dark' ? (
          <FontAwesomeIcon title="Light Mode" className="top-bar__sun" icon="sun" onClick={() => changeTheme('light')} />
        ) : (
          <FontAwesomeIcon title="Dark Mode" className="top-bar__moon" icon="moon" onClick={() => changeTheme('dark')} />
        )}

        {authData === '' && (
          <button
            className="top-bar__mode-edit"
            onClick={() => setLoginModalIsOpen(true)}
          >
            Edit Mode
          </button>
        )}
        {authData !== '' && (
          <button
            className="top-bar__mode-view"
            onClick={onLogoutButtonClicked}
          >
            View Mode
          </button>
        )}
      </div>

      {loginModalIsOpen && (
        <Modal title="Login" closeModal={() => setLoginModalIsOpen(false)}>
          <div className="flex flex-col mx-auto">
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input id="username" type="text" placeholder="Username" className="rfa-input" onChange={onUsernameChanged} />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input id="password" type="password" placeholder="Password" className="rfa-input" onChange={onPasswordChanged} />
            </div>

            <button
              className="flex justify-center items-center bg-sky-500 hover:bg-sky-600 disabled:bg-sky-300 hover:shadow-md text-white font-bold rounded-md disabled:pointer-events-none select-none p-1 mt-4"
              disabled={authStatus === 'loading' || username === '' || password === ''}
              onClick={onLoginButtonClicked}
            >
              Login
            </button>

            {loginError && <div className="mt-1 text-center text-xs text-red-700">Failed to authenticate user.</div>}
          </div>
        </Modal>
      )}
    </div>
  )
}
