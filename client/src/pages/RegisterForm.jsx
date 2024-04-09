import React from "react";
import Axios from "axios";
import { AuthoForm } from "./AuthoForm";

export const RegisterForm = () => {

    const register = (event, username, password) => {
        event.preventDefault();
        Axios.post('http://localhost:8080/register', {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response);
            window.location.href = '/login';
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <AuthoForm
            title="Register"
            text="Ready to predict fuel rates located all around the US? Sign up now to access personalized quotes, hassle-free profile management, and exclusive features. Join us as we pave the way for the future of fuel procurement!"
            onSubmit={register}
        />
    );
};