// here is our constructor class, this base class will used to invoke the 'super' method to build the other classes
class Employee {
    constructor(name, id, email, role = "Employee"){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }
    //the following functions will retrieve the name, id, email, etc. of our classes
    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email
    }

    getRole(){
        return this.role
    }
    // this funciton is called in the generateHTML() funciton in the index.js file, this will create a new card or div for each employee for the main HTML page
    generateHTMLCard(extra){
        return `
        <div class="card">
            <div class="top">
                <div>${this.name}</div>
                <div>${this.role}</div>
            </div>
            <div class="bottom">
                <ul>
                    <li>ID: ${this.id}</li>
                    <li>Email: <a href="mailto:${this.email}">${this.email}</a></li>
                    ${this.role === "Manager" ? 
                    `<li>Office Number: ${extra}</li>` : 
                    this.role === "Engineer" ? 
                    `<li>Github Account: ${extra}</li>` : 
                    `<li>University Attended: ${extra}</li>`
                }
                </ul>
            </div>
        </div>
        `
    }
}

module.exports = Employee;