import { classByState, State } from './types';
import { getRandomId } from './utils';

export default class Place {
	private id: string = getRandomId();
	private placeElement: HTMLDivElement;

	constructor(
		private price: number,
		private state: State,
		private parent: HTMLDivElement
	) {
		this.init();
	}

	init = async (): Promise<void> => {
		this.placeElement = document.createElement('div');
		this.placeElement.className = `place ${
			this.state ? classByState[this.state] || '' : ''
		}`;
		this.placeElement.setAttribute('data-id', this.id);

		await this.parent.insertAdjacentElement(
			'afterbegin',
			this.placeElement
		);
		this.placeElement.addEventListener(`click`, this.onClick);
	};

	onClick = (): void => {
		switch (this.state) {
			case State.FILLED:
				alert('This place is occupied!');
				break;
			case State.NOT_FILLED:
				this.state = State.SELECTED;
				this.render();
				// reservedPlaces.push({ price: this.price, id: this.id });
				// renderTotalTicketsInfo();
				break;
			case State.SELECTED:
				this.state = State.NOT_FILLED;
				// reservedPlaces = reservedPlaces.filter(
				// 	({ price, id }) => id !== this.id
				// );
				// renderTotalTicketsInfo();
				this.render();
				break;
		}
	};

	render = () => {
		this.placeElement.className = `place ${this.state ? this.state : ''}`;
	};
}
