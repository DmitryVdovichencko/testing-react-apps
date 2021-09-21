// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

import { render as utilRender } from '../../test/test-utils';


test('renders with the light styles for the light theme', () => {
  // const customRender = (ui, options) =>
  // render(ui, {wrapper: ThemeProvider, ...options})

  render(<ThemeProvider initialTheme="light"><EasyButton>Easy</EasyButton></ThemeProvider>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})
test('renders with the dark styles for the dark theme', () => {
  render(<ThemeProvider initialTheme="dark"><EasyButton>Easy</EasyButton></ThemeProvider>)
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

const customRender = (ui, theme, options) =>
  render(ui, {wrapper: (props)=> <ThemeProvider initialTheme={theme} {...props} />, ...options})

test('renders with the light styles for the light theme', () => {
		customRender(<EasyButton>Easy</EasyButton>, 'light')
		const button = screen.getByRole('button', {name: /easy/i})
		expect(button).toHaveStyle(`
			background-color: white;
			color: black;
		`)
})

test('renders with the dark styles for the dark theme', () => {
	customRender(<EasyButton>Easy</EasyButton>, 'dark')
	const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

test('renders with the dark styles for the dark theme', () => {
	utilRender(<EasyButton>Easy</EasyButton>, {theme: 'dark'})
	const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */
