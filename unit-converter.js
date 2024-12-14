const conversionType = document.getElementById('conversion-type');
const fromValue = document.getElementById('from-value');
const toValue = document.getElementById('to-value');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const swapBtn = document.querySelector('.swap-btn');

const conversions = {
  length: {
    units: ['meters', 'kilometers', 'feet', 'inches', 'yards', 'miles'],
    ratesToMeter: {
      meters: 1,
      kilometers: 1000,
      feet: 0.3048,
      inches: 0.0254,
      yards: 0.9144,
      miles: 1609.34,
    },
  },
  weight: {
    units: ['grams', 'kilograms', 'pounds', 'ounces'],
    ratesToGram: {
      grams: 1,
      kilograms: 1000,
      pounds: 453.592,
      ounces: 28.3495,
    },
  },
  temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    convert: (value, from, to) => {
      let celsius;
      // Convert to Celsius first
      switch (from) {
        case 'Celsius':
          celsius = value;
          break;
        case 'Fahrenheit':
          celsius = ((value - 32) * 5) / 9;
          break;
        case 'Kelvin':
          celsius = value - 273.15;
          break;
      }
      // Convert from Celsius to target
      switch (to) {
        case 'Celsius':
          return celsius;
        case 'Fahrenheit':
          return (celsius * 9) / 5 + 32;
        case 'Kelvin':
          return celsius + 273.15;
      }
    },
  },
};

function updateUnitOptions() {
  const units = conversions[conversionType.value].units;
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';

  units.forEach((unit) => {
    fromUnit.add(new Option(unit, unit));
    toUnit.add(new Option(unit, unit));
  });

  convert();
}

function convert() {
  if (!fromValue.value) {
    toValue.value = '';
    return;
  }

  const type = conversionType.value;
  const value = parseFloat(fromValue.value);

  if (type === 'temperature') {
    toValue.value = conversions.temperature
      .convert(value, fromUnit.value, toUnit.value)
      .toFixed(2);
  } else {
    const rates =
      type === 'length'
        ? conversions.length.ratesToMeter
        : conversions.weight.ratesToGram;
    const baseValue = value * rates[fromUnit.value];
    toValue.value = (baseValue / rates[toUnit.value]).toFixed(2);
  }
}

function swap() {
  const tempValue = fromValue.value;
  const tempUnit = fromUnit.value;

  fromValue.value = toValue.value;
  fromUnit.value = toUnit.value;
  toUnit.value = tempUnit;

  convert();
}

conversionType.addEventListener('change', updateUnitOptions);
fromValue.addEventListener('input', convert);
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);
swapBtn.addEventListener('click', swap);

updateUnitOptions();
