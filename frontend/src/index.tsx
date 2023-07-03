import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { App } from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faPencil, faSquareMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

import { setAuthData } from './features/auth/authSlice'
import { fetchMoves } from './features/moves/movesSlice'
import { fetchMoveCategories } from './features/moveCategories/moveCategoriesSlice'
import { fetchWorkouts } from './features/workouts/workoutsSlice'

import { CookieUtils } from './utils/cookieUtils'

const start = async () => {
  const container = document.getElementById('root')!
  const root = createRoot(container)

  library.add(faEye, faPencil, faSquareMinus, faTrash)

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
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

start()
