import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button, DatePicker, Select,notification } from 'antd';
import { SearchOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
const { RangePicker } = DatePicker;
const { Option } = Select;
const BASE_URL = 'http://127.0.0.1:8000/api';

const FilterForm = ({updateData}) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log('Finish:', values);
    console.log(form.getFieldValue())
  };

  const handleChange = () => {
      console.log(form.getFieldValue())
      axios.get(`${BASE_URL}/filter`, { 
        params: {
            ...form.getFieldValue()
          }
       }, {
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        updateData(res.data.data);
    })
    
  }

  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="email"
      >
        <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Username" onChange={handleChange} />

      </Form.Item>
      <Form.Item name="username">
        <Input onChange={handleChange}
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="username"
        />    
      </Form.Item>
      <Form.Item name="status">
        <Select onChange={handleChange} defaultValue="Status" style={{ width: 120 }}>
            <Option >select status</Option>
            <Option value="locked">locked</Option>
            <Option value="active">active</Option>
            <Option value="inactive">inactive</Option>
        </Select>
      </Form.Item>
      <Form.Item name="date">
        <RangePicker onChange={handleChange}/>
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default FilterForm;