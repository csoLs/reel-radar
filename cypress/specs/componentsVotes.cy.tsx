/// <reference path="../support/component.ts" />

import React from 'react'
import Votes from '../../src/components/votes/index'

describe('<Votes />', () => {
  it('renders with a 0 average', () => {
    cy.mount(<Votes votes={0} average={0} />)
    cy.get('[data-cy=average]').should('have.css', 'left', '0px')
    cy.get('[data-cy=average]').should('have.css', 'width', '130px')
  })

  it('renders with a 5 average', () => {
    cy.mount(<Votes votes={0} average={5} />)
    cy.get('[data-cy=average]').should('have.css', 'left', '65px')
    cy.get('[data-cy=average]').should('have.css', 'width', '65px')
  })

  it('renders with a 10 average', () => {
    cy.mount(<Votes votes={0} average={10} />)
    cy.get('[data-cy=average]').should('have.css', 'left', '130px')
    cy.get('[data-cy=average]').should('have.css', 'width', '0px')
  })

  it('handles negative averages without breaking', () => {
    cy.mount(<Votes votes={0} average={-10} />)
    cy.get('[data-cy=average]').should('have.css', 'left', '0px')
    cy.get('[data-cy=average]').should('have.css', 'width', '130px')
  })

  it('handles too large positive averages without breaking', () => {
    cy.mount(<Votes votes={0} average={100} />)
    cy.get('[data-cy=average]').should('have.css', 'left', '130px')
    cy.get('[data-cy=average]').should('have.css', 'width', '0px')
  })
})
