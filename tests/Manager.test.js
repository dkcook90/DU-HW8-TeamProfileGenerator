const Manager = require("../lib/Manager");

describe("Testing the manager class ", ()=> {
    it("should have a officeNumber property when instantiated with the officeNumber parameter", ()=> {
        const name = "Don";
        const id = 19;
        const email = "Don@mail.com";
        const officeNumber = 1337;

        const emp = new Manager(name, id, email, officeNumber);
        expect(emp.officeNumber).toEqual(officeNumber);
    })

    it("Should return the officeNumber property when getofficeNumber method is invoked", ()=> {
        const name = "Don";
        const id = 19;
        const email = "Don@mail.com";
        const officeNumber = 1337;

        const emp = new Manager(name, id, email, officeNumber);
        expect(emp.getOfficeNumber()).toEqual(officeNumber);
    })

    it("Should return 'Manager' when the getRole method is invoked", ()=> {
        const name = "Don";
        const id = 19;
        const email = "Don@mail.com";
        const officeNumber = 1337;

        const emp = new Manager(name, id, email, officeNumber);
        expect(emp.getRole()).toEqual("Manager");
    })
})