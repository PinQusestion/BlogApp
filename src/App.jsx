import React ,{ useState , useEffect} from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './appwrite/auth'
import {login, logOut} from "./store/authSlice"
import {Header,Footer} from './components'
import { Outlet } from 'react-router'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData){
        dispatch(login({userData}))
      }else{
        dispatch(logOut())
      }
    })
    .finally(() => setLoading(false))
  },[])

  return !loading ? (
    <div className='w-full flex flex-col bg-[#1a2336]' style={{ minHeight: '100%' }}>
      <Header />
      <h1>This is the home page</h1>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-[#1a2336]'>
      <div className='loader'></div>
    </div>
  )
}

export default App
