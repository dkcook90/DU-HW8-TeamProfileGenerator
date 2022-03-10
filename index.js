const {prompt} = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require("fs");
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

const employees = []


//main function
function addEmployee(){
    prompt({
        message: "What do you want to do?",
        type: "list",
        name: "choice",
        choices: ["Add an employee", "Create roster"]
    }).then(data => {
        console.log("YOUR CHOICE --- ", data.choice);
        if(data.choice === "Add an employee"){
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
        }else{
            createHTML()
        }
    })
}

function createHTML(){
    //access the global employees array and create the dynamic HTML!!!
    console.log("CREATING HTML!!!!!");
    console.log("ALL YOUR EMPLOYEES ---- ", employees);

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
        height: 120px;
        padding-top: 80px;
        background: coral;
        text-align: center;
        color: white;
    }
    .container {
        padding: 8em 16em;

    }
    .card {
        box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
        width: 250px;
        height: fit-content;
        border-radius: 1em;
    }

    .card .top {
        background: blueviolet;
        height: 100px;
        padding: 1em;
        border-radius: 1em 1em 0 0;
    }

    .top :first-child {
        color:white;
        font-size: 30px;
    }

    .top :nth-child(2) {
        color: white;
        font-size: 25px;
    }

    .bottom {
        padding: 3em;
        background: grey;
        border-radius: 0 0 1em 1em;
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

    //fs create the html file after html string is created
    fs.writeFileSync("./dist/output.html", html);
    console.log("HTML successfuly created, it is in the /dist directory.")
    //additional code 
}


function main(){
    //step 1 create manager first
    prompt(managerPrompt).then(data => {
        console.log(data);

        //create new manager using information from inquirer
        const manager = new Manager(data.managerName, data.id, data.email, data.officeNumber);
        employees.push(manager);

        //manager created, now ask which type of employee to add
        addEmployee();
    })
}

main();