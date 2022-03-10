const Intern = require("../lib/Intern");

describe("Testing intern class", ()=> {
    it("should have a school property when instantiated with the school parameter", ()=> {
        const name = "Travis";
        const id = 10;
        const email = "Travis@mail.com";
        const school = "Denver University";

        const emp = new Intern(name, id, email, school);
        expect(emp.school).toEqual(school);
    })

    it("Should return the school property when getschool method is invoked", ()=> {
        const name = "Travis";
        const id = 10;
        const email = "Travis@mail.com";
        const school = "Denver University";

        const emp = new Intern(name, id, email, school);
        expect(emp.getSchool()).toEqual(school);
    })

    it("Should return 'Intern' when the getRole method is invoked", ()=> {
        const name = "Travis";
        const id = 10;
        const email = "Travis@mail.com";
        const school = "Denver University";

        const emp = new Intern(name, id, email, school);
        expect(emp.getRole()).toEqual("Intern");
    })
})