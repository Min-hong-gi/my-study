import { Unit } from "../actor/Unit.js";
import { Command } from "../command/Command.js";

export class MoveUnitCommand extends Command {
	beforeX;
	beforeY;
	/**
	 * 
	 * @param { Unit } unit 
	 * @param { int } x 
	 * @param { int } y 
	 */
	constructor(unit, x, y) {
		super();
		this.unit = unit;
		this.x = x;
		this.y = y;
	}
	execute() {
		this.beforeX = this.unit.x;
		this.beforeY = this.unit.y;
		this.unit.move(this.x, this.y);
	}
	undo() {
		this.unit.move(this.beforeX, this.beforeY);
	}
}