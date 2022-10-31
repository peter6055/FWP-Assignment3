import {createEmployee, initStorage, getEmployee} from "./data/repository";


// Global data for tests.
let response;
let employees;
let skillListSample;

// Runs once before tests, here global test data is initialised.
beforeAll(async () => {
    skillListSample = [
        {
            skillList: [
                {id: 0, skill: "Cloud computing", year: "2"},
                {id: 0, skill: "Software on Java", year: "4"},
                {id: 0, skill: "Cloud Security", year: "6"},
                {id: 0, skill: "React and Vue", year: "2"},
                {id: 0, skill: "Devops", year: "10"}
            ]
        },
        {
            skillList: [
                {id: 0, skill: "Google Cloud", year: "5"},
                {id: 0, skill: "Sprintboot", year: "8"},
                {id: 0, skill: "Cloud devops", year: "3"},
                {id: 0, skill: "React", year: "12"},
                {id: 0, skill: "Networking", year: "15"}
            ]
        }
    ];

    employees = [
        {
            fullname: "Mark Huang",
            email: "mark.huang@gmail.com",
            skillList: skillListSample[0],
            proficiency: "beginner"
        },
        {
            fullname: "Peter Liu",
            email: "peter.liu@gmail.com",
            skillList: skillListSample[1],
            proficiency: "advance"
        }
    ];

});

// Runs before every test
beforeEach(async () => {
    // reset storage
    localStorage.clear();

    // renew storage
    await initStorage()
});


// test user been successfully created and generate expect json inside create employee method
test("Create Employee", async () => {
    // test the input value and the output confirmation are the same
    response = createEmployee(employees[0]["fullname"], employees[0]["email"], employees[0]["skillList"], employees[0]["proficiency"]);
    expect(response.fullname).toBe(employees[0].fullname);
    expect(response.email).toBe(employees[0].email);
    expect(response.skillList).toBe(employees[0].skillList);
    expect(response.proficiency).toBe(employees[0].proficiency);

    // test the input value and the output confirmation are the same second user
    response = createEmployee(employees[1]["fullname"], employees[1]["email"], employees[1]["skillList"], employees[1]["proficiency"]);
    expect(response.fullname).toBe(employees[1].fullname);
    expect(response.email).toBe(employees[1].email);
    expect(response.skillList).toBe(employees[1].skillList);
    expect(response.proficiency).toBe(employees[1].proficiency);
});


// test exist user getUser from localstorage
test("Get Employee", async () => {
    // follow the same pattern to create employee to ensure this test isn't dependent on the previous one
    response = createEmployee(employees[0]["fullname"], employees[0]["email"], employees[0]["skillList"], employees[0]["proficiency"]);
    response = createEmployee(employees[1]["fullname"], employees[1]["email"], employees[1]["skillList"], employees[1]["proficiency"]);

    // fetch data from localstorage
    const employeesResult = getEmployee();

    // start to check is the prepared data same as localstorage data
    for (let countEmployee = 0; countEmployee < employees.length; countEmployee++) {

        // test fullname, skill and proficiency
        expect(employees[countEmployee]["fullname"]).toBe(employeesResult[countEmployee]["fullname"]);
        expect(employees[countEmployee]["email"]).toBe(employeesResult[countEmployee]["email"]);
        expect(employees[countEmployee]["proficiency"]).toBe(employeesResult[countEmployee]["proficiency"]);

        // test skill set
        for (let countEmployeeSkillSet = 0; countEmployeeSkillSet < employees[countEmployee]["skillList"]["skillList"].length; countEmployeeSkillSet++) {
            // convert to string and test
            expect(JSON.stringify(employees[countEmployee]["skillList"]["skillList"][countEmployeeSkillSet])).toBe(JSON.stringify(employeesResult[countEmployee]["skillList"]["skillList"][countEmployeeSkillSet]));
        }
    }

});