
const overlay = document.getElementById("overlay");
const formContainer = document.getElementById("formContainer");

document.addEventListener("DOMContentLoaded", function () {
  const departmentTitle = document.getElementById("departmentTitle");
  const departmentHeader = document.getElementById("departmentHeader");
  const employeeProfileContainer = document.getElementById("employeeProfileContainer");

  const urlParams = new URLSearchParams(window.location.search);
  const department = urlParams.get("department");

  departmentTitle.textContent = `${department} Department`;
  departmentHeader.textContent = `${department} Department`;

  const employees = JSON.parse(localStorage.getItem("employees")) || {
    Sales: [],
    Technical: [],
    HR: [],
    Telecalling: [],
  };

  let editIndex = -1; // Track the index of the employee being edited

  if (employees[department] && employees[department].length > 0) {
    employees[department].forEach((employee, index) => {
      const profileCard = document.createElement("div");
      profileCard.classList.add("profile-card");

      const imgDiv = document.createElement("div");
      imgDiv.classList.add("imgDiv");
      const gender = employee.selectedGender.toLowerCase();
      imgDiv.innerHTML =
        gender === "male"
          ? `<img class="avtarImg" src="https://avatar.iran.liara.run/public/boy?username=[${employee.name}]" alt="">`
          : `<img class="avtarImg" src="https://avatar.iran.liara.run/public/girl?username=[${employee.name}]" alt="">`;

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("info");
      nameDiv.innerHTML = `<label>Name:</label> ${employee.name}`;

      const salaryDiv = document.createElement("div");
      salaryDiv.classList.add("info");
      salaryDiv.innerHTML = `<label>Salary:</label>${employee.salary}`;

      const designationDiv = document.createElement("div");
      designationDiv.classList.add("info");
      designationDiv.innerHTML = `<label>Designation:</label> ${employee.designation}`;

      const emailDiv = document.createElement("div");
      emailDiv.classList.add("info");
      emailDiv.innerHTML = `<label>Email:</label> ${employee.email}`;

      const genderDiv = document.createElement("div");
      genderDiv.classList.add("info");
      genderDiv.innerHTML = `<label>Gender:</label> ${employee.selectedGender}`;

      const actionsDiv = document.createElement("div");
      actionsDiv.classList.add("actions" , "hidden");

      const editIcon = document.createElement("i");
      editIcon.classList.add("fas", "fa-edit");

      editIcon.addEventListener("click", () => {
        console.log("edit");

        overlay.classList.add("active");
        formContainer.classList.remove("hidden");

        // Pre-fill the form with existing employee data
        document.getElementById("name").value = employee.name;
        document.getElementById("salary").value = employee.salary;
        document.getElementById("designation").value = employee.designation;
        document.getElementById("department").value = department;
        document.getElementById("email").value = employee.email;
        document.querySelector(`input[name="gender"][value="${employee.selectedGender}"]`).checked = true;

        // Set the edit index to the current employee
        editIndex = index;
      });

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt");
      deleteIcon.addEventListener("click", () => {
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
          employees[department].splice(index, 1);
          localStorage.setItem("employees", JSON.stringify(employees));
          profileCard.remove();
        }
      });

      actionsDiv.appendChild(editIcon);
      actionsDiv.appendChild(deleteIcon);
      profileCard.appendChild(imgDiv);
      profileCard.appendChild(nameDiv);
      profileCard.appendChild(salaryDiv);
      profileCard.appendChild(designationDiv);
      profileCard.appendChild(emailDiv);
      profileCard.appendChild(genderDiv);
      profileCard.appendChild(actionsDiv);

      employeeProfileContainer.appendChild(profileCard);
    });
  } else {
    employeeProfileContainer.innerHTML = `<p>No employees found in the ${department} Department.</p>`;
  }

  const employeeForm = document.getElementById("employeeForm");
  employeeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const salary = document.getElementById("salary").value;
    const designation = document.getElementById("designation").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;
    const selectedGender = document.querySelector('input[name="gender"]:checked').value;

    if (editIndex !== -1) {
      // Update existing employee
      employees[department][editIndex] = { name, salary, designation, email, selectedGender };
    } else {
      // Add new employee
      employees[department].push({ name, salary, designation, email, selectedGender });
      alert(`${name} has been added to ${department} department.`);
    }

    localStorage.setItem("employees", JSON.stringify(employees));
    window.location.reload();
  });

  const register_Btn = document.getElementById("register-Btn");
  register_Btn.addEventListener("click", () => {
    overlay.classList.add("active");
    formContainer.classList.remove("hidden");

    // Reset editIndex to -1 to ensure it's a new entry
    editIndex = -1;

    // Clear form fields
    employeeForm.reset();
  });

  let formClose = document.getElementById("formClose");
  formClose.addEventListener("click", () => {
    formContainer.classList.add("hidden");
    overlay.classList.remove("active");
  });
});

function redirectToMainPage() {
  window.location.href = "MainProfile.html";
}

function redirectToDepartment(department) {
  window.location.href = `department.html?department=${department}`;
}

// Side bar functionality
let sideMenu = document.getElementById("sideMenu");
let openBars = document.getElementById("openBars");
let closeBar = document.getElementById("closeBar");

openBars.addEventListener("click", () => {
  sideMenu.classList.add("active")
 });
 closeBar.addEventListener("click", () => {
   sideMenu.classList.remove("active")
 });
 sideMenu.addEventListener("mouseleave", () => {
   sideMenu.classList.remove("active")
 });

 // sign_out functionality
function signOut() {
  window.location.href = "index.html";
}