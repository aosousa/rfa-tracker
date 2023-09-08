import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { App } from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faMoon, faPencil, faSquareMinus, faSun, faTrash } from '@fortawesome/free-solid-svg-icons'

// Features
import { setAuthData } from './features/auth/authSlice'
import { fetchMoves } from './features/moves/movesSlice'
import { fetchMoveCategories } from './features/moveCategories/moveCategoriesSlice'
import { fetchWorkouts } from './features/workouts/workoutsSlice'

// Utils
import CookieUtils from './utils/cookieUtils'

const start = async () => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  const container = document.getElementById('root')!
  const root = createRoot(container)

  library.add(faEye, faMoon, faPencil, faSquareMinus, faSun, faTrash)

  const sessionCookie = CookieUtils.getCookie('rfa-t_session')
  if (sessionCookie) {
    store.dispatch(setAuthData(sessionCookie))
  }

  // load all needed data at the start
  store.dispatch(fetchMoves())
  store.dispatch(fetchMoveCategories())
  store.dispatch(fetchWorkouts())

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename="/rfa-tracker">
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

start()
