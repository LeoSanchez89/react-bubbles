import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Login = props => {
	const initialState = {
		username: "",
		password: ""
	};

	const [data, setData] = React.useState(initialState);

	const handleInputChange = event => {
		setData({
			...data,
			[event.target.name]: event.target.value
		});
	};

	const handleFormSubmit = event => {
		event.preventDefault();
		axiosWithAuth()
			.post("/api/login", {
				username: data.username,
				password: data.password
			})
			.then(res => {
				console.log(res);
				window.localStorage.setItem("token", res.data.payload);
				// push to bubblepage
				props.history.push("/protected");
				setData(initialState);
			})
			.catch(error => {
				console.log(error);
				setData(initialState);
			});
	};

	return (
		<div>
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="Username"
					value={data.username}
					name="username"
					id="username"
					onChange={handleInputChange}
					required
				/>

				<input
					type="password"
					placeholder="Password"
					value={data.password}
					name="password"
					id="password"
					onChange={handleInputChange}
					required
				/>

				<button type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
