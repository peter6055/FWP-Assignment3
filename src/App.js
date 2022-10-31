import './App.css';
import 'antd/dist/antd.css';
import {Button, Card, Input, Layout, Radio, Table} from "antd";
import {UserOutlined, MailOutlined, EditOutlined} from '@ant-design/icons';
import React, {useReducer, useState} from 'react';
import {initialState, reducer} from "./data/skill.reducer.js";

const {Header, Content, Footer} = Layout;


function App() {
    // ------------------------------------------------------------------- skill ------------------------
    // skill name field tracking
    const [skill, setSkill] = useState("");
    const skillOnChange = (e) => {
        setSkill(e.target.value);
    };

    // skill year field tracking
    const [year, setYear] = useState(null);
    const yearOnChange = (e) => {
        setYear(e.target.value);
    };

    // reducer controller
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddSkill = async (event) => {
        event.preventDefault();

        // call reducer
        dispatch({type: 'add', skill: skill, year: year})

        // when finish clear skill and
        setSkill("");
        setYear(null);
    }

    const handleRemoveSkill = async (event) => {
        event.preventDefault();

        const id = event.target.closest("button").value;

        // call reducer
        dispatch({type: 'remove', id: id})
    }

    // skill table
    const columns = [
        {
            title: 'Skill Name',
            dataIndex: 'skill',
            key: 'skill',
        },
        {
            title: 'Year of Experience',
            dataIndex: 'year',
            key: 'year',
            render: (text) => <span>{text} year(s)</span>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <Button type="primary" value={text} onClick={handleRemoveSkill}>Remove</Button>,
        }
    ];

    // ----------------------------------------------------------------- proficiency selection ----------------------
    const [proficiency, setProficiency] = useState(0);
    const proficiencyOnChange = (e) => {
        console.log('radio checked', e.target.value);
        setProficiency(e.target.value);
    };

    // ----------------------------------------------------------------- form submission ----------------------
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(state);
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
                                       prefix={<EditOutlined/>} value={skill} onChange={skillOnChange}/>
                                <Input placeholder="Experience in Years" style={{"marginRight": "20px"}}
                                       prefix={<EditOutlined/>} value={year} onChange={yearOnChange}/>
                            </div>
                            <Button
                                type="dashed"
                                style={{"marginTop": "10px"}}
                                onClick={handleAddSkill}
                            >
                                Add skill
                            </Button>
                            <br/><br/>
                            <Table columns={columns} dataSource={state.skillList}/>
                            <br/><br/>


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
                            <Button type="primary" htmlType="submit" onClick={handleSubmit}>Submit</Button>
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
