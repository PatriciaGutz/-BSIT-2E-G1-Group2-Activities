// Date today
document.getElementById("todayDate").innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
});

var tasks = [];
var editIndex = -1;

function saveTask() {
    document.getElementById("nameErr").innerText = "";
    document.getElementById("dateErr").innerText = "";
    document.getElementById("priorityErr").innerText = "";

    var name = document.getElementById("taskName").value;
    var desc = document.getElementById("taskDesc").value;
    var date = document.getElementById("dueDate").value;
    var priority = document.getElementById("priority").value;
    var isValid = true;

    if (name.trim() == "") {
        document.getElementById("nameErr").innerText = "Task name is required.";
        isValid = false;
    }

    if (date == "") {
        document.getElementById("dateErr").innerText = "Please select a due date.";
        isValid = false;
    } else {
        var today = new Date().toISOString().split('T')[0];
        if (date < today) {
            document.getElementById("dateErr").innerText = "Date cannot be in the past.";
            isValid = false;
        }
    }

    if (priority == "") {
        document.getElementById("priorityErr").innerText = "Please select a priority.";
        isValid = false;
    }

    if (isValid == false) return;

    var taskObj = {
        name: name,
        description: desc,
        date: date,
        priority: priority,
        isCompleted: false
    };

    if (editIndex == -1) {
        tasks.push(taskObj);
    } else {
        tasks[editIndex] = taskObj;
        editIndex = -1;
        document.getElementById("submitBtn").innerText = "Save Task Data";
        document.getElementById("submitBtn").className = "btn btn-purple w-100 fw-bold";
    }

    document.getElementById("taskForm").reset();
    renderTable();
}

function renderTable() {
    var body = document.getElementById("taskTableBody");
    body.innerHTML = "";

    if (tasks.length > 0) {
        document.getElementById("outputSection").style.display = "block";
    } else {
        document.getElementById("outputSection").style.display = "none";
    }

    for (var i = 0; i < tasks.length; i++) {
        var t = tasks[i];
        var pClass = "";
        if (t.priority == "High") pClass = "border-high";
        else if (t.priority == "Medium") pClass = "border-medium";
        else pClass = "border-low";

        var sClass = (t.isCompleted) ? "task-done" : "";
        var statusLabel = t.isCompleted 
            ? '<span class="badge bg-success">Completed</span>' 
            : '<span class="badge bg-secondary">Pending</span>';

        var row = "<tr class='" + pClass + " " + sClass + "'>";
            row += "<td class='fw-bold'>" + t.name + "</td>";
            row += "<td><small>" + (t.description || "---") + "</small></td>";
            row += "<td>" + t.date + "</td>";
            row += "<td>" + t.priority + "</td>";
            row += "<td>" + statusLabel + "</td>";
            row += "<td class='text-center'>";
            row += "<button class='btn btn-sm btn-success me-1' onclick='toggle(" + i + ")'>" + (t.isCompleted ? "Undo" : "Done") + "</button>";
            row += "<button class='btn btn-sm btn-primary me-1' onclick='edit(" + i + ")'>Edit</button>";
            row += "<button class='btn btn-sm btn-danger' onclick='del(" + i + ")'>Delete</button>";
            row += "</td>";
            row += "</tr>";

        body.innerHTML += row;
    }
}

function toggle(i) {
    tasks[i].isCompleted = !tasks[i].isCompleted;
    renderTable();
}

function del(i) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(i, 1);
        renderTable();
    }
}

function edit(i) {
    var t = tasks[i];
    document.getElementById("taskName").value = t.name;
    document.getElementById("taskDesc").value = t.description;
    document.getElementById("dueDate").value = t.date;
    document.getElementById("priority").value = t.priority;

    editIndex = i;
    document.getElementById("submitBtn").innerText = "Update Task Data";
    document.getElementById("submitBtn").className = "btn btn-warning w-100 fw-bold text-dark";
}