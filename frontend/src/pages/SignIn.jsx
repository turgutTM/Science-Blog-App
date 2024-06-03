import React, { useState } from "react";
import FormInput from "../components/FormInput";
import "../css/signin.css";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/userSlice";

const SignIn = () => {
	const dispatch = useDispatch();

	const [values, setValues] = useState({
		email: "",
		password: "",
		confirmPassword: "",
	});
	const navigate = useNavigate();

	const inputs = [
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
	];
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(values);

		try {
			const { data } = await customFetch.post("/auth/login", values);
			toast.success("Login successful! Redirecting...");
			dispatch(setCurrentUser(data.user));
			setTimeout(() => {
				navigate("/dashboard");
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
				<h1 className="login-h1">Login</h1>
				{inputs.map((input) => (
					<FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}></FormInput>
				))}

				<button type="submit" className="button-signin">
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
						to="/register"
					>
						Don't have an account? Create one.
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
