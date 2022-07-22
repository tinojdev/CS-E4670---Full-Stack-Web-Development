describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user = {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen"
        };
        cy.request("POST", "http://localhost:3001/api/users/", user); 
        cy.visit("http://localhost:3000");
    });

    it("login form is shown", () => {
        cy.visit("https://localhost:3000");
        cy.contains();
    });
    it("front page can be opened", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Notes");
        cy.contains("Note app, Department of Computer Science, University of Helsinki 2022");
    });
});