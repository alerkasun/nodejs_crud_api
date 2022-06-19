describe('user spec', () => {
  it('check non-uuid param', () => {
    {
      cy.request({
        method: "GET",
        url: "http://localhost:3000/api/users/qwe",
        failOnStatusCode: false,
      }).as('uuid')
      cy.get('@uuid').its('status')
        .should('equal', 400)
    }
  })

  it('check all users param', () => {
    cy.request('http://localhost:3000/api/users').as('all_users')
    cy.get('@all_users').its('status')
      .should('equal', 200)
  })

  it('check random uuid param', () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/api/users/14f9301e-8f41-40c4-9dc5-7f28fdd77b85",
      failOnStatusCode: false,
    }).as('random')
    cy.get('@random').its('status')
      .should('equal', 404)
  })
})


