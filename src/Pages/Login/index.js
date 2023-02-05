import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import { loginUser, useAuthState, useAuthDispatch } from '../../Context';
import styles from './login.module.css';
import CustomInput from '../../Components/CustomInput';
import { basicSchemaLogin } from '../../Components/YupSchema';

function Login(props) {
	const dispatch = useAuthDispatch();
	const { errorMessage } = useAuthState();

	const onSubmit = async (values, actions) => {
		try {
			let response = await loginUser(dispatch, { email: values.email, password: values.password });
			if (!response.username) return;
			props.history.push('/dashboard');
		} catch (error) {
			dispatch({ type: 'FETCH_ERROR', error: error });
		}
		actions.resetForm();
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Login Page</h1>
				{errorMessage ? <p className={styles.error}>{String(errorMessage)}</p> : null}				
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={onSubmit}
					validationSchema={basicSchemaLogin}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className={styles.form}>
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='email' component={CustomInput} name="email" type="email" />
							{errors.email && touched.email ? <div className={styles.error}>{errors.email}</div> : null}
							
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='password' component={CustomInput} type='password' name="password" />
							{errors.password && touched.password ? (<div className={styles.error}>{errors.password}</div>) : null}
							
							<button disabled={isSubmitting} type="submit">Submit</button>

							<NavLink to={'/register'}>Sign Up</NavLink>
							{/* <NavLink to={'/forget-password'}>Forget password</NavLink> */}
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Login;
