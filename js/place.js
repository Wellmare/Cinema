const stateEnum = {
	occupied: `occupied`,
	notOccupied: `not-occupied`,
	selected: `selected`
};

const places = []

class Place {
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

	// static onClick = (placeEl, id) => {
	//     placeEl.className =
	// }

	init = async () => {
		this.placeEl = document.createElement('div');
		this.placeEl.className = `place ${this.state ? this.state : ''}`;
		this.placeEl.setAttribute('data-id', this.id);

		await this.parent.insertAdjacentElement('afterbegin', this.placeEl);
		// this.placeEl.onClick = () => {
		// 	console.log('test');
		// 	this.state = stateEnum.selected;
		// 	this.render();
		// };
		document
			.querySelector(`[data-id="${this.id}"]`)
			.addEventListener('click', () => {
				if (this.state !== stateEnum.selected) {
					this.state = stateEnum.selected;
					this.render();
                    places.push(this.price)
                    renderPrices()
				}
			});
	};

	render = () => {
		this.placeEl.className = `place ${this.state ? this.state : ''}`;
	};
}
