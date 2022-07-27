import react from 'React';
import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

const Login = () => {

    // const dispatch = useAppDispatch();
    // const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            formik.resetForm();
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 7) {
                errors.password = 'Must be 7 characters or more';
            }
            return errors;
        },
    })

    // if (isLoggedIn) {
    //     return <Navigate to={'/profile'}/>
    // }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                                <h2 style={{textAlign: "center"}}>Sign In</h2>
                            <TextField label="Email"
                                       margin="normal"
                                       color="secondary"
                                       {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}

                            <TextField type="password"
                                       label="Password"
                                       color="secondary"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.touched.email && formik.errors.password &&
                                <div style={{color: "red"}}>{formik.errors.password}</div>}

                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox
                                    color="secondary"
                                    checked={formik.values.rememberMe}
                                    {...formik.getFieldProps('rememberMe')}/>
                            }/>
                            <Button color="secondary" type={'submit'} variant={'contained'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

export default Login