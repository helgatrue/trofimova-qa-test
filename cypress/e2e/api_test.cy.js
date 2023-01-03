context("API tests", () => {

    it("POST /AccountV1UserPost", function () {
        // 1. Negative invalid password
        cy.request({
            method: "POST",
            url: `https://demoqa.com/Account/v1/User`,
            body: {
                "userName": 'Alice10',
                "password": 'ZZqw12'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    });

    it("POST GenerateToken and Authorized and Book Adding", function () {
        // 2. Positive: POST v1/User status code 201
        const userName = makeUsername('6');
        const password = 'ZZqwerty123!';

        cy.request({
            method: "POST",
            url: `https://demoqa.com/Account/v1/User`,
            body: {
                "userName": userName,
                "password": password
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            cy.setCookie('userID', response.body.userID)
        })
        // generate token
        cy.request({
            method: "POST",
            url: 'https://demoqa.com/Account/v1/GenerateToken',
            body: {
                "userName": userName,
                "password": password
            },
        }).then(response => {
            cy.setCookie('token', response.body.token)
        });

        cy.getCookie('token').then($token => {
            const token = $token.value;

            cy.getCookie('userID').then($id => {
                const userId = $id.value
                //3. Positive: /v1/Books add a list of books for the created user
                cy.request({
                    method: "POST",
                    url: `https://demoqa.com/BookStore/v1/Books`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        "userId": userId,
                        "collectionOfIsbns": [
                            {
                                "isbn": "9781449337711"
                            }
                        ]
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(201);
                })
            })
        })
    });

    it("Negative - POST /BookStore/V1/Books", function () {
        // 4. Negative test userId is missed
        cy.request({
            method: "POST",
            url: `https://demoqa.com/BookStore/V1/Books`,
            body: {
                "collectionOfIsbns": [
                    {
                        "isbn": "9781449337711"
                    }
                ]
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        })
    });

    it("DELETE BookStore/v1/Books Remove one of the added books", function () {
        // 5. Positive: Remove one of the added books
        const userName = makeUsername('6');
        const password = 'ZZqwerty123!';

        cy.request({
            method: "POST",
            url: `https://demoqa.com/Account/v1/User`,
            body: {
                "userName": userName,
                "password": password
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            cy.setCookie('userID', response.body.userID)
        })
        // generate token
        cy.request({
            method: "POST",
            url: 'https://demoqa.com/Account/v1/GenerateToken',
            body: {
                "userName": userName,
                "password": password
            },
        }).then(response => {
            cy.setCookie('token', response.body.token)
        });

        cy.getCookie('token').then($token => {
            const token = $token.value;
            cy.getCookie('userID').then($id => {
                const userId = $id.value
                cy.request({
                    method: "POST",
                    url: `https://demoqa.com/BookStore/v1/Books`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        "userId": userId,
                        "collectionOfIsbns": [
                            {
                                "isbn": "9781449337711"
                            }
                        ]
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(201);
                })
                cy.request({
                    method: "DELETE",
                    url: `https://demoqa.com/BookStore/v1/Book`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        "isbn": "9781449337711",
                        "userId": userId
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(204);
                })

                // 6. Negative: Cannot Remove already removed book
                cy.request({
                    method: "DELETE",
                    url: `https://demoqa.com/BookStore/v1/Book`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: {
                        "isbn": "9781449337711",
                        "userId": userId
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    expect(response.status).to.eq(400);
                })
            })
        })
    });

    function makeUsername(length) {
        // create random data for username
        let result = '';
        let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < length; i++) {
            result += abc.charAt(Math.floor(Math.random() * abc.length));
        }
        return result;
    }
})