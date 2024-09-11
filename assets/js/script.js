// script.js

document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("registerBtn");
  const formContainer = document.getElementById("formContainer");
  const gridContainer = document.getElementById("gridContainer");
  const employeeForm = document.getElementById("employeeForm");
  const overlay = document.getElementById("overlay");

  registerBtn.addEventListener("click", function () {
    gridContainer.classList.add("hidden");
    overlay.classList.add("active");
    formContainer.classList.remove("hidden");
  });
  // form close
  let formClose = document.getElementById("formClose");
  formClose.addEventListener("click", () => {
    employeeForm.reset()
    formContainer.classList.add("hidden");
    overlay.classList.remove("active");
    gridContainer.classList.remove("hidden");
  });
  employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();
     // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(msg => msg.textContent = '');

   // Get form values
    const name = document.getElementById("name").value.trim();
    const salary = document.getElementById("salary").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const department = document.getElementById("department").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedGender = document.querySelector(
      'input[name="gender"]:checked'
    ).value;

    // form Validation 
    // Validation checks
  let isValid = true;

  if (name === "" || /\d/.test(name)) {
    document.getElementById("nameError").textContent = "Name is required.";
    isValid = false;
  }

  if (salary === "" || isNaN(salary) || salary <= 0) {
    document.getElementById("salaryError").textContent = "Please enter a valid salary.";
    isValid = false;
  }

  if (designation === "") {
    document.getElementById("designationError").textContent = "Designation is required.";
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email === "" || !emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (department === "") {
    document.getElementById("departmentError").textContent = "Department is required.";
    isValid = false;
  }

  if (!selectedGender) {
    document.getElementById("genderError").textContent = "Please select a gender.";
    isValid = false;
  }
  if(isValid){
    let employees = JSON.parse(localStorage.getItem("employees")) || {
      Sales: [],
      Technical: [],
      HR: [],
      Telecalling: [],
    };

    employees[department].push({
      name,
      salary,
      designation,
      email,
      selectedGender,
    });
    localStorage.setItem("employees", JSON.stringify(employees));

    // displayEmployees();
    showAlert("Form submitted successfully!");
    employeeForm.reset();
    formContainer.classList.add("hidden");
    gridContainer.classList.remove("hidden");
    overlay.classList.remove("active");
  }
  });

  function displayEmployees() {
    let employees = JSON.parse(localStorage.getItem("employees")) || {
      Sales: [],
      Technical: [],
      HR: [],
      Telecalling: [],
    };

    document
      .querySelectorAll(".employeeList")
      .forEach((list) => (list.innerHTML = ""));

    for (const dept in employees) {
      employees[dept].forEach((employee) => {
        const div = document.createElement("div");
        div.classList.add("employee");

        const nameDiv = document.createElement("div");
        nameDiv.innerHTML = `<label>Name:</label> ${employee.name}`;
        nameDiv.classList.add("info");

        const salaryDiv = document.createElement("div");
        salaryDiv.innerHTML = `<label>Salary:</label> ${employee.salary}`;
        salaryDiv.classList.add("info");

        const designationDiv = document.createElement("div");
        designationDiv.innerHTML = `<label>Designation:</label> ${employee.designation}`;
        designationDiv.classList.add("info");

        const emailDiv = document.createElement("div");
        emailDiv.innerHTML = `<label>Email:</label> ${employee.email}`;
        emailDiv.classList.add("info");

        const departmentDiv = document.createElement("div");
        departmentDiv.innerHTML = `<label>Department:</label> ${dept}`;
        departmentDiv.classList.add("info");

        div.appendChild(nameDiv);
        div.appendChild(salaryDiv);
        div.appendChild(designationDiv);
        div.appendChild(emailDiv);
        div.appendChild(departmentDiv);

        const deptDiv = document
          .getElementById(`${dept.toLowerCase()}Dept`)
          .querySelector(".employeeList");
        deptDiv.appendChild(div);
      });
    }
  }

  // displayEmployees();
});
// to redirect to new page
function redirectToDepartment(department) {
  window.location.href = `department.html?department=${department}`;
}

// side bar open

let sideMenu = document.getElementById("sideMenu");
let openBars = document.getElementById("openBars");
let closeBar = document.getElementById("closeBar");

openBars.addEventListener("click", () => {
  sideMenu.style.transform = "translateX(-16rem)";
});
closeBar.addEventListener("click", () => {
  sideMenu.style.transform = "translateX(0rem)";
});
sideMenu.addEventListener("mouseleave", () => {
  sideMenu.style.transform = "translateX(0rem)";
});


// cujstom alert box logic implement
function showAlert(message) {
  const alertBox = document.getElementById('customAlert');
  const alertMessage = document.getElementById('alertMessage');
  alertMessage.textContent = message;
  alertBox.style.display = 'block';

  // Automatically hide the alert box after 3 seconds
  setTimeout(() => {
    closeAlert();
  }, 3000);
}

function closeAlert() {
  const alertBox = document.getElementById('customAlert');
  alertBox.style.display = 'none';
}