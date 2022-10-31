/**
 * @author Shih-ming Liu <s3789585@student.rmit.edu.au>
 */

import './App.css';
import 'antd/dist/antd.css';
import {Alert, Button, Card, Input, Layout, Radio, Table, message} from "antd";
import {UserOutlined, MailOutlined, EditOutlined} from '@ant-design/icons';
import React, {useEffect, useReducer, useState} from 'react';
import {initialState, reducer} from "./data/skill.reducer.js";
import {createEmployee, initStorage} from "./data/repository";

const {Header, Content, Footer} = Layout;

/**
 * Function for displaying message
 *
 * @function
 * @param {string} result Result to notify (success/error/warning)
 * @param {string} msg Message to display
 */
const popMessage = (result, msg) => {
    // eslint-disable-next-line default-case
    switch (result) {
        case "success":
            message.success(msg);
            break;

        case "error":
            message.error(msg);
            break;

        case "warning":
            message.warning(msg);
            break;
    }
};

function App() {
    // init the storage in the first place
    initStorage()

    // ------------------------------------------------------------------- Form input tracking ------------------------
    // fullName field tracking
    const [fullname, setFullname] = useState("");
    const fullnameOnChange = (e) => {
        setFullname(e.target.value);
    };

    // email field tracking
    const [email, setEmail] = useState("");
    const emailOnChange = (e) => {
        setEmail(e.target.value);
    };

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

    // proficiency field tracking
    const [proficiency, setProficiency] = useState("");
    const proficiencyOnChange = (e) => {
        setProficiency(e.target.value);
    };

    // status tracking
    const [nameStatus, setNameStatus] = useState("");
    const nameStatusToClass = (nameStatus ? "has-error" : "")

    const [emailStatus, setEmailStatus] = useState("");
    const emailStatusToClass = (emailStatus ? "has-error" : "");

    // error message for name and year separately
    const [skillNameStatus, setSkillNameStatus] = useState("");
    const [skillYearStatus, setSkillYearStatus] = useState("");

    // error light up for name and year separately
    const skillNameStatusToClass = (skillNameStatus ? "has-error" : "");
    const skillYearStatusToClass = (skillYearStatus ? "has-error" : "");

    // release add button
    const [addBtnStatus, setAddBtnStatus] = useState(true);
    // count release button useEffect run, to stop it running at first time
    // set to zero once add clicked
    const [releaseBtnUseEffectCount, setReleaseBtnUseEffectCount] = useState(0);

    // check when to release add button
    useEffect(() => {
        // don't run when no input action (first time)
        if (releaseBtnUseEffectCount > 0) {
            // clear all validation regards skill when entering
            setSkillNameStatus("");
            setSkillYearStatus("");
            setSkillStatus("");

            // use to solve no callback useState issues of setSkillNameStatus, setSkillYearStatus, and setSkillStatus
            let hasError = false;

            // data validation
            if (skill === "" || skill.length > 20) {
                setSkillNameStatus("Please fill in the skill (Should be less then 20 characters)");
                setSkillStatus("error");
                hasError = true;
            }

            if (year === null || year > 20 || year < 1 || year % 1 !== 0) {
                setSkillYearStatus("Year of experience field should be 1-20 (whole number)");
                setSkillStatus("error");
                hasError = true;
            }

            // there are value inside input and with no error
            if (skill != "" && year != "" && hasError === false) {
                setAddBtnStatus(false);
            } else {
                setAddBtnStatus(true);
            }
        }
        // start from the second round
        setReleaseBtnUseEffectCount(releaseBtnUseEffectCount + 1);
    }, [skill, year]);


    // error light up for skill collection label
    const [skillStatus, setSkillStatus] = useState("");
    const skillStatusToClass = (skillStatus ? "has-error" : "")

    const [proficiencyStatus, setProficiencyStatus] = useState("");
    const proficiencyStatusToClass = (proficiencyStatus ? "has-error" : "")


    // ----------------------------------------------------------------- submission  ----------------------
    const handleSubmit = async (event) => {
        event.preventDefault();

        // track is there any error
        let hasError = false;

        // clear error check and error message first
        setNameStatus("");
        setEmailStatus("");
        setProficiencyStatus("");


        // start validation
        // ------- name regex check (format and not empty) -------
        const fullnameRegex = new RegExp("^[A-Z]{1}[a-zA-Z]{1,50}\\s[A-Z]{1}[a-zA-Z]{1,50}(-[a-zA-Z]{1,50})?$");
        if (!fullnameRegex.test(fullname)) {
            setNameStatus("Please fill in your full name with the format (Firstname Lastname) case sensitive");
            hasError = true;

        } else if (fullname.length > 60) {
            setNameStatus("Name shouldn't have more than 60 characters");
            hasError = true;
        }

        // ------- email -------
        // regex check (format and not empty)
        const emailRegex = new RegExp("^[a-z0-9]+(?!.*(?:\\+{2,}|\\-{2,}|\\.{2,}))(?:[\\.+\\-]{0,1}[a-z0-9])*@gmail\\.com$");
        if (!emailRegex.test(email)) {
            setEmailStatus("Please fill in your email with format (firstname.lastname@gmail.com)");
            hasError = true;
        }

        // check email fit firstname.lastname (toLowerCase ensure case won't impact the result)
        const splitName = fullname.toLowerCase().split(" "); // fullname: cut it to firstname, lastname
        const splitEmail = email.toLowerCase().split("@"); // email: cut it to firstname.lastname, gmail.com
        const splitEmailToName = splitEmail[0].split(".") // email: then cut it to firstname, lastname
        if (!(splitName[0] === splitEmailToName[0] && splitName[1] === splitEmailToName[1])) {
            setEmailStatus("Please fill in your email with format (firstname.lastname@gmail.com)");
            hasError = true;
        }


        // ------- proficiency should be one of the option -------
        if (!(proficiency === "beginner" || proficiency === "intermediate" || proficiency === "advanced")) {
            setProficiencyStatus("Please select proficiency");
            hasError = true;
        }


        // ------- at least one skill -------
        if (state.skillList.length === 0) {
            setSkillStatus("Please fill in at least one skill");
            hasError = true;
        }

        // store to database when there are no error
        if (hasError === false) {
            createEmployee(fullname, email, state.skillList, proficiency);
            popMessage("success", "Employee added successfully!")

            // --- cleanup ---
            // status
            setNameStatus("");
            setEmailStatus("");
            setProficiencyStatus("");
            setSkillNameStatus("");
            setSkillYearStatus("");
            setSkillStatus("");

            // input
            setFullname("");
            setEmail("");
            setSkill("");
            setYear("");
            setProficiency("");

            // release btn count
            setReleaseBtnUseEffectCount(0);
            dispatch({type: 'clearall'})
        }
    }


    // ------------------------------------------------------------------- skill ------------------------
    // reducer controller
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddSkill = async (event) => {
        event.preventDefault();

        // call reducer
        dispatch({type: 'add', skill: skill, year: year})

        // clear input
        setSkill("");
        setYear(null);
        setReleaseBtnUseEffectCount(0);

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
            render: (text) => <Button danger value={text} onClick={handleRemoveSkill}>Remove</Button>,
        }
    ];


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
                            <div className={nameStatusToClass}>
                                <label>Full Name</label>
                                <Input placeholder="Full Name (Firstname Lastname)"
                                       style={{"marginTop": "10px"}}
                                       prefix={<UserOutlined/>}
                                       onChange={fullnameOnChange}
                                       value={fullname}/>
                                <br/>
                                {nameStatus !== "" && <Alert message={nameStatus} type="error" showIcon/>}
                                <br/><br/>
                            </div>

                            <div className={emailStatusToClass}>
                                <label>Email</label>
                                <Input placeholder="Email" style={{"marginTop": "10px"}}
                                       prefix={<MailOutlined/>}
                                       onChange={emailOnChange}
                                       value={email}/>
                                <br/>
                                {emailStatus !== "" && <Alert message={emailStatus} type="error" showIcon/>}
                                <br/><br/>
                            </div>


                            <div className={skillStatusToClass}>
                                <label>Skill</label><br/>
                                <div className={"skill-collection"} style={{"marginTop": "10px"}}>
                                    <div className={skillNameStatusToClass}>
                                        <Input placeholder="Name"
                                               prefix={<EditOutlined/>} value={skill}
                                               onChange={skillOnChange}/>
                                        {skillNameStatus !== "" &&
                                            <span>{skillNameStatus}</span>}

                                    </div>
                                    <div className={skillYearStatusToClass}>
                                        <Input placeholder="Experience in Years"
                                               prefix={<EditOutlined/>} value={year}
                                               onChange={yearOnChange}/>
                                        {skillYearStatus !== "" &&
                                            <span>{skillYearStatus}</span>}

                                    </div>


                                </div>
                                {skillStatus === "Please fill in at least one skill" &&
                                    <Alert message={skillStatus} type="error" showIcon/>}
                                <Button
                                    type="dashed"
                                    style={{"marginTop": "10px"}}
                                    onClick={handleAddSkill}
                                    disabled={addBtnStatus}
                                >
                                    Add a new skill
                                </Button>
                                <br/><br/>
                                <Table columns={columns} dataSource={state.skillList}
                                       locale={{emptyText: 'Please add your skill using the above inputs field and button'}}/>

                                <br/><br/>
                            </div>

                            <div className={proficiencyStatusToClass}>
                                <label>Proficiency</label><br/>
                                <Radio.Group onChange={proficiencyOnChange} value={proficiency}
                                             className={"proficiency-collection " + proficiencyStatusToClass}
                                             style={{"marginTop": "10px"}}>
                                    <Radio value={"beginner"}>Beginner</Radio>
                                    <Radio value={"intermediate"}>Intermediate</Radio>
                                    <Radio value={"advanced"}>Advanced</Radio>
                                </Radio.Group>
                                <br/>
                                {proficiencyStatus !== "" && <Alert message={proficiencyStatus} type="error" showIcon/>}
                                <br/><br/>
                            </div>

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
