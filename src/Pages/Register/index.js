import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, Form, Formik } from "formik";
import { useAuthState, useAuthDispatch, registerUser } from '../../Context';
import styles from './register.module.css';
import { basicSchemaRegister } from '../../Components/YupSchema';
import CustomInput from '../../Components/CustomInput';

function Register(props) {
	const dispatch = useAuthDispatch();
	const { errorMessage } = useAuthState();

	const onSubmit = async (values, actions) => {
		try {
			let response = await registerUser(dispatch, { username: values.username, email: values.email, password: values.password });
			if (!response.username) return;
			props.history.push('/login');
		} catch (error) {
			dispatch({ type: 'FETCH_ERROR', error: error });
		}
		actions.resetForm();
	};

	return (
		<div className={styles.container}>
			<div className={{ width: 200 }}>
				<h1>Register Page</h1>
				{errorMessage ? <p className={styles.error}>{String(errorMessage)}</p> : null}				
				<Formik
					initialValues={{ username: '',email: '', password: '' }}
					onSubmit={onSubmit}
					validationSchema={basicSchemaRegister}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className={styles.form}>							
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='your name' component={CustomInput} name="username" type="text" />
							{errors.username && touched.username ? <div className={styles.error}>{errors.username}</div> : null}
							
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='email' component={CustomInput} name="email" type="email" />
							{errors.email && touched.email ? <div className={styles.error}>{errors.email}</div> : null}
							
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='password' component={CustomInput} type='password' name="password" />
							{errors.password && touched.password ? (<div className={styles.error}>{errors.password}</div>) : null}
							
							<button disabled={isSubmitting} type="submit">Submit</button>

							<NavLink to={'/login'}>log in</NavLink>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Register;
