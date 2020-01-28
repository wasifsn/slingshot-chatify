const socket = io();

socket.on('countUpdated', (count) => {
	console.log(`the count has been updated: ${count}`);
});

let btn = document.querySelector('.increment').addEventListener('click', () => {
	console.log('clicked');
	socket.emit('increment');
});
