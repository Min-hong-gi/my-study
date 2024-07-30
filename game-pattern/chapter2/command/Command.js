import { GameActor } from "../actor/GameActor.js";

export class Command {
	/**
	 * 
	 * @param { GameActor } actor 
	 */
	execute(actor) {
		throw new Error('Not implement Command.execute!!!');
	}
	undo() {
		throw new Error('Not implement Command.undo!!!');
	}
}