describe("Blog app", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user = {
            name: "Matti Luukkainen",
            username: "mluukkai",
            password: "salainen"
        };
        cy.request("POST", "http://localhost:3003/api/users/", user); 
        cy.visit("http://localhost:3000");
    });

    it("login form is shown", () => {
        cy.contains("Username");
        cy.contains("Password");
    });

    describe("Login", () => {
        it("succeeds with correct credentials", () => {
            cy.get("input[name='Username']").type("mluukkai");
            cy.get("input[name='Password']").type("salainen");
            cy.contains("login").click();
            cy.contains("You have been succesfully logged in!");

        });

        it("fails with wrong credentials", () => {
            cy.get("input[name='Username']").type("wrongusername");
            cy.get("input[name='Password']").type("worngpasswrod");
            cy.contains("login").click();
            cy.contains("Wrong credentials");
        });
    });

    describe("When Logged in", () => {
        beforeEach(() => {
            cy.login({username: "mluukkai", password:"salainen"});
        });
        it("A blog can be created", function() {
            cy.contains("New Blog").click();

            cy.get("input[name='title']").type("Title");
            cy.get("input[name='author']").type("Author");
            cy.get("input[name='url']").type("google.com");
            cy.contains("Save").click();
            cy.contains("New blog \"Title\" by Author has been added!");
            cy.contains("Title, Author");
        });
        describe("After creating a blog", () => {

            beforeEach(() => {
                cy.addBlog({title: "Title", author: "Author", url: "google.com"});
            });

            it("can like a blog", () => {
                cy.contains("Show").click();
                cy.contains("Like").click();
                cy.contains("Likes: 1");
            });
            it("can delete own blog", () => {
                cy.contains("Show").click();
                cy.contains("Remove").click();
                cy.contains("Title, Author").should("not.exist");
            });
            it("blogs are ordered by the amount of likes", () => {
                cy.contains("Show").click();

                cy.contains("Like").click();
                cy.contains("Likes: 1");
                cy.contains("Like").click();
                cy.contains("Likes: 2");

                cy.addBlog({title: "Title2", author: "Author2", url: "google.com"});
                cy.get(".blog").eq(0).should("contain", "Title, Author");
                cy.get(".blog").eq(1).should("contain", "Title2, Author2");
               
                cy.contains("Title2, Author2").parent().find("button").click();
                
                cy.contains("Like").click();
                cy.contains("Likes: 1");
                cy.contains("Like").click();
                cy.contains("Likes: 2");
                cy.contains("Like").click();
                cy.contains("Likes: 3");

                cy.get(".blog").eq(0).should("contain", "Title2, Author2");
                cy.get(".blog").eq(1).should("contain", "Title, Author");
            });
        });

    });
});