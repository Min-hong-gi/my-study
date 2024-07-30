export const { isPressed } = (()=>{
	let btnMap = {};

	document.addEventListener('keydown', (e)=>{
		btnMap[e.key.toUpperCase()] = true;
	})
	document.addEventListener('keyup', (e)=>{
		btnMap[e.key.toUpperCase()] = false;
	})

	function isPressed(button) {
		return btnMap[button] || false;
	}
	return {
		isPressed
	}
})();