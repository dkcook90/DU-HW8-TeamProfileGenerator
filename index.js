// importing all of our classes from the other js files in lib
const {prompt} = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
// creating an array of questions for the first prompt, our manager prompt
const managerPrompt = [
    {
        message: "What is the manager's name?",
        name: "managerName",
        type: "input"
    }, 
    {
        message: "What is the manager's id number?",
        name: "id",
        type: "input"
    },
    {
        message: "What is the manager's email?",
        name: "email",
        type: "input"
    },
    {
        message: "What is the manager's office number?",
        name: "officeNumber",
        type: "input"
    }
];
// array of questions for our employee classes after manager questions (engineer and intern), this is ran when the user chooses to add another employee
const employeePrompt = [
    {
        message: "What is the role of the employee you want to add?",
        name: "role",
        type: "list",
        choices: ["Engineer", "Intern"]
    }, 
    {
        message: (answers)=> `What is the name of the ${answers.role}?`,
        name: "name",
    }, {
        message: (answers)=> `What is the id of the ${answers.role}?`,
        name: "id",
    },
    {
        message: (answers)=> `What is the email of the ${answers.role}?`,
        name: "email",
    }, 
    {
        message: (answers)=> {
            if(answers.role === 'Engineer') return 'What is the github name of the engineer?'
            return 'What is the school this intern graduated from?'
        },
        name: "extra",
    }
]
// empty array that we will push all of the employees to after they are built using our main function addEmployee()
const employees = []


//our main function that runs after setting up the manager, this will allow the user to either add another employee or creat the roster and run the HTML
function addEmployee(){
    prompt({
        message: "What do you want to do?",
        type: "list",
        name: "choice",
        choices: ["Add an employee", "Create roster"]
    }).then(data => {
        console.log("YOUR CHOICE --- ", data.choice);
        if(data.choice === "Add an employee"){
            // if the user chooses to add another employee, then the employeePrompt is run from line 31
            prompt(employeePrompt)
            .then(data => {
                console.log("answers for employee --- ", data);
                if(data.role === "Engineer"){
                    const emp = new Engineer(data.name, data.id, data.email, data.extra);
                    employees.push(emp)
                }else{
                    const emp = new Intern(data.name, data.id, data.email, data.extra);
                    employees.push(emp)
                }

                console.log(`${data.role} added to team!`);
                setTimeout(addEmployee, 1500);
            })
        // if the user chooses to create roser, then createHTML() is ran, this will create the main page for our employees
        }else{
            createHTML()
        }
    })
}
// the main funtion that creates the html file that holds our roster
function createHTML(){
    console.log("Writing HTML now...");
    console.log("You have entered ---", employees);

    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Manager</title>
</head>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    h1 {
        height: 85px;
        padding-top: 46px;
        background: #1c0968;
        text-align: center;
        color: white;
    }
    .container {
        padding: 3em 9em;
        display: flex;
        justify-content: space-evenly;

    }
    .card {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        width: 250px;
        height: fit-content;
        border-radius: 1em;
    }

    .card .top {
        background: #660d0d;
        height: 71px;
        padding: 1em;
        border-radius: 1em 1em 0 0;
        text-align: center;
    }

    .top :first-child {
        color: white;
        font-size: 30px;
        margin: 5px;
    }

    .top :nth-child(2) {
        color: white;
        font-size: 25px;
        font-style: italic;
    }

    .bottom {
        padding: 1em;
        background: grey;
        border-radius: 0 0 0em 1em;
        height: fit-content;
    }
    .bottom ul {
        list-style: none;
        text-align: center;
    }
    .bottom ul li {
        width: 100%;
        background: white;
        border: 1px solid darkgreen;
        padding: 10px 0px;
    }
</style>
<body>
    <h1>EMPLOYEE MANAGER</h1>
    <div class="container">
        ${employees.map(employee => employee.generateHTMLCard(employee.officeNumber || employee.github || employee.school)).join("\n")}
    </div>
</body>
</html>
    `

    //after the html is created, this will write it to the dist folder
    fs.writeFileSync("./dist/output.html", html);
    console.log("HTML successfuly created, it is in the /dist directory.") 
}

// our main function that starts the manager prompts for the user, then creates the manager object and pushed that object to the empty employees array
function main(){
    prompt(managerPrompt).then(data => {
        console.log(data);

        const manager = new Manager(data.managerName, data.id, data.email, data.officeNumber);
        employees.push(manager);

        // after the manager is created, this fuction is called that will ask the user to add more employees or create the roster and write the html
        addEmployee();
    })
}

main();