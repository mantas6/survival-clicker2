// https://docs.cypress.io/api/introduction/api.html

describe('Application', () => {
  it('boots up fully', () => {
    cy.visit('/')
    cy.contains('span', 'Survival')
    cy.contains('a', 'Jobs')
  })
})
