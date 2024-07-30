class MainCanvasManager {
	mainCanvas;
	constructor() {
		/**
		 * @type { HTMLCanvasElement }
		 */
		this.mainCanvas = document.querySelector('canvas#main');
		this.ctx = this.mainCanvas.getContext('2d');

		this.mainCanvas.width = this.mainCanvas.clientWidth;
		this.mainCanvas.height = this.mainCanvas.clientHeight;
	}
	/**
	 * @type { T }
	 * @param {(ctx:CanvasRenderingContext2D)=>T} fn 
	 * @returns { T }
	 */
	draw(fn) {
		return fn(this.ctx);
	}
	get vw() {
		return this.mainCanvas.width;
	}
	get vh() {
		return this.mainCanvas.height;
	}
}

export const MAIN_CANVAS = new MainCanvasManager();