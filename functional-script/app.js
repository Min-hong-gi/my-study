document.querySelector('input').addEventListener('change', function(e) {
	const reader = new FileReader();
	reader.onload = function(e) {
		let dv = new DataView(this.result);
		console.log(dv);
	}

	reader.readAsArrayBuffer(this.files[0]);
})