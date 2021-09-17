// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import {build, fake, sequence} from '@jackfranklin/test-data-bot'

test('submitting the form calls onSubmit with username and password', () => {
	const mockHandleSubmit =  jest.fn()
	render(<Login onSubmit={mockHandleSubmit} />)
	const usernameInput = screen.getByLabelText(/username/i), passwordInput = screen.getByLabelText(/password/i);
	// const buildLoginForm = ({ username = null, password = null }) => ({
	// 	username: username || faker.internet.userName(),
	// 	password: password || faker.internet.password()
	// });
	// const { username, password } = buildLoginForm({password:'12345'});
	const loginFormBuilder = build('LoginForm', {
		fields: {
			id: sequence(),
			username: fake(f => f.internet.userName()),
			password: fake(f => f.internet.password())
		},
	});
	 
	const {username, password } = loginFormBuilder({
		overrides: {
			id: 1,
			password: '12345',
		},
	});
	
	userEvent.type(usernameInput, username);
	userEvent.type(passwordInput, password)
	const submitButton = screen.getByRole('button',{name: /submit/i});
	userEvent.click(submitButton);
	expect(mockHandleSubmit).toBeCalledTimes(1);
	console.log({username, password})
	expect(mockHandleSubmit).toBeCalledWith({username, password});
})

/*
eslint
  no-unused-vars: "off",
*/
