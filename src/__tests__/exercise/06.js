// ,()=>({

// }));
import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'
jest.mock('react-use-geolocation')
beforeAll(() => {
// window.navigator.geolocation = {
// 	getCurrentPosition: jest.fn()
// }
})


function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
		coords:{
			latitude:0,
			longitude:0
		}
	}
  // const { promise, resolve, reject } = deferred();
	let setReturnValue;
	const useMockPosition = () => {
		const state = React.useState([]);
		setReturnValue = state[1];
		return state[0]
	}
	useCurrentPosition.mockImplementation(useMockPosition) 
  // window.navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => promise.then(() => {
	// 	success(fakePosition)
	// }))
  render(<Location />)
	screen.debug()
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(()=>{
		setReturnValue([fakePosition])
	})
  expect(screen.queryByLabelText(/loading/i)).toBeFalsy()
	screen.debug()
	expect(screen.getByText(/latitude/i)).toBeInTheDocument();
	expect(screen.getByText(/longitude/i)).toBeInTheDocument();
})

/*
eslint
  no-unused-vars: "off",
*/
