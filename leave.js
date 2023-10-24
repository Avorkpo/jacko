const leaveTableBody = document.getElementById("leaveTableBody");
const leaveForm = document.getElementById("leaveForm");
const leaveModal = document.getElementById("leaveModal");
const modalTitle = document.getElementById("modalTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
let leaveData = [];


function showModal(type, leaveIndex) {
    leaveModal.style.display = "block";

    if (type === "add") {
        modalTitle.textContent = "Add New Leave Application";
        leaveForm.reset();
        submitBtn.textContent = "Submit";
        submitBtn.removeEventListener("click", editLeave);
        submitBtn.addEventListener("click", addLeave);
    } else if (type === "edit") {
        modalTitle.textContent = "Edit Leave Application";
        const leave = leaveData[leaveIndex];
        document.getElementById("leaveId").value = leaveIndex;
        document.getElementById("employeeId").value = leave.employeeId;
        document.getElementById("name").value = leave.name;
        document.getElementById("department").value = leave.department;
        document.getElementById("phoneNumber").value = leave.phoneNumber;
        document.getElementById("reason").value = leave.reason;
        document.getElementById("startingDate").value = leave.startingDate;
        document.getElementById("endingDate").value = leave.endingDate;
        document.getElementById("approved").value = leave.approved.toString();
        submitBtn.textContent = "Save Changes";
        submitBtn.removeEventListener("click", addLeave);
        submitBtn.addEventListener("click", editLeave);
    }
}



function hideModal() {
    leaveModal.style.display = "none";
}

function addLeave(event) {
    event.preventDefault();
    const employeeId = document.getElementById("employeeId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const reason = document.getElementById("reason").value;
    const startingDate = document.getElementById("startingDate").value;
    const endingDate = document.getElementById("endingDate").value;
    const approved = document.getElementById("approved").value === "true";
    const enteredDate = new Date().toLocaleDateString();

    const leave = {
        employeeId,
        name,
        department,
        phoneNumber,
        reason,
        startingDate,
        endingDate,
        approved,
        enteredDate
    };

    leaveData.push(leave);
    updateLeaveTable();
    hideModal();
}


function editLeave(event) {
    event.preventDefault();
    const leaveIndex = document.getElementById("leaveId").value;
    const employeeId = document.getElementById("employeeId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const reason = document.getElementById("reason").value;
    const startingDate = document.getElementById("startingDate").value;
    const endingDate = document.getElementById("endingDate").value;
    const approved = document.getElementById("approved").value === "true";
    const enteredDate = leaveData[leaveIndex].enteredDate;

    const leave = {
        employeeId,
        name,
        department,
        phoneNumber,
        reason,
        startingDate,
        endingDate,
        approved,
        enteredDate
    };

    leaveData[leaveIndex] = leave;
    updateLeaveTable();
    hideModal();
}

function deleteLeave(leaveIndex) {
    if (confirm("Are you sure you want to delete this leave application?")) {
        leaveData.splice(leaveIndex, 1);
        updateLeaveTable();
    }
}

function updateLeaveTable() {
    leaveTableBody.innerHTML = "";

    let totalLeaves = 0;
    let approvedLeaves = 0;
    let pendingLeaves = 0;

    leaveData.forEach((leave, index) => {
        totalLeaves++;
        if (leave.approved) {
            approvedLeaves++;
        } else {
            pendingLeaves++;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${leave.employeeId}</td>
            <td>${leave.name}</td>
            <td>${leave.department}</td>
            <td>${leave.phoneNumber}</td>
            <td>${leave.reason}</td>
            <td>${leave.startingDate}</td>
            <td>${leave.endingDate}</td>
            <td>${leave.approved ? "Yes" : "No"}</td>
            <td>${leave.enteredDate}</td>
            <td>
                <button class="edit-button" onclick="showModal('edit', ${index})">Edit</button>
                <button class="delete-button" onclick="deleteLeave(${index})">Delete</button>
            </td>
        `;
        leaveTableBody.appendChild(row);
    });

    document.getElementById("totalLeaves").textContent = totalLeaves;
    document.getElementById("approvedLeaves").textContent = approvedLeaves;
    document.getElementById("pendingLeaves").textContent = pendingLeaves;
}

function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem("leaveData");
    if (storedData) {
        leaveData = JSON.parse(storedData);
        updateLeaveTable();
    }
}


function saveDataToLocalStorage() {
    localStorage.setItem("leaveData", JSON.stringify(leaveData));
}


leaveForm.addEventListener("submit", addLeave);
cancelBtn.addEventListener("click", hideModal);
window.addEventListener("load", loadDataFromLocalStorage);
window.addEventListener("beforeunload", saveDataToLocalStorage);
