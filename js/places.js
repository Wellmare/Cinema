const placesContainer = document.querySelector('#places-container');

const renderHall = (rows, cols) => {
	const rowsEls = [];
	for (let i = 0; i < rows; i++) {
		const rowEl = document.createElement('div');
		rowEl.className = 'cinema-row';

		for (let j = 0; j < cols; j++) {
			const price = pricesByRows[i];
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