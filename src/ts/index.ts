import '../css/index.css';

import Hall from './Hall';
import { IPrice, Selectors } from './types';

const prices: IPrice[] = [
	{
		row: 1,
		price: 500
	},
	{
		row: 2,
		price: 400
	},
	{
		row: 3,
		price: 300
	}
];
const placesContainer = document.querySelector<HTMLDivElement>(
	Selectors.PLACES_CONTAINER
);
const totalCountNode = document.querySelector<HTMLSpanElement>(
	Selectors.TOTAL_COUNT_NODE
);
const totalPriceNode = document.querySelector<HTMLSpanElement>(
	Selectors.TOTAL_PRICE_NODE
);

let hall;

if (placesContainer && totalCountNode && totalPriceNode) {
	hall = new Hall(3, 5, prices, placesContainer, {
		totalCount: totalCountNode,
		totalPrice: totalPriceNode
	});
}

hall?.renderHall();

const phoneNumberInput = document.querySelector<HTMLInputElement>(
	Selectors.NUBMER_PHONE_INPUT
)!;
const emailInput = document.querySelector<HTMLInputElement>(
	Selectors.EMAIL_INPUT
)!;

document
	.querySelector<HTMLButtonElement>(Selectors.BOOKING_BUTTON)
	?.addEventListener(`click`, () => {
		if (
			phoneNumberInput.value.length > 5 &&
			emailInput.value.length > 5 &&
			emailInput.value.includes('@')
		) {
			alert('Вы забронировали билет');
		} else {
			alert('Вы ввели неправильные значения')
		}
	});
