import { Unit } from "../../chapter2/actor/Unit.js";

class UnitManager {
	constructor() {
		/**
		 * @type { Array<Unit> }
		 */
		this.units = [];
		this.selected = null;
	}
	/**
	 * @param { Unit } unit
	 */
	newUnit(unit) {
		this.units.push(unit);
	}
	clear() {
		this.units = [];
	}
	/**
	 * @param { Unit | number } unit
	 */
	select(unit) {
		if(typeof unit === 'number') {
			this.selected = unit;
		} else {
			this.selected = this.units.find(x=>x===unit);
		}
	}
	/**
	 * 
	 * @returns { Unit | null }
	 */
	getSelectedUnit() {
		return this.units[this.selected] || null;
	}
}

const unitManager = new UnitManager();
export default unitManager;
export const getSelectedUnit = unitManager.getSelectedUnit.bind(unitManager);