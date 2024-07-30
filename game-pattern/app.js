import { GameActor } from './chapter2/actor/GameActor.js';
import { InputHandler } from './chapter2/InputHandler.js';
import { Unit } from './chapter2/actor/Unit.js';
import UnitManager from './core/manager/UnitManager.js';
import { MAIN_CANVAS } from './core/manager/MainCavasManager.js';

const actor = new GameActor();
const inputHandler = new InputHandler();

const unit = new Unit();
UnitManager.newUnit(unit);
UnitManager.select(0);

function main() {
	const command = inputHandler.handleInput();
	if (command) {
		command.execute(actor)
	}
	MAIN_CANVAS.draw(ctx => {
		ctx.clearRect(0, 0, MAIN_CANVAS.vw, MAIN_CANVAS.vh);
	})
	unit.draw();
	requestAnimationFrame(main);
}
main();
