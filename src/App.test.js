// Global data for tests.
let employees;
let skillList;

// Runs once before tests, here global test data is initialised.
beforeAll(async () => {

    skillList = [
        {fullname: "Mark Huang", email: "mark.huang@gmail.com", skillList: "", proficiency: "beginner"},
        {fullname: "Peter Liu", email: "peter.liu@gmail.com", skillList: "", proficiency: "advance"}
    ];

    employees = [
        {fullname: "Mark Huang", email: "mark.huang@gmail.com", skillList: skillList[0], proficiency: "beginner"},
        {fullname: "Peter Liu", email: "peter.liu@gmail.com", skillList: skillList[1], proficiency: "advance"}
    ];

});
