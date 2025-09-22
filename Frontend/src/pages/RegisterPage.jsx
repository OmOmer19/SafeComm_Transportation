import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Button, Card, message , Select} from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

const {Option} = Select


// register page component
function Register(){
     const navigate = useNavigate() 

     //handleing fomr submissio  using promise chaining
     const handleSubmit = (values) =>{
        axios.post('https://safecomm-transportation-backend.onrender.com/auth/register',values)
        .then(res =>{
            message.success('registered successfully') //showing success msg(antd property)
            navigate('/login') //move to login
        })
        .catch(err =>{
            message.error(err.response?.data?.message || 'registration failed') //showing err msg(antd prop)
        })
     }

     return(
        <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500'>
            <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
                Welcome To SafeComm
            </h1>
            <Card title="SafeComm Register" className="w-96 p-6 shadow-2xl rounded-xl">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'please enter your username' }]}>
                        <Input prefix={<UserOutlined className='text-gray-400' />} placeholder="username" />
                    </Form.Item>
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'please enter your email' }]}>
                        <Input prefix={<MailOutlined className='text-gray-400'/>} placeholder="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'please enter your password' }]}>
                        <Input.Password prefix={<LockOutlined className='text-gray-400'/>} placeholder="password" />
                    </Form.Item>

                    <Form.Item label="Role" name="role" rules={[{ required: true, message: 'please select your role' }]}>
                        <Select placeholder="Select role">
                       <Option value="user">User</Option>
                       <Option value="admin">Admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 rounded-lg shadow-lg"
                        >
                            Register
                        </Button>
                    </Form.Item>
                    <div className="text-center mt-2">
                        <span className="text-gray-600">Already have an account? </span>
                        <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
                    </div>
                </Form>
            </Card>
        </div>
     )
}

export default Register