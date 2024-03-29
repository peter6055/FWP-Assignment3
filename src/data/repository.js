/**
 * @author Shih-ming Liu <s3789585@student.rmit.edu.au>
 */
import {v4 as uuidv4} from 'uuid';

/**
 * @global
 * @description Key of localstorage
 */
const EMPLOYEE_KEY = "employees";


/**
 * Function to initialize local storage dataset
 *
 * @function
 * @param {string} result Result to notify (success/error/warning)
 * @param {string} msg Message to display
 * @returns {null} when item exist on localStorage
 */
function initStorage() {
    // Stop if data is already initialised.
    if (localStorage.getItem(EMPLOYEE_KEY) !== null)
        return null;

    // new empty storage
    const users = [];

    // Set data into local storage.
    localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(users));
}


/**
 * Get all employee from localStorage
 *
 * @function
 * @returns {Map} exist user data
 */
function getEmployee() {
    // Extract user data from local storage.
    const data = localStorage.getItem(EMPLOYEE_KEY);

    // Convert data to objects.
    return JSON.parse(data);
}


/**
 * Get create employee and store it to localStorage
 *
 * @function
 * @param {string} fullname employee's fullname
 * @param {string} email employee's email
 * @param {Map} skillList employee's skillList
 * @param {string} proficiency employee's proficiency (beginner, intermediate, advanced)
 * @returns {Map} user data
 */
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


/**
 * Get unique ID (uuid)
 *
 * @function
 * @returns {string} UUID V4
 */
function generateId() {
    return uuidv4();
}


export {
    initStorage,
    createEmployee,
    getEmployee
}