import { Command } from "./Command.js";

export class JumpCommand extends  Command {
	execute(actor) {
		actor.jump();
	}
}

export class FireCommand extends  Command {
	execute(actor) {
		actor.fireGun();
	}
}
export class SwapCommand extends  Command {
	execute(actor) {
		actor.swapWeapon()
	}
}

export class LurchCommand extends  Command {
	execute(actor) {
		actor.lurchIneffectively()
	}
}
