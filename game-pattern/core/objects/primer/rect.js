import { MAIN_CANVAS } from "../../manager/MainCavasManager.js";

export class Rect {
	constructor({ x = 0, y = 0, width = 30, height = 30, color = '#000' }={}) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}
	draw() {
		MAIN_CANVAS.draw(
			/**
			 * @param { CanvasRenderingContext2D } ctx 
			*/
			(ctx) => {
				ctx.beginPath();
				ctx.rect(this.x, this.y, this.width, this.height);
				ctx.fist = this.color;
				ctx.fill();
				ctx.closePath();
			}
		);
	}
}