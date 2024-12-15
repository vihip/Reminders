// script.js

// Get the input field and the reminder list
const reminderInput = document.getElementById("reminderInput");
const reminderList = document.getElementById("reminderList");

// Function to add a reminder
function addReminder() {
  const reminderText = reminderInput.value.trim();

  // Ensure reminder text is not empty
  if (reminderText !== "") {
    const li = document.createElement("li");

    // Create text node for the reminder and append to the li element
    const textNode = document.createTextNode(reminderText);
    li.appendChild(textNode);

    // Create remove button and append to the li element
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      reminderList.removeChild(li); // Remove the reminder from the list
    };
    li.appendChild(removeButton);

    // Append the li element to the reminder list
    reminderList.appendChild(li);

    // Clear the input field after adding the reminder
    reminderInput.value = "";
  } else {
    alert("Please enter a reminder!");
  }
}

// Allow user to press Enter to add a reminder
reminderInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addReminder();
  }
});