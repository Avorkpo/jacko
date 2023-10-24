const attendanceTableBody = document.getElementById("attendanceTableBody");
const attendanceForm = document.getElementById("attendanceForm");
const attendanceModal = document.getElementById("attendanceModal");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
let attendanceData = [];

// Showing the modal form (add or edit)
function showModal(type, attendanceIndex) {
    attendanceModal.style.display = "block";

    if (type === "add") {
        modalTitle.textContent = "Add New Attendance Entry";
        attendanceForm.reset();
        submitBtn.textContent = "Submit";
        submitBtn.removeEventListener("click", editAttendance);
        submitBtn.addEventListener("click", addAttendance);
    } else if (type === "edit") {
        modalTitle.textContent = "Edit Attendance Entry";
        const attendance = attendanceData[attendanceIndex];
        document.getElementById("attendanceId").value = attendanceIndex;
        document.getElementById("employeeId").value = attendance.employeeId;
        document.getElementById("employeeName").value = attendance.employeeName;
        document.getElementById("department").value = attendance.department;
        document.getElementById("date").value = attendance.date;
        document.getElementById("clockInTime").value = attendance.clockInTime;
        document.getElementById("clockOutTime").value = attendance.clockOutTime;
        document.getElementById("totalHours").value = attendance.totalHours;
        document.getElementById("status").value = attendance.status;
        submitBtn.textContent = "Save Changes";
        submitBtn.removeEventListener("click", addAttendance);
        submitBtn.addEventListener("click", editAttendance);
    }
}


function hideModal() {
    attendanceModal.style.display = "none";
}


function addAttendance(event) {
    event.preventDefault();
    const employeeId = document.getElementById("employeeId").value;
    const employeeName = document.getElementById("employeeName").value;
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;
    const clockInTime = document.getElementById("clockInTime").value;
    const clockOutTime = document.getElementById("clockOutTime").value;
    const totalHours = parseFloat(document.getElementById("totalHours").value);
    const status = document.getElementById("status").value;

    const attendance = {
        employeeId,
        employeeName,
        department,
        date,
        clockInTime,
        clockOutTime,
        totalHours,
        status
    };

    attendanceData.push(attendance);
    updateAttendanceTable();
    hideModal();
}


function editAttendance(event) {
    event.preventDefault();
    const attendanceIndex = document.getElementById("attendanceId").value;
    const employeeId = document.getElementById("employeeId").value;
    const employeeName = document.getElementById("employeeName").value;
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;
    const clockInTime = document.getElementById("clockInTime").value;
    const clockOutTime = document.getElementById("clockOutTime").value;
    const totalHours = parseFloat(document.getElementById("totalHours").value);
    const status = document.getElementById("status").value;

    const attendance = {
        employeeId,
        employeeName,
        department,
        date,
        clockInTime,
        clockOutTime,
        totalHours,
        status
    };

    attendanceData[attendanceIndex] = attendance;
    updateAttendanceTable();
    hideModal();
}


function deleteAttendance(attendanceIndex) {
    if (confirm("Are you sure you want to delete this attendance entry?")) {
        attendanceData.splice(attendanceIndex, 1);
        updateAttendanceTable();
    }
}


function updateAttendanceTable() {
    attendanceTableBody.innerHTML = "";

    attendanceData.forEach((attendance, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${attendance.employeeId}</td>
            <td>${attendance.employeeName}</td>
            <td>${attendance.department}</td>
            <td>${attendance.date}</td>
            <td>${attendance.clockInTime}</td>
            <td>${attendance.clockOutTime}</td>
            <td>${attendance.totalHours}</td>
            <td>${attendance.status}</td>
            <td>
                <button class="edit-button" onclick="showModal('edit', ${index})">Edit</button>
                <button class="delete-button" onclick="deleteAttendance(${index})">Delete</button>
            </td>
        `;
        attendanceTableBody.appendChild(row);
    });
}


function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem("attendanceData");
    if (storedData) {
        attendanceData = JSON.parse(storedData);
        updateAttendanceTable();
    }
}


function saveDataToLocalStorage() {
    localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
}


attendanceForm.addEventListener("submit", addAttendance);
cancelBtn.addEventListener("click", hideModal);
window.addEventListener("load", loadDataFromLocalStorage);
window.addEventListener("beforeunload", saveDataToLocalStorage);
