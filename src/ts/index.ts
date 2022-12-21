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
const totalCountNode = document.querySelector<HTMLSpanElement>(Selectors.TOTAL_COUNT_NODE)
const totalPriceNode = document.querySelector<HTMLSpanElement>(Selectors.TOTAL_PRICE_NODE)


if (placesContainer && totalCountNode && totalPriceNode) {
	new Hall(3, 5, prices, placesContainer, {totalCount: totalCountNode, totalPrice: totalPriceNode}).renderHall();
}
