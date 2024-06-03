import React, { useState } from "react";
import FormInput from "../components/FormInput";
import "../css/signup.css";
import { Form, Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";

const SignUp = () => {
	const [values, setValues] = useState({
		username: "",
		email: "",
		birthday: "",
		password: "",
		confirmPassword: "",
	});

	const navigate = useNavigate();

	const inputs = [
		{
			id: 1,
			name: "username",
			type: "text",
			placeholder: "Username",
			errorMessage: "Username should be 3-16 characters and not any special character",
			label: "Username",
			pattern: "^[A-Za-z0-9]{3,16}$",
			required: true,
		},
		{
			id: 2,
			name: "email",
			type: "email",
			placeholder: "Email",
			errorMessage: "It should be a valid email adress",
			label: "Email",
			required: true,
		},
		{
			id: 4,
			name: "password",
			type: "password",
			placeholder: "Password",
			errorMessage: "Password should be 9-20 characters and include at leas 1 letter 1 number and 1 special character",
			label: "Password",
			pattern: "^(?=.*\\d)[A-Za-z\\d@$!%*?&]{5,}$",
			required: true,
		},
		{
			id: 5,
			name: "confirmPassword",
			type: "password",
			placeholder: "Confirm Password",
			errorMessage: "Passwords don't match",
			label: "Confirm Password",
			pattern: values.password,
			required: true,
		},
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(values);
		try {
			await customFetch.post("/auth/register", values);
			toast.success("Registration successful! Redirecting...");
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			toast.error("Something went wrong, please try again!");
		}
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<div className="signup">
			<form onSubmit={handleSubmit}>
				<h1 className="register-h1">Register</h1>
				{inputs.map((input) => (
					<FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}></FormInput>
				))}
				<button type="submit" className="button-signup">
					Submit
				</button>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
					className="tologin"
				>
					<Link
						style={{
							textDecoration: "none",
							marginBottom: "19px",
							fontFamily: "Poppins",
							fontSize: "13px",
						}}
						to="/login"
					>
						Do you have already an account?
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
