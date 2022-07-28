import react from 'React';
import SuperButton from "../../common/SuperComponents/c2-SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {loginTC} from "./loginReducer";




const Login = () => {

    const dispatch = useDispatch()


    const SignInHandler = ()=>{
        dispatch(loginTC())
    }
    return (
        <div
        ><h1>Login
        </h1>
            <SuperButton onClick={SignInHandler}> Sign in</SuperButton></div>
    )
}

export default Login