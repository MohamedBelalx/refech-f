import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Modal, Button,Select,Input,Form, notification } from 'antd';
import axios from 'axios';
const { Option } = Select;
const BASE_URL = 'http://127.0.0.1:8000/api';

const Add = () => {
const [form] = Form.useForm();
const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

useEffect(() => {
    forceUpdate({});
}, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleFinish = () => {
      console.log(form.getFieldValue())
      axios.get(`${BASE_URL}/users/create`, { 
        params: {
            ...form.getFieldValue()
          }
       }, {
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        setTimeout(() => {
            notification.open({
                message: 'Insert Done',
                description:
                  'New User is inserted',
            });   
            form.resetFields()
        },1000)
    
    }).catch(err => {
        setTimeout(() => {
            notification.open({
                message: 'ERROR',
                description:
                  'This User Is Already Exist',
            });   
        },1000)
    
    });



  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Add New + 
      </Button>
      <Modal visible={isModalVisible} title="Add New Usewr"
      footer={[
            <Form.Item>
                <a key={1} htmltype="button" onClick={onReset} style={{float:'left',textDecoration:'underline',color:'black'}}>Reset Fields</a>

                <Button key="back" onClick={handleCancel}>
                    Cancle
                </Button>
                <Button form="add" key={2} type="primary" htmltype="submit" onClick={form.submit}>Submit</Button>

            </Form.Item>
      ,
      ]}
      
      >
        <Form form={form} name='add' layout="vertical" onFinish={handleFinish} preserve='true'>
        <Form.Item
            name="name"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}
            label='Full Name'
        >
            <Input placeholder="Username" />

        </Form.Item>

        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}
            label='User Name'
        >
            <Input placeholder="Username" />

        </Form.Item>

        <Form.Item
            name="email"
            rules={[
            {
                required: true,
                message: 'Please input your email!',
            },
            ]}
            label='Email Address'
        >
            <Input placeholder="Username" />

        </Form.Item>

        <Form.Item name="group" label='User Group'
        rules={[
            {
                required: true,
                message: 'Choose User Group',
            },
        ]}
            
        >
        <Select defaultValue="Status" >
            <Option >select status</Option>
            <Option value="locked">locked</Option>
            <Option value="active">active</Option>
            <Option value="inactive">inactive</Option>
        </Select>
        </Form.Item>

        <Form.Item name="profile" label='User Profile'
                rules={[
                    {
                        required: true,
                        message: 'Choose User Profile',
                    },
                ]}
        
        >
            <Select defaultValue="Status" >
                <Option >select status</Option>
                <Option value="locked">locked</Option>
                <Option value="active">active</Option>
                <Option value="inactive">inactive</Option>
            </Select>
        </Form.Item>
        </Form>

      </Modal>
    </div>
  );
};

export default Add;