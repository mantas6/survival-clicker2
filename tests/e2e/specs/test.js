// https://docs.cypress.io/api/introduction/api.html

describe('General', () => {
  it('Application boots up fully', () => {
    cy.visit('/')
    cy.contains('span', 'Survival')
    cy.contains('a', 'Jobs')
  })
})
