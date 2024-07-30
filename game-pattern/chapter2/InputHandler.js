import { BUTTON_A, BUTTON_B, BUTTON_CTRL, BUTTON_DOWN, BUTTON_LEFT, BUTTON_RIGHT, BUTTON_SHIFT, BUTTON_UP, BUTTON_X, BUTTON_Y, BUTTON_Z } from "../const.js";
import { isPressed } from "../core/core.js";
import { Command } from "./command/Command.js";
import { FireCommand, JumpCommand, LurchCommand, SwapCommand } from './command/CommandImpls.js';
import { MoveUnitCommand } from "./command/MoveUnitCommand.js";
import { getSelectedUnit } from "../core/manager/UnitManager.js";

export class InputHandler {
	/**
	 * @type { Array<Command> }
	 */
	commandHistory = [];
	now = 0;
	/**
	 * @type { Command }
	 */
	buttonX_;
	/**
	 * @type { Command }
	 */
	buttonY_;
	/**
	 * @type { Command }
	 */
	buttonA_;
	/**
	 * @type { Command }
	 */
	buttonB_;

	constructor() {
		this.buttonX_ = new JumpCommand();
		this.buttonY_ = new FireCommand();
		this.buttonA_ = new SwapCommand();
		this.buttonB_ = new LurchCommand();
	}

	handleInput() {
		let command = null;
		if (isPressed(BUTTON_CTRL) && isPressed(BUTTON_Z)) {
			if (this.commandHistory.length) {
				if(isPressed(BUTTON_SHIFT) && this.commandHistory.length > this.now) {
					this.now +=1;
					return this.commandHistory[this.now];
				}
				this.commandHistory[this.now]?.undo();
				this.now -= 1;
				return null;
			}
		}

		const unit = getSelectedUnit();
		if (unit) {
			let destY = unit.y;
			let destX = unit.x;
			if (isPressed(BUTTON_UP)) {
				destY -= 1;
				command = new MoveUnitCommand(unit, destX, destY);
			}
			if (isPressed(BUTTON_DOWN)) {
				destY += 1;
				command = new MoveUnitCommand(unit, destX, destY);
			}
			if (isPressed(BUTTON_LEFT)) {
				destX -= 1;
				command = new MoveUnitCommand(unit, destX, destY);
			}
			if (isPressed(BUTTON_RIGHT)) {
				destX += 1;
				command = new MoveUnitCommand(unit, destX, destY);
			}
		}

		if (isPressed(BUTTON_X)) {
			command = this.buttonX_;
		} else if (isPressed(BUTTON_Y)) {
			command = this.buttonY_;
		} else if (isPressed(BUTTON_A)) {
			command = this.buttonA_;
		} else if (isPressed(BUTTON_B)) {
			command = this.buttonB_;
		}
		if (command) {
			this.commandHistory.splice(this.now, this.commandHistory.length);
			this.commandHistory.push(command);
			this.now +=1;
		}
		// 아무것도 누르지 않았다면 아무것도 하지 않는다.
		return command;
	}
}