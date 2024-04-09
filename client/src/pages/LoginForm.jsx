import React from 'react';
import { AuthoForm } from './AuthoForm';

export const LoginForm = () => {
    const handleLoginonSubmit = (username, password) => {
        
    }

    return (
        <AuthoForm
            title = "Login"
            text = "Unlock streamlined fuel management with our secure login portal. Access personalized quotes and manage your profile hassle-free. Join us as we revolutionize fuel procurement."
            onSubmit={handleLoginonSubmit}
        />
    );
};
