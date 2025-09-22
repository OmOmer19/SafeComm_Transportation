import React, {useState, useEffect, useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Table, Card, message, Tag,Button } from 'antd'
import { CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'


//admin dashboard page component
function AdminDashboard(){
    const {setToken,setUser,setRole,token} = useContext(AuthContext) //getting auth token
    const [reports, setReports] = useState([]) //storing fetched reports

    // fetching reports from backend
    const fetchReports = () =>{
        axios.get('https://safecomm-transportation-backend.onrender.com/transit/reports',{
            headers: {Authorization: `Bearer ${token}`} //sending jwt token
        })
        .then(res =>{
            setReports(res.data.reports) //saving reports to state
        })
        .catch(err =>{
            message.error(err.response?.data?.message || 'unable to fetch reports')
        })
    }
    useEffect(() =>{
        fetchReports()  //fetching reports when component mounts
    },[]) 

     // logout function
    const handleLogout = () => {
        setToken(null) // clearing token
        setUser(null) // clearing user info
        setRole(null) // clearing role
        navigate('/login') // redirecting to login
        message.success('Logged out successfully')
    }

    // defining table columns
    const columns = [
        { title: 'Route Name', dataIndex: 'routeName', key: 'routeName' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Status', dataIndex: 'status', key: 'status', render:(text) => getStatusTag(text) }, //showing color tag with status icon
        { title: 'User Email', dataIndex: ['userId', 'email'], key: 'userEmail' },
        { title: 'Submitted At', dataIndex: 'createdAt', key: 'createdAt' }
    ]

    // mapping status to tag color and icon
    const getStatusTag = (status) => {
        switch(status){
            case 'pending':
                return <Tag icon={<ClockCircleOutlined />} color="orange">{status}</Tag>
            case 'reviewed':
                return <Tag icon={<ExclamationCircleOutlined />} color="blue">{status}</Tag>
            case 'resolved':
                return <Tag icon={<CheckCircleOutlined />} color="green">{status}</Tag>
            default:
                return <Tag>{status}</Tag>
        }
    }

    return(
        <div className="p-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
            <div className="flex w-full justify-end mb-4">
                <Button type="primary" danger onClick={handleLogout}>Logout</Button>
            </div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800 drop-shadow-lg">
                Admin Dashboard - SafeComm Reports
            </h1>
            <Card className="shadow-xl rounded-lg">
                <Table columns={columns} 
                      dataSource={reports} 
                      rowKey={record => record._id}
                      bordered
                      pagination={{pageSize:5}}
                />
            </Card>
        </div>
    )
}

export default AdminDashboard