import react from 'React';
import {FormGroup, grid2Classes, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import {useFormik} from "formik";
import React from "react";
import Button from "@mui/material/Button";
import {PATH} from "../../Routes/Routes";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {registrationTC} from "./registrationReducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Registration = () => {

    const dispatch = useAppDispatch();

    //const status = useAppSelector(state => state.app.status)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        /*if (status === 'loading') {
            e.preventDefault();
        }*/
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => {
            dispatch(registrationTC(values))
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length <=8) {
                errors.password = 'Password should be more than 8 symbols';
            } else if (values.password !== values.confirmPassword ) {
                errors.password = 'Password does not match'
            }
            return errors;
        },
    })
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'} style={{width: "200px"}}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <h2 style={{textAlign: "center"}}>Registration</h2>
                            <TextField
                                label='Email'
                                margin='normal'
                                color='primary'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}
                            <TextField
                                type='password'
                                label='Password'
                                margin='normal'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.email && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <TextField
                                type='password'
                                label='Confirm password'
                                margin='normal'
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            {formik.touched.email && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}
                            <Button  color="primary" type={'submit'} variant={'contained'}>
                                Sign Up
                            </Button>
                            <div style={{color: "grey"}}>Already have an account?</div>
                            <NavLink to={PATH.LOGIN} onClick={handleClick}>Sign In</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>


    )
}

export default Registration