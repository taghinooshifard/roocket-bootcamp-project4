import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import withAuth from './hoc/withAuth'
import AdminLayout from './pages/AdminLayout'
import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  const Main = withAuth(AdminLayout)
  return (
    <Provider store={store}>

        <Main/>
    </Provider>
    )

 }

export default App
