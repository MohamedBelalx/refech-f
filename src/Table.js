import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Button, Divider,Spin, notification } from 'antd';
import { EditOutlined, StopOutlined,LockOutlined,EllipsisOutlined } from '@ant-design/icons';

import FilterForm from './Form';
import axios from 'axios';
const BASE_URL = 'http://127.0.0.1:8000/api';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
    responsive: ["lg"]
  },
  {
    title: 'Username',
    dataIndex: 'username',
    responsive: ["lg"]
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    responsive: ["lg"]
  },
  {
    title: 'Group',
    dataIndex: 'group',
    responsive: ["lg"]
  },
  {
    title: 'Status',
    dataIndex: 'status',
    responsive: ["lg"]
  },
  {
    title: 'Created On',
    dataIndex: 'created_at',
    responsive: ["lg"]
  },
];
let data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
]; // rowSelection object indicates the need for row selection


const Demo = () => {
  const [selectionType, setSelectionType] = useState('checkbox');
  const [state,setState] = useState({
      selectedRowKeys:[]
  });
  const [spin,setSpin] = useState({
    isLoading:false,
    isDelete:false
});
const [users,setUsers] = useState([]);
  const {selectedRowKeys} = state
  const [selectedCount,setStateCount] = useState({
    selected:0,
})


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setStateCount({selected:selectedRows.length})
      setState({selectedRows})
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  const handleClick = () => {
      setSpin({...spin,isLoading:true})
      setTimeout(() => {
        setState({selectedRowKeys:[]})
        setSpin({...spin,isLoading:false})
        setStateCount({selected:0})
      }, 200);
  }

  async function fetchUsers() {
        const response = await fetch(`${BASE_URL}/users`);
        const json = await response.json();
        setUsers(json.data);
    }

  useEffect(() => {
    fetchUsers();
  },[spin.isDelete])

  const handleDelete = (e) => {
    state.selectedRows.forEach(item => {
        axios.delete(`${BASE_URL}/users/`+item.key);
        setSpin({...state,isDelete:!spin.isDelete})
        fetchUsers();   
        setTimeout(() => {
            notification.open({
                message: 'Delete Done',
                description:
                  'The Selected User is Deleted',
            });   
        },1000)
    });
    
  }

    const updateData = (data) => {
        console.log('thios is test')

        setUsers(data);

    }

    if(users){
        data = users.map(item => item)
    }
  return (
    <div>
      <FilterForm updateData={updateData}/>

      <div className="actions">
          <span>{selectedCount.selected ? selectedCount.selected + ' Selected' : ''} <Divider type="vertical" /></span>
          <Button size='middle'><EditOutlined /></Button>
          <Button size='middle' onClick={handleDelete}><StopOutlined /></Button>
          <Button size='middle'><LockOutlined /></Button>
          <Button size='middle'>Assign To Profile</Button>
          <Button size='middle'>Assign To Group</Button>
          <Button size='middle'><EllipsisOutlined /></Button>
          <h5 onClick={handleClick}>{spin.isLoading ? <Spin></Spin> : ''}Unselect all</h5>
      </div>
      <Table
        rowSelection={{
        selectedRowKeys,
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={{ defaultPageSize: 8}}
      />
    </div>
  );
};

export default Demo;