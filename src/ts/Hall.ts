import Place from './Place';
import { IPrice, ISelectedPlace, ITotalInfoNodes, State } from './types';

export default class Hall {
	private totalPrice: number = 0;
	private totalCount: number = 0;
	private selectedPlaces: ISelectedPlace[] = [];

	constructor(
		private rows: number,
		private cols: number,
		private prices: IPrice[],
		private placesContainer: HTMLDivElement,
		private totalInfoNodes: ITotalInfoNodes
	) {}

	renderHall = (): void => {
		for (let i = 1; i <= this.rows; i++) {
			const rowElement = document.createElement('div');
			rowElement.className = 'cinema-row';

			for (let j = 0; j < this.cols; j++) {
				let price: number = 100;
				this.prices.forEach((IPrice) => {
					if (IPrice.row === i) price = IPrice.price;
				});
				new Place(
					price,
					State.NOT_FILLED,
					rowElement,
					this.addSelectedPlace,
					this.removeSelectedPlace
				).init();
			}

			this.placesContainer.insertAdjacentElement(
				'beforebegin',
				rowElement
			);
		}
	};

	renderTotalInfo = () => {
		this.totalInfoNodes.totalCount.textContent = this.totalCount.toString();
		this.totalInfoNodes.totalPrice.textContent = this.totalPrice.toString();
	};

	reduceTotalValue = () => {
		if (this.selectedPlaces.length > 0) {
            let price = 0
            this.selectedPlaces.forEach((place) => {
                price+=place.price
            })
            this.totalPrice = price
			// this.totalPrice = this.selectedPlaces.reduce((prevVal, currVal) => {
			// 	prevVal.price += currVal.price;
			// 	return prevVal;
			// }).price;
		} else {
            this.totalPrice = 0
        }
		this.totalCount = this.selectedPlaces.length;
	};

	addSelectedPlace = (place: ISelectedPlace) => {
		this.selectedPlaces.push(place);
		this.reduceTotalValue();
		this.renderTotalInfo();
	};
	removeSelectedPlace = (id: string) => {
		this.selectedPlaces = this.selectedPlaces.filter(
			(place) => place.id !== id
		);
		this.reduceTotalValue();
		this.renderTotalInfo();
	};
}
