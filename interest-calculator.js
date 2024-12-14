function calculateInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const monthlyAddition = parseFloat(
    document.getElementById('monthly-addition').value
  );
  const years = parseFloat(document.getElementById('years').value);
  const rate = parseFloat(document.getElementById('interest-rate').value) / 100;

  if (!principal || !monthlyAddition || !years || !rate) {
    alert('Please fill in all fields!');
    return;
  }

  let values = [];
  let labels = [];

  // Calculate the compound interest with monthly additions
  for (let i = 1; i <= years; i++) {
    let totalAmount = principal * Math.pow(1 + rate, i); // Compound interest formula

    // Add the monthly contributions
    totalAmount += monthlyAddition * ((Math.pow(1 + rate, i) - 1) / rate);

    values.push(totalAmount.toFixed(2));
    labels.push(`Year ${i}`);
  }

  // Display the result for the final year
  const result = values[values.length - 1];
  document.getElementById(
    'result'
  ).textContent = `Future Value after ${years} years: $${result}`;

  // Create the chart using Chart.js
  const ctx = document.getElementById('interestChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Investment Growth Over Time',
          data: values,
          borderColor: '#4a57c7',
          fill: false,
          tension: 0.1,
        },
      ],
    },
  });
}
