export const enum State {
	FILLED = 'filled',
	NOT_FILLED = 'not-filled',
	SELECTED = 'selected'
}

export const classByState = {
	[State.FILLED]: 'filled',
	[State.NOT_FILLED]: 'not-filled',
	[State.SELECTED]: 'selected'
};

export interface IPrice {
	row: number;
	price: number;
}

export const enum Selectors {
	PLACES_CONTAINER = '#places-container',
	TOTAL_COUNT_NODE = '#amount-tickets',
	TOTAL_PRICE_NODE = '#price',
	BOOKING_BUTTON = `#buy`,
	NUBMER_PHONE_INPUT = `#phone-number`,
	EMAIL_INPUT = `#email`,
	TOTAL_PRICE_INPUT = `#total-price`
}

export interface ITotalInfoNodes {
	totalCount: HTMLSpanElement;
	totalPrice: HTMLSpanElement;
}
export interface ISelectedPlace {
    id: string,
    price: number
}