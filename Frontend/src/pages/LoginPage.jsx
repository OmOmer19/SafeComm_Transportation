import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import {Form, Input, Button, Card, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useState } from "react";


//login page
function Login(){
    const { setUser, setToken, setRole } = useContext(AuthContext) // getting auth functions
    const navigate = useNavigate() // enabling navigation after login
    
    // to handle form submit
    const handleSubmit = (values) =>{
        //sending login req to backend
        axios.post('http://localhost:5000/auth/login', values)
        .then(res =>{
            setToken(res.data.token) //storing jwt token
            setUser({email: values.email}) //setting user email
            setRole(res.data.role) //storing role for condidional directing
            message.success('logged in successfully') // showing success message (ant design msg property)
            if(res.data.role === 'admin'){
                navigate('/admin-dashboard')
            }
            else{
                navigate('/user-dashboard')
            }
        })
        .catch(err =>{
            message.error(err.response?.data?.message || 'login failed') //showing err (ant dsgn msg property)
        })
    }

    return(
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
            <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
                Welcome To SafeComm
            </h1>
            <Card title='Login to Your Account' className="w-96 p-8 shadow-2xl rounded-xl">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Email" name='email' rules={[{required: true, message: 'please enter your email'}]}>
                        <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="email" />
                    </Form.Item>
                    <Form.Item label="Password" name='password' rules={[{required: true, message: 'please enter your password'}]}>
                        <Input.Password prefix={<LockOutlined className="text-gray-400"/>} placeholder="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-lg">
                            Login
                        </Button>
                    </Form.Item>
                    <div className="text-center mt-2">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link to="/register" className="text-blue-600 font-semibold">Sign Up</Link>
                    </div>
                </Form>
            </Card>
        </div>
    )
}
export default Login