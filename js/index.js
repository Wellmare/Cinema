const pricesByRows = {
	0: 300,
	1: 400,
	2: 500
};

const placesContainer = document.querySelector('#places-container');
const amountTicketsNode = document.querySelector('#amount-tickets');
const totalPriceNode = document.querySelector('#price');

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

const renderPrices = () => {
	const totalPrice = places.reduce((prev, curr) => (prev += curr));
	const countTickets = places.length;

    amountTicketsNode.textContent = countTickets
    totalPriceNode.textContent = totalPrice
};

renderHall(3, 6);
// renderHall(3, 6);
