let dropdowns = document.querySelectorAll(".navbar .dropdown-toggler");
let dropdownIsOpen = false;

// Handle dropdown menues
if (dropdowns.length) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (event) => {
      let target = document.querySelector(`#${event.target.dataset.dropdown}`);

      if (target) {
        if (target.classList.contains("show")) {
          target.classList.remove("show");
          dropdownIsOpen = false;
        } else {
          target.classList.add("show");
          dropdownIsOpen = true;
        }
      }
    });
  });
}

// Handle closing dropdowns if a user clicked the body
window.addEventListener("mouseup", (event) => {
  if (dropdownIsOpen) {
    dropdowns.forEach((dropdownButton) => {
      let dropdown = document.querySelector(
        `#${dropdownButton.dataset.dropdown}`
      );
      let targetIsDropdown = dropdown == event.target;

      if (dropdownButton == event.target) {
        return;
      }

      if (!targetIsDropdown && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  }
});
function handleSmallScreens() {
  document.querySelector(".navbar-toggler").addEventListener("click", () => {
    let navbarMenu = document.querySelector(".navbar-menu");

    if (!navbarMenu.classList.contains("active")) {
      navbarMenu.classList.add("active");
    } else {
      navbarMenu.classList.remove("active");
    }
  });
}

handleSmallScreens();
document.getElementById('calculate').addEventListener('click', () => {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  if (!age || !height || !weight) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
  }

  // BMR Calculation
  let bmr = 0;
  if (gender === 'male') {
      bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  } else {
      bmr = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  }

  // Activity Levels
  const lightActivity = bmr * 1.375;  // Light activity
  const moderateActivity = bmr * 1.55; // Moderate activity
  const heavyActivity = bmr * 1.725; // Heavy activity

  // Display Results
  document.getElementById('bmr-result').innerText = `${Math.round(bmr)} kcal/day`;
  document.getElementById('bmr-value').innerText = `${Math.round(bmr)} kcal/day`;
  document.getElementById('light-activity').innerText = `${Math.round(lightActivity)} kcal/day`;
  document.getElementById('moderate-activity').innerText = `${Math.round(moderateActivity)} kcal/day`;
  document.getElementById('heavy-activity').innerText = `${Math.round(heavyActivity)} kcal/day`;
});
