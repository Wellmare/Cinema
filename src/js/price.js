import {reservedPlaces} from './place'

const amountTicketsNode = document.querySelector('#amount-tickets');
const totalPriceNode = document.querySelector('#price');

export const renderTotalTicketsInfo = () => {
	const totalPrice = getTotalPrice();
	const countTickets = reservedPlaces.length;

	amountTicketsNode.textContent = countTickets;
	totalPriceNode.textContent = totalPrice;
};

export const getTotalPrice = () => {
	let totalPrice = 0;
	reservedPlaces.forEach(({ id, price }) => (totalPrice += price));
	return totalPrice;
};