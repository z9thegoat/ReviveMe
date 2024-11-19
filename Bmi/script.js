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

document.getElementById("calculate-btn").addEventListener("click", () => {
  const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to m
  const weight = parseFloat(document.getElementById("weight").value);

  if (!height || !weight) {
    alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    return;
  }

  const bmi = (weight / (height * height)).toFixed(1);
  const ponderalIndex = (weight / Math.pow(height, 3)).toFixed(2);

  // Calculate ideal weight range
  const minWeight = (18.5 * height * height).toFixed(1);
  const maxWeight = (25 * height * height).toFixed(1);

  // Categorize BMI
  let category = "";
  if (bmi < 18.5) category = "น้ำหนักต่ำกว่ามาตรฐาน";
  else if (bmi >= 18.5 && bmi <= 24.9) category = "น้ำหนักปกติ";
  else if (bmi >= 25 && bmi <= 29.9) category = "น้ำหนักเกิน";
  else category = "โรคอ้วน";

  // Calculate weight adjustment
  const gainWeight =
    bmi < 18.5 ? (minWeight - weight).toFixed(1) + " กก." : "-";
  const loseWeight = bmi > 25 ? (weight - maxWeight).toFixed(1) + " กก." : "-";

  // Update results
  document.getElementById("bmi-value").textContent = bmi + " kg/m²";
  document.getElementById("bmi-category").textContent = category;
  document.getElementById(
    "ideal-weight-range"
  ).textContent = `${minWeight} kg - ${maxWeight} kg`;
  document.getElementById("gain-weight").textContent = gainWeight;
  document.getElementById("lose-weight").textContent = loseWeight;
  document.getElementById("ponderal-index").textContent =
    ponderalIndex + " kg/m³";
});
