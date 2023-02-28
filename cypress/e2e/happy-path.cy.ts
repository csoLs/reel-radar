/// <reference types="cypress" />

describe('Happy path', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/reel-radar/')
    
    // clearLocalStorage() yields the localStorage object
    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem('watchLater')).to.be.null
      expect(ls.getItem('favorite')).to.be.null
    })
  })

  it('.type() - type into a DOM element', () => {
    cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie*').as('searchMovie')
    cy.intercept('GET', 'https://api.themoviedb.org/3/movie/*').as('getMovie')
    cy.wait('@searchMovie').its('response.statusCode').should('be.oneOf', [200, 304])

    // https://on.cypress.io/type
    cy.get('.searchInput')
      .type('Sweeney Todd: The Demon barber')
      .should('have.value', 'Sweeney Todd: The Demon barber')
    
    // https://on.cypress.io/location
    cy.location().should((location) => {
      expect(location.search).to.eq(`?q=Sweeney+Todd%3A+The+Demon+barber`)
    })
  
    // wait for api to finish loading
    // https://on.cypress.io/wait
    cy.wait('@searchMovie').its('response.statusCode').should('be.oneOf', [200, 304])

    // Assert title of first search result, this might be a bad idea since it's controlled by API :-)
    cy.get('[data-test="movie"] h3').first().should('have.text', 'Sweeney Todd: The Demon Barber of Fleet Street2007')

    // Add Sweeney todd to favorite list
    cy.get('.movie .favorite').first().click().should(() => {
      expect(JSON.parse(localStorage.getItem('favorite'))).to.have.length(1)
    })

    cy.get('.searchInput').clear()
    .type('Sherlock Holmes').should('have.value', 'Sherlock Holmes')

    // wait for api to finish loading
    // https://on.cypress.io/wait
    cy.wait('@searchMovie').its('response.statusCode').should('be.oneOf', [200, 304])
      
    // Add Sherlock holmes to watch list
    cy.get('.movie .later').first().click().should(() => {
      expect(JSON.parse(localStorage.getItem('watchLater'))).to.have.length(1)
    })

    cy.visit('http://localhost:5173/later')
    cy.wait('@getMovie').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.get('[data-test="movie"]').should('have.length', 1)
    cy.get('.movie .later').first().click().should(() => {
      expect(JSON.parse(localStorage.getItem('watchLater'))).to.have.length(0)
    })
    
    cy.visit('http://localhost:5173/favorites')
    cy.wait('@getMovie').its('response.statusCode').should('be.oneOf', [200, 304])
    cy.get('[data-test="movie"]').should('have.length', 1)
    cy.get('.movie .favorite').first().click().should(() => {
      expect(JSON.parse(localStorage.getItem('favorite'))).to.have.length(0)
    })    
  })
})

