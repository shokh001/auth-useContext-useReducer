import React from 'react';
import { Field, Form, Formik } from "formik";
import styles from './forget.module.css';
import CustomInput from '../../Components/CustomInput';
import { ForgetSchema } from '../../Components/YupSchema';
import { useAuthState } from '../../Context';

function ForgetPassword(props) {

	const { errorMessage } = useAuthState();

	const onSubmit = async (values, actions) => {
		console.log(values);
		actions.resetForm();
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h1>Forget Password Page</h1>
				{errorMessage ? <p className={styles.error}>{String(errorMessage)}</p> : null}				
				<Formik
					initialValues={{ email: '' }}
					onSubmit={onSubmit}
					validationSchema={ForgetSchema}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form className={styles.form}>
							<Field className={styles.formFeild} disabled={isSubmitting} placeholder='Email' component={CustomInput} name="email" type="email" />
							{errors.email && touched.email ? <div className={styles.error}>{errors.email}</div> : null}																															
							
							<button disabled={isSubmitting} type="submit">Submit</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default ForgetPassword;
