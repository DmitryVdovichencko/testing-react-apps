// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'
import {renderHook, act as hookAct } from '@testing-library/react-hooks'


const CountComponent = () => {
	const {count, increment, decrement} = useCounter();
	return <div>
		<span>count is {count}</span>
		<button onClick={increment}>increment</button>
		<button onClick={decrement}>decrement</button>
	</div>
}

test('exposes the count and increment/decrement functions', () => {
	render(<CountComponent />)
	screen.debug();
	const increaseButton = screen.getByText(/increment/i), decreaseButton = screen.getByText(/decrement/i), result = screen.getByText(/count is/i)
	expect(result.textContent).toEqual('count is 0')
	userEvent.click(increaseButton)
	expect(result.textContent).toEqual('count is 1')
	userEvent.click(decreaseButton)
	expect(result.textContent).toEqual('count is 0')
})

test('exposes the count and increment/decrement functions', () => {
	let counter
	function TestComponent(props) {
		counter = useCounter()
		return null
	}
	render(<TestComponent />)
	expect(counter.count).toEqual(0)
	act(()=> counter.increment());
	expect(counter.count).toEqual(1)
	act(()=> counter.decrement());
	expect(counter.count).toEqual(0)
})


test('exposes the count and increment/decrement functions', () => {
	function setup(useCustomHook, ...args) {
		const returnVal = {}
		function TestComponent() {
			Object.assign(returnVal, useCustomHook(...args))
			return null
		}
		render(<TestComponent />)
		return returnVal
	}
	const counter = setup(useCounter, {initialCount:1, step:3} )
	expect(counter.count).toEqual(1)
	act(()=> counter.increment());
	expect(counter.count).toEqual(4)
	act(()=> counter.decrement());
	expect(counter.count).toEqual(1)
})

test('exposes the count and increment/decrement functions', () => {
	const { result } = renderHook(() => useCounter({initialCount:1, step:3}));
	expect(result.current.count).toEqual(1)
	hookAct(()=> result.current.increment());
	expect(result.current.count).toEqual(4)
	hookAct(()=> result.current.decrement());
	expect(result.current.count).toEqual(1)
})
/* eslint no-unused-vars:0 */
