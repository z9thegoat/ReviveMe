document.getElementById("calculate-btn").addEventListener("click", function () {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const age = parseInt(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = parseFloat(document.getElementById("activity").value);

  if (isNaN(age) || isNaN(height) || isNaN(weight)) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
  }

  // BMR Calculation
  let bmr;
  if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // TDEE Calculation
  const tdee = bmr * activity;

  // Update TDEE Result
  document.getElementById("tdee-result").textContent = `${tdee.toFixed(2)} แคลอรี่ต่อวัน`;

  // Generate Table Data
  const percentages = [0.62, 0.81, 0.9, 1.0, 1.1, 1.19, 1.38];
  const tbody = document.querySelector("#tdee-table tbody");
  tbody.innerHTML = ""; // Clear existing rows

  percentages.forEach((percent, index) => {
      const calorie = tdee * percent;
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${index === 0 ? "-1 กก./สัปดาห์" : index === 3 ? "รักษาน้ำหนัก" : index > 3 ? `+${(index - 3) * 0.25} กก./สัปดาห์` : `-${(3 - index) * 0.25} กก./สัปดาห์`}</td>
          <td>${calorie.toFixed(2)} แคลอรี่/วัน</td>
          <td>${(percent * 100).toFixed(0)}%</td>
      `;
      tbody.appendChild(row);
  });
});

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