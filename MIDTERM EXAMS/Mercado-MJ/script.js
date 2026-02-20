const taskForm = document.getElementById("taskForm");
const taskBody = document.getElementById("taskBody");
const submitBtn = document.getElementById("submitBtn");

let editMode = false;
let editRow = null;

//Prevent past due dates
const today = new Date().toISOString().split("T")[0];
document.getElementById("dueDate").setAttribute("min", today);

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("taskName").value;
  const desc = document.getElementById("taskDesc").value;
  const priority = document.getElementById("priority").value;
  const date = document.getElementById("dueDate").value;

  if (editMode) {
    // Edit Task Logic
    editRow.cells[0].innerText = title;
    editRow.cells[1].innerText = desc;
    editRow.cells[2].innerText = priority;
    editRow.cells[2].className = `prio-${priority}`;
    editRow.cells[3].innerText = date;

    Swal.fire("Updated!", "Your changes have been saved.", "success");
    editMode = false;
    submitBtn.innerText = "Save Task";
  } else {
    // Add Task Logic
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${title}</td>
            <td>${desc}</td>
            <td class="prio-${priority}">${priority}</td>
            <td>${date}</td>
            <td class="status-cell">Pending</td>
            <td>
                <button class="action-btn btn-done" onclick="toggleTask(this)">Done</button>
                <button class="action-btn btn-edit" onclick="prepareEdit(this)">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteTask(this)">Delete</button>
            </td>
        `;
    taskBody.appendChild(row);
    Swal.fire("Success!", "New task added successfully.", "success");
  }
  taskForm.reset();
});

// Delete Logic (Correct removal)
function deleteTask(btn) {
  Swal.fire({
    title: "Delete Task?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      btn.closest("tr").remove();
      Swal.fire("Deleted!", "Task removed.", "success");
    }
  });
}

// Complete Toggle (Visual update)
function toggleTask(btn) {
  const row = btn.closest("tr");
  row.classList.toggle("completed");
  const statusCell = row.querySelector(".status-cell");

  if (row.classList.contains("completed")) {
    statusCell.innerText = "Completed";
    Swal.fire({ title: "Amazing!", text: "Task finished!", icon: "success" });
  } else {
    statusCell.innerText = "Pending";
  }
}

// Prepare Edit Function
function prepareEdit(btn) {
  editMode = true;
  editRow = btn.closest("tr");

  document.getElementById("taskName").value = editRow.cells[0].innerText;
  document.getElementById("taskDesc").value = editRow.cells[1].innerText;
  document.getElementById("priority").value = editRow.cells[2].innerText;
  document.getElementById("dueDate").value = editRow.cells[3].innerText;

  submitBtn.innerText = "Update Task";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
