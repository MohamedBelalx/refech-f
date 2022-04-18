import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Row, Col, Avatar, Divider,Badge,Input } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MailOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  DropboxOutlined,
  SearchOutlined
} from '@ant-design/icons';
import Demo from './Table';
import Add from './Add'
const { Header, Sider, Content } = Layout;
const { SubMenu,ItemGroup } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  
  date = new Date();

  formatAMPM = () => {
    const date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  render() {
    return (
      <Layout style={{height:"100vh"}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="256">
          <div className="logo" />
          <Menu 
            theme="dark" mode="inline" 
            defaultSelectedKeys={['5']}
            defaultOpenKeys={['sub3']}
            inlineCollapsed={this.state.collapsed}
          >
            <div className='nav-resource'>
                <Input size="large" placeholder="default size" prefix={<SearchOutlined />} />
                <p><DropboxOutlined /> DashBoard</p>
            </div>

            <SubMenu key="sub1" icon={<MailOutlined />} title="ATM settings">
                <Menu.Item key="15">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<MailOutlined />} title="Business Setup">
                <Menu.Item key="2">Option 5</Menu.Item>
                <Menu.Item key="16">Option 6</Menu.Item>
                <Menu.Item key="17">Option 7</Menu.Item>
                <Menu.Item key="18">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<UserOutlined />} title="User Management">
                <Menu.Item key="5">Users</Menu.Item>
                <Menu.Item key="36">Profile</Menu.Item>
                <Menu.Item key="37">Groups</Menu.Item>
            </SubMenu>
            <Menu.Item key="1">
              License Management
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
              <Row justify='space-between'>
                  <Col span={12}>
                    <Row>
                        <Col span={2}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}

                        </Col>
                        <Col>
                            <h4 className='date'>Good Morning! {this.date.toLocaleDateString("en-US", this.options)} {this.formatAMPM()}</h4>
                        </Col>
                    </Row>
                  </Col>
                  <Col span={6}>
                    <Menu mode="horizontal">
                        <Menu.Item key="mail">
                            <QuestionCircleOutlined style={{fontSize:20}} />
                        </Menu.Item>
                        <Menu.Item key="alipay">
                            <Badge count={99} overflowCount={9} size="small">
                                <BellOutlined style={{fontSize:20}} />
                            </Badge>
                        </Menu.Item>
                        <SubMenu key="sub3" icon={<Divider type="vertical" />} title={<span>Nader Amir <Avatar size={25}>NA</Avatar><DownOutlined style={{fontSize:10}} /></span>}>
                            <ItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </ItemGroup>
                            <ItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </ItemGroup>
                        </SubMenu>
                    </Menu>
                  </Col>
              </Row>
          </Header>

          <div style={{ margin: '16px' }} className='modal'>
              <Row justify='space-between'>
                  <Col>
                    <h1>User Management</h1>
                  </Col>
                  <Col>
                    <Add/>
                  </Col>
              </Row>
          </div>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Demo/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;