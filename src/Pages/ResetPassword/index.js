import React from 'react';
import { Field, Form, Formik } from "formik";
import styles from './reset.module.css';
import CustomInput from '../../Components/CustomInput';
import { ResetSchema } from '../../Components/YupSchema';
import { useAuthState } from '../../Context';

function ResetPassword(props) {

	const { errorMessage } = useAuthState();

	const onSubmit = async (values, actions) => {
		console.log(values);
		actions.resetForm();
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Reset Password Page</h1>
				{errorMessage ? <p className={styles.error}>{String(errorMessage)}</p> : null}				
				<Formik
					initialValues={{ password: '', confirmPassword: '' }}
					onSubmit={onSubmit}
					validationSchema={ResetSchema}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className={styles.form}>
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='Password' component={CustomInput} name="password" type="password" />
							{errors.password && touched.password ? <div className={styles.error}>{errors.password}</div> : null}													
							
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='Confirm password' component={CustomInput} name="confirmPassword" type="password" />
							{errors.confirmPassword && touched.confirmPassword ? <div className={styles.error}>{errors.confirmPassword}</div> : null}													
							
							<button disabled={isSubmitting} type="submit">Submit</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default ResetPassword;
