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
    <div className='w-full min-h-screen flex flex-wrap content-between bg-[#1a2336]'>
      <div className='w-full'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center bg-[#1a2336]'>
      <div className='loader'></div>
    </div>
  )
}

export default App
