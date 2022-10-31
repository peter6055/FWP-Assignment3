import {v4 as uuidv4} from 'uuid';

const EMPLOYEE_KEY = "employees";

// init storage
function initStorage() {
    // Stop if data is already initialised.
    if (localStorage.getItem(EMPLOYEE_KEY) !== null)
        return;

    // new empty storage
    const users = [];

    // Set data into local storage.
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(users));
}


// get all employees
function getEmployee() {
    // Extract user data from local storage.
    const data = localStorage.getItem(EMPLOYEE_KEY);

    // Convert data to objects.
    return JSON.parse(data);
}


// create employees
function createEmployee(fullname, email, skillList, proficiency) {
    // generate employee json
    const employee =
        {
            id: generateId(),
            fullname: fullname,
            email: email,
            skillList: skillList,
            proficiency: proficiency
        };

    // get exist employees
    const existEmployee = getEmployee();

    // push the newly added employee to exist employees data set
    existEmployee.push(employee);

    // upload to localstorage
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(existEmployee));

    return employee;
}


function generateId() {
    return uuidv4();
}


export {
    initStorage,
    createEmployee,
    getEmployee
}