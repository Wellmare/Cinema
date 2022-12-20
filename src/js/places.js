const placesContainer = document.querySelector('#places-container');
import prices from '../prices.json'
// const prices = require('../prices.json')

export const renderHall = (rows, cols) => {
	const rowsEls = [];
	for (let i = 0; i < rows; i++) {
		const rowEl = document.createElement('div');
		rowEl.className = 'cinema-row';

		for (let j = 0; j < cols; j++) {
			const price = prices[i.toString()];
			new Place(
				price,
				Math.random().toString(16).slice(2),
				stateEnum.notOccupied,
				rowEl
			);
		}
		rowsEls.push(rowEl);
	}

	rowsEls.forEach((elem) => {
		placesContainer.insertAdjacentElement('afterend', elem);
	});
};