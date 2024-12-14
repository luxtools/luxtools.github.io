const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength');
const strengthText = document.getElementById('strength-text');
const togglePasswordBtn = document.getElementById('toggle-password');

// Function to set the initial state of the password input and toggle button
const initializePasswordVisibility = () => {
  // Initially set the password input to 'password' type and set the eye icon to 'show'
  passwordInput.type = 'password';
  togglePasswordBtn.textContent = '👁️'; // Set to show icon initially
};

// Function to check password strength
const checkPasswordStrength = (password) => {
  let strength = 0;

  // Check for length
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Check for number, uppercase, lowercase, and special characters
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  // Update the strength bar and text
  updateStrengthBar(strength);
};

// Function to update the strength bar
const updateStrengthBar = (strength) => {
  const percentage = strength >= 6 ? 100 : (strength / 6) * 100;
  strengthBar.style.width = `${percentage}%`;

  if (strength <= 2) {
    strengthBar.style.backgroundColor = 'red';
    strengthText.textContent = `Strength: Weak`;
  } else if (strength <= 4) {
    strengthBar.style.backgroundColor = 'yellow';
    strengthText.textContent = `Strength: Medium`;
  } else {
    strengthBar.style.backgroundColor = 'green';
    strengthText.textContent = `Strength: Strong`;
  }
};

// Function to toggle password visibility
const togglePasswordVisibility = () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.textContent = type === 'password' ? '👁️' : '🙈'; // Toggle eye icon
};

// Event listeners
passwordInput.addEventListener('input', (e) => {
  checkPasswordStrength(e.target.value);
});

togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

// Initialize the password input and button state on page load
initializePasswordVisibility();
