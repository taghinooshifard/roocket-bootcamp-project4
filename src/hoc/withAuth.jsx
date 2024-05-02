import { useDispatch, useSelector } from 'react-redux'
import useStorage, { Storage } from '../hooks/useStorage'
import Login from '../pages/Login'
import { setProfile } from '../slice/profileSlice'

function withAuth(MyPage) {
  return function Authenticate(props){
    // const email = useSelector((state) => state.username.email)
    const dispatch = useDispatch()
    dispatch(setProfile(localStorage.getItem(Storage.UserName)))

    return useStorage()  ? (<MyPage {...props}/>) : (<Login afterLoginPage={MyPage} {...props}/>)
  }
}

export default withAuth
