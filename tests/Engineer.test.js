const Engineer = require("../lib/Engineer");

describe("Testing engineer class", ()=> {
    it("should have a github property when instantiated with the github parameter", ()=> {
        const name = "Megan";
        const id = 25;
        const email = "Megan@mail.com";
        const github = "MegansGitHub";

        const emp = new Engineer(name, id, email, github);
        expect(emp.github).toEqual(github);
    })

    it("Should return the github property when getGithub method is invoked", ()=> {
        const name = "Megan";
        const id = 25;
        const email = "Megan@mail.com";
        const github = "MegansGitHub";

        const emp = new Engineer(name, id, email, github);
        expect(emp.getGithub()).toEqual(github);
    })

    it("Should return 'Engineer' when the getRole method is invoked", ()=> {
        const name = "Megan";
        const id = 25;
        const email = "Megan@mail.com";
        const github = "MegansGitHub";

        const emp = new Engineer(name, id, email, github);
        expect(emp.getRole()).toEqual("Engineer");
    })
})