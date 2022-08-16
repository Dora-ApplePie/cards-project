import {FormGroup, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import {useFormik} from "formik";
import React from "react";
import Button from "@mui/material/Button";
import {PATH} from "../../Routes/Routes";
import {Navigate, NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {registrationTC} from "./registrationReducer";
import s from "../Registration/Registration.module.css";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
    confirmPassword?: string
}

const Registration = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useAppSelector(state => state.login.isLogin)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            dispatch(registrationTC(values));
            formik.resetForm({values: {email: values.email, password: '', confirmPassword: ''}});
            if (!isLoggedIn) {
                navigate(`/login`);
            }

        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <= 7) {
                errors.password = 'Must be 8 characters or more symbols in password';
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please, confirm your password';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Password is incorrect';
            }
            return errors;
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup className={s.form}>
                            <h2 style={{textAlign: "center"}}>Registration</h2>
                            <TextField
                                label='Email'
                                margin='normal'
                                style={{minWidth: '305px'}}
                                disabled={status === 'loading'}
                                color={"secondary"}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                type='password'
                                label='Password'
                                margin='normal'
                                disabled={status === 'loading'}
                                color={"secondary"}
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.email && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <TextField
                                type='password'
                                label='Confirm password'
                                margin='normal'
                                disabled={status === 'loading'}
                                color={"secondary"}
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ?
                                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                            <Button className={s.forgotPassword}
                                    disabled={status === 'loading'}
                                    color="secondary"
                                    type={'submit'}
                                    variant={'contained'}>
                                Sign Up
                            </Button>
                            <div className={s.forgotPassword} style={{color: "grey"}}>Already have an account?</div>
                            <NavLink className={s.forgotPassword} to={PATH.LOGIN}>Sign In</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>


    )
}

export default Registration