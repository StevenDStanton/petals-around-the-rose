let rollButton = document.getElementById('rollBtn');
let diceToRoll = 5;
let diceRolled = [];
const diceContainer = document.querySelector('.dice-container');
const status = document.getElementById('status');
showResultsButton.disabled = true;
check.disabled = true;



rollButton.addEventListener('click', function() {
	fakeroll();	
});

function fakeroll(){
	let i = 0;
	let rollinterval = setInterval(function(){
		diceContainer.innerHTML = '';
		for (let i = 0; i < diceToRoll; i++) {
			let roll = rollDice();
			let dice = createDice(roll);
			diceContainer.appendChild(dice);
		}
		i++;
		if(i == 20){
			clearInterval(rollinterval);
			realroll();
		}
	}, 50);
}

function realroll(){
	showResultsButton.disabled = false;
	check.disabled = false;
	answer.value = '';
	status.classList.remove('success');
	status.classList.remove('error');
    diceContainer.innerHTML = '';
    diceRolled = [];
    for (let i = 0; i < diceToRoll; i++) {
		let roll = rollDice();
        diceRolled.push(roll);
        let dice = createDice(roll);
		diceContainer.appendChild(dice);
		
    }
}

showResultsButton.addEventListener('click', function() {
	answer.value = getResult();
	status.classList.add('error');
	check.disabled = true;
});

check.addEventListener('click', function() {
	if(answer.value == '') return;
	result = getResult();
	if(document.getElementById('answer').value == result) {
		status.classList.add('success');
	} else {
		status.classList.add('error');
		check.disabled = true;
	}
});

function getResult(){
	let result = 0;
	for (let i = 0; i < diceRolled.length; i++) {
		result += resultCleanup(resultLookup[diceRolled[i]]);
	}
	return result;
}

function createDice(numberOfDots) {
    const dotPositionMatrix = {
		1: [
			[50, 50]
		],
		2: [
			[20, 20],
			[80, 80]
		],
		3: [
			[20, 20],
			[50, 50],
			[80, 80]
		],
		4: [
			[20, 20],
			[20, 80],
			[80, 20],
			[80, 80]
		],
		5: [
			[20, 20],
			[20, 80],
			[50, 50],
			[80, 20],
			[80, 80]
		],
		6: [
			[20, 20],
			[20, 80],
			[50, 20],
			[50, 80],
			[80, 20],
			[80, 80]
		]
	}

	const dice = document.createElement('div');
	dice.classList.add('dice');
	for (const dotPosition of dotPositionMatrix[numberOfDots]) {
		const dot = document.createElement('div');
		dot.classList.add('dot');
		dot.style.setProperty("--top", dotPosition[0] + '%' )
		dot.style.setProperty("--left", dotPosition[1] + '%' )
		dice.appendChild(dot);
	}
	return dice;
}


function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

const resultLookup = {
	1: -1515870811,
	2: -1515870811,
	3: -1515870809,
	4: -1515870811,
	5: -1515870815,
	6: -1515870811
}


  function resultCleanup(input) {
	let output = input ^ 0xA5A5A5A5;
	return output;
  }

