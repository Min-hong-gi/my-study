import { Rect } from "../../core/objects/primer/rect.js";

export class Unit extends Rect {
	constructor(x, y) {
		super({
			x, y,
			color: '#f00',
		});
	}
	/**
	 * 
	 * @param { number } x 
	 * @param { number } y 
	 */
	move(x, y) {
		this.x = x;
		this.y = y;
	}
}