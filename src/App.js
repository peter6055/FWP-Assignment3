import './App.css';
import 'antd/dist/antd.css';
import {Button, Card, Input, Layout, Radio} from "antd";
import {UserOutlined, MailOutlined, EditOutlined} from '@ant-design/icons';
import React, {useState} from 'react';


const {Header, Content, Footer} = Layout;


function App() {

    const [proficiency, setProficiency] = useState(0);
    const proficiencyOnChange = (e) => {
        console.log('radio checked', e.target.value);
        setProficiency(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    return (
        <Layout className="layout">
            <Header>
                <h1 style={{color: "rgb(255 255 255 / 85%)"}}>Employee System</h1>
            </Header>
            <Content
                style={{
                    padding: '0 50px',
                    margin: '16px 0'
                }}
            >
                <div className="site-layout-content">Employee Management</div>
                <div className={"content"}>
                    <Card
                        title="Create Employee"
                        bordered={false}
                        style={{
                            width: 800,
                        }}
                        size="small"
                    >
                        <div className={"ant-card-body-inner"}>
                            <label>Full Name</label>
                            <Input placeholder="Full Name (Firstname Lastname)" style={{"marginTop": "10px"}}
                                   prefix={<UserOutlined/>}/>
                            <br/><br/><br/>


                            <label>Email</label>
                            <Input placeholder="Email" style={{"marginTop": "10px"}} prefix={<MailOutlined/>}/>
                            <br/><br/><br/>


                            <label>Skill</label><br/>
                            <div className={"skill-collection"} style={{"marginTop": "10px"}}>
                                <Input placeholder="Name" style={{"marginRight": "20px"}}
                                       prefix={<EditOutlined/>}/>
                                <Input placeholder="Experience in Years" style={{"marginRight": "20px"}}
                                       prefix={<EditOutlined/>}/>
                            </div>
                            <Button type="dashed" style={{"marginTop": "10px"}}>Add skill</Button>
                            <br/><br/><br/>


                            <label>Proficiency</label><br/>
                            <Radio.Group onChange={proficiencyOnChange} value={proficiency}
                                         className={"proficiency-collection"}
                                         style={{"marginTop": "10px"}}>
                                <Radio value={"beginner"}>Beginner</Radio>
                                <Radio value={"intermediate"}>Intermediate</Radio>
                                <Radio value={"advanced"}>Advanced</Radio>
                            </Radio.Group>
                            <br/><br/><br/>
                        </div>


                        <div className={"ant-card-footer-inner"}>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </div>

                    </Card>
                </div>


            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                FWP A3 ©2022 Created by Shih-ming Liu
            </Footer>
        </Layout>
    );
}

export default App;
