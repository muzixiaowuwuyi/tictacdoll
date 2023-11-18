describe('My First Test', () => {
  it("Doesn't really do anything", () => {
    cy.visit('http://localhost:5173');

    cy.contains('Tic Tac Doll');

    cy.contains('Start Game').click();
    cy.url().should('include', '/game');

    cy.get('.GameCanvas')
  });
});
