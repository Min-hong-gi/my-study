export class Vector {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	/**
	 * 
	 * @param { Vector } vector 
	 */
	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
	}
	sub(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
	}
	mul(val) {
		this.x *= val;
		this.y *= val;
	}
	div(val) {
		this.x /= val;
		this.y /= val;
	}
	normalize() {
		return Math.sqrt(this.x**2 + this.y**2);
	}
	clone() {
		return new Vector(this.x, this.y);
	}
}