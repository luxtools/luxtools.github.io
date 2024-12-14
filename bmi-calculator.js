const unitType = document.getElementById('unit-type');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const bmiResult = document.getElementById('bmi-result');
const bmiAdvice = document.getElementById('bmi-advice');
const calculateBtn = document.getElementById('calculate-btn');

const weightLabel = document.getElementById('weight-label');
const heightLabel = document.getElementById('height-label');

unitType.addEventListener('change', updateLabels);
calculateBtn.addEventListener('click', calculateBMI);

function updateLabels() {
  if (unitType.value === 'metric') {
    weightLabel.textContent = 'Weight (kg)';
    heightLabel.textContent = 'Height (m)';
    weight.placeholder = 'Enter weight in kg';
    height.placeholder = 'Enter height in meters';
  } else {
    weightLabel.textContent = 'Weight (lbs)';
    heightLabel.textContent = 'Height (inches)';
    weight.placeholder = 'Enter weight in lbs';
    height.placeholder = 'Enter height in inches';
  }
}

function calculateBMI() {
  const weightValue = parseFloat(weight.value);
  const heightValue = parseFloat(height.value);

  if (
    isNaN(weightValue) ||
    isNaN(heightValue) ||
    weightValue <= 0 ||
    heightValue <= 0
  ) {
    alert('Please enter valid, positive numbers for weight and height.');
    return;
  }

  let bmi;

  if (unitType.value === 'metric') {
    bmi = weightValue / (heightValue * heightValue);
  } else {
    bmi = (weightValue / (heightValue * heightValue)) * 703;
  }

  bmi = bmi.toFixed(2);
  bmiResult.value = bmi;

  updateBMIAdvice(bmi);
}

function updateBMIAdvice(bmi) {
  let category, advice, color;

  if (bmi < 18.5) {
    category = 'Underweight';
    advice = 'Consider consulting a healthcare provider.';
    color = '#FFD700'; // gold color
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal';
    advice = 'Great job! Maintain a balanced lifestyle.';
    color = '#4CAF50'; // green color
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Overweight';
    advice = 'Consider a healthy diet and regular exercise.';
    color = '#FFA500'; // orange color
  } else {
    category = 'Obesity';
    advice = 'It may be beneficial to seek medical guidance.';
    color = '#FF4500'; // red color
  }

  bmiAdvice.textContent = `${category}: ${advice}`;
  bmiResult.style.backgroundColor = color;
}

updateLabels();
