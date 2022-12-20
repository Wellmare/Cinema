export const stateEnum = {
	occupied: `occupied`,
	notOccupied: `not-occupied`,
	selected: `selected`
};

export let reservedPlaces = [];

export class Place {
	price;
	id;
	state;
	parent;
	placeEl;

	constructor(price, id, state, parent) {
		this.price = price;
		this.id = id;
		this.state = state;
		this.parent = parent;

		this.init();
	}

	init = async () => {
		this.placeEl = document.createElement('div');
		this.placeEl.className = `place ${this.state ? this.state : ''}`;
		this.placeEl.setAttribute('data-id', this.id);

		await this.parent.insertAdjacentElement('afterbegin', this.placeEl);
		document
			.querySelector(`[data-id="${this.id}"]`)
			.addEventListener('click', () => {
				switch (this.state) {
					case stateEnum.occupied:
						alert('This place is occupied!');
						break;
					case stateEnum.notOccupied:
						this.state = stateEnum.selected;
						this.render();
						reservedPlaces.push({ price: this.price, id: this.id });
						renderTotalTicketsInfo();
						break;
					case stateEnum.selected:
						this.state = stateEnum.notOccupied;
						reservedPlaces = reservedPlaces.filter(
							({ price, id }) => id !== this.id
						);
						renderTotalTicketsInfo()
						this.render()
						break;
				}
			});
	};

	render = () => {
		this.placeEl.className = `place ${this.state ? this.state : ''}`;
	};
}
