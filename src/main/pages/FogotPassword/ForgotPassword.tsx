import React from 'react';
import {useFormik} from "formik";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";
import {PATH} from "../../Routes/Routes";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {forgotPassTC} from "./forgotPasswordReducer";
import {SendEmail} from "./sendEmail/SendEmail";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import s from "../Registration/Registration.module.css";

type RecoveryPasswordErrorType = {
    email?: string
}

const ForgotPassword = () => {

    const dispatch = useAppDispatch();
    const status = useAppSelector(state => state.app.status)
    const isSendEmail = useAppSelector(state => state.forgotPassword.isSendEmail)

    const handleDisableClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (status === 'loading') {
            e.preventDefault();
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate(values) {
            const errors: RecoveryPasswordErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(forgotPassTC(values.email));
            formik.resetForm();
        }
    });

    if (isSendEmail) {
        return <SendEmail/>
    }

    return (
        <Grid container justifyContent={'center'} >
            <Grid item justifyContent={'center'} sm={3}>
                <form onSubmit={formik.handleSubmit} title="Forgot your password?">
                    <FormControl>
                        <FormGroup className={s.form}>
                            <h2 style={{textAlign: "center"}}>Recovery password</h2>
                            <TextField
                                label="Email"
                                color="secondary"
                                margin="normal"
                                disabled={status === 'loading'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: "red"}}>{formik.errors.email}</div>}

                            <div style={{color: "grey", margin: "7px"}}>Enter your email address and we will send you further
                                instructions
                            </div>
                            <Button style={{margin: "7px"}} variant={'contained'} color="secondary" type="submit"
                                    disabled={status === 'loading'}>Send
                                instructions</Button>
                            <div style={{color: "grey", margin: "7px"}}>Did you remember your password?</div>
                            <NavLink className={s.forgotPassword} to={PATH.LOGIN} onClick={handleDisableClick}>Try logging in</NavLink>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}

export default ForgotPassword