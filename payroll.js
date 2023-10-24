// Sample data for initial testing
let payrollData = [];

// Function to save payroll data to local storage
function savePayrollDataToLocalStorage() {
  localStorage.setItem("payrollData", JSON.stringify(payrollData));
}

// Function to load payroll data from local storage
function loadPayrollDataFromLocalStorage() {
  const data = localStorage.getItem("payrollData");
  if (data) {
    payrollData = JSON.parse(data);
  }
}

// Function to display payroll data in the table
function displayPayrollData() {
  const payrollTableBody = document.getElementById("payrollTableBody");
  payrollTableBody.innerHTML = "";

  payrollData.forEach((payroll, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${payroll.employeeId}</td>
      <td>${payroll.employeeName}</td>
      <td>${payroll.department}</td>
      <td>${payroll.designation}</td>
      <td>$${payroll.basicSalary.toFixed(2)}</td>
      <td>${payroll.overtimeHours}</td>
      <td>$${payroll.overtimeRate.toFixed(2)}</td>
      <td>$${payroll.totalEarnings.toFixed(2)}</td>
      <td>$${payroll.deductions.toFixed(2)}</td>
      <td>$${payroll.netSalary.toFixed(2)}</td>
      <td>${payroll.paymentDate}</td>
      <td>
        <button class="edit-button" onclick="editPayroll(${index})">Edit</button>
        <button class="delete-button" onclick="deletePayroll(${index})">Delete</button>
      </td>
    `;
    payrollTableBody.appendChild(row);
  });

  updatePayrollStatistics();
}

// Function to update payroll statistics
function updatePayrollStatistics() {
  const employeesPaid = payrollData.filter((payroll) => payroll.status === "Paid").length;
  const totalSalary = payrollData.reduce((total, payroll) => total + payroll.netSalary, 0);

  document.getElementById("employeesPaid").textContent = employeesPaid;
  document.getElementById("totalSalary").textContent = "$" + totalSalary.toFixed(2);
}

// Function to show the payroll modal
function showPayrollModal() {
  const payrollModal = document.getElementById("payrollModal");
  payrollModal.style.display = "block";

  document.getElementById("modalTitle").textContent = "Add New Payroll Entry";
  document.getElementById("payrollForm").reset();
  document.getElementById("submitBtn").textContent = "Submit";
  document.getElementById("submitBtn").removeEventListener("click", editPayroll);
  document.getElementById("submitBtn").addEventListener("click", addPayroll);
}

// Function to hide the payroll modal
function hidePayrollModal() {
  const payrollModal = document.getElementById("payrollModal");
  payrollModal.style.display = "none";
}

// Function to add a new payroll entry
function addPayroll(event) {
  event.preventDefault();
  const employeeId = document.getElementById("employeeId").value;
  const employeeName = document.getElementById("employeeName").value;
  const department = document.getElementById("department").value;
  const designation = document.getElementById("designation").value;
  const basicSalary = parseFloat(document.getElementById("basicSalary").value);
  const overtimeHours = parseFloat(document.getElementById("overtimeHours").value);
  const overtimeRate = parseFloat(document.getElementById("overtimeRate").value);
  const totalEarnings = parseFloat(document.getElementById("totalEarnings").value);
  const deductions = parseFloat(document.getElementById("deductions").value);
  const netSalary = parseFloat(document.getElementById("netSalary").value);
  const paymentDate = document.getElementById("paymentDate").value;

  const payroll = {
    employeeId,
    employeeName,
    department,
    designation,
    basicSalary,
    overtimeHours,
    overtimeRate,
    totalEarnings,
    deductions,
    netSalary,
    paymentDate,
    status: "Paid", // Assuming all new entries are paid initially
  };

  payrollData.push(payroll);
  displayPayrollData();
  hidePayrollModal();

  // Save data to local storage
  savePayrollDataToLocalStorage();
}

// Function to edit an existing payroll entry
function editPayroll(index) {
  const payrollModal = document.getElementById("payrollModal");
  payrollModal.style.display = "block";

  const payroll = payrollData[index];
  document.getElementById("employeeId").value = payroll.employeeId;
  document.getElementById("employeeName").value = payroll.employeeName;
  document.getElementById("department").value = payroll.department;
  document.getElementById("designation").value = payroll.designation;
  document.getElementById("basicSalary").value = payroll.basicSalary;
  document.getElementById("overtimeHours").value = payroll.overtimeHours;
  document.getElementById("overtimeRate").value = payroll.overtimeRate;
  document.getElementById("totalEarnings").value = payroll.totalEarnings;
  document.getElementById("deductions").value = payroll.deductions;
  document.getElementById("netSalary").value = payroll.netSalary;
  document.getElementById("paymentDate").value = payroll.paymentDate;

  document.getElementById("submitBtn").textContent = "Update";
  document.getElementById("submitBtn").removeEventListener("click", addPayroll);
  document.getElementById("submitBtn").addEventListener("click", function (event) {
    event.preventDefault();
    updatePayroll(index);
  });
}

// Function to update an existing payroll entry
function updatePayroll(index) {
  const employeeId = document.getElementById("employeeId").value;
  const employeeName = document.getElementById("employeeName").value;
  const department = document.getElementById("department").value;
  const designation = document.getElementById("designation").value;
  const basicSalary = parseFloat(document.getElementById("basicSalary").value);
  const overtimeHours = parseFloat(document.getElementById("overtimeHours").value);
  const overtimeRate = parseFloat(document.getElementById("overtimeRate").value);
  const totalEarnings = parseFloat(document.getElementById("totalEarnings").value);
  const deductions = parseFloat(document.getElementById("deductions").value);
  const netSalary = parseFloat(document.getElementById("netSalary").value);
  const paymentDate = document.getElementById("paymentDate").value;

  const payroll = {
    employeeId,
    employeeName,
    department,
    designation,
    basicSalary,
    overtimeHours,
    overtimeRate,
    totalEarnings,
    deductions,
    netSalary,
    paymentDate,
  };

  payrollData[index] = payroll;
  displayPayrollData();
  hidePayrollModal();

  // Save data to local storage
  savePayrollDataToLocalStorage();
}

// Function to delete a payroll entry
function deletePayroll(index) {
  if (confirm("Are you sure you want to delete this payroll entry?")) {
    payrollData.splice(index, 1);
    displayPayrollData();

    // Save data to local storage
    savePayrollDataToLocalStorage();
  }
}

// Function to print the payroll table
function printPayrollTable() {
  const table = document.getElementById("payrollTable");
  const tableWindow = window.open("", "_blank");
  const tableHTML = table.outerHTML;

  tableWindow.document.open();
  tableWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Print Payroll Table</title>
        <style>
            /* Add any custom print styles here (optional) */
            body {
                font-family: Arial, sans-serif;
            }
            table {
                width: 100%;
                border-collapse: collapse;
            }
            table th,
            table td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
        </style>
    </head>
    <body>
        ${tableHTML}
    </body>
    </html>
  `);
  tableWindow.document.close();

  // Call the print function on the newly opened window
  tableWindow.print();
}

// Add event listeners for buttons and form submission
document.getElementById("addPayrollBtn").addEventListener("click", showPayrollModal);
document.getElementById("cancelBtn").addEventListener("click", hidePayrollModal);
document.getElementById("payrollForm").addEventListener("submit", addPayroll);

// Display initial payroll data
loadPayrollDataFromLocalStorage();
displayPayrollData();
