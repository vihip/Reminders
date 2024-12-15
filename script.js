document.addEventListener('DOMContentLoaded', function () {
    const reminderForm = document.getElementById('reminderForm');
    const reminderInput = document.getElementById('reminderInput');
    const reminderDate = document.getElementById('reminderDate');
    const reminderList = document.getElementById('reminderList');

    // Load reminders from localStorage
    const loadReminders = () => {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminderList.innerHTML = '';
        reminders.forEach((reminder, index) => {
            const li = document.createElement('li');
            const dueDate = new Date(reminder.dueDate).toLocaleString();
            li.innerHTML = `
                ${reminder.text} <br>
                <strong>Due:</strong> ${dueDate}
                <button onclick="deleteReminder(${index})">Delete</button>
            `;
            reminderList.appendChild(li);

            // Check if the reminder is due now and show a notification
            const timeUntilReminder = new Date(reminder.dueDate) - new Date();
            if (timeUntilReminder <= 0) {
                showNotification(reminder.text);
            } else {
                // Schedule notification if it's not due yet
                setTimeout(() => showNotification(reminder.text), timeUntilReminder);
            }
        });
    };

    // Show browser notification
    const showNotification = (message) => {
        if (Notification.permission === "granted") {
            new Notification("Reminder Alert", {
                body: message,
                icon: "https://via.placeholder.com/48"
            });
        }
    };

    // Request notification permission on first load
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    // Add a new reminder
    reminderForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const reminderText = reminderInput.value.trim();
        const dueDateValue = reminderDate.value;

        if (reminderText && dueDateValue) {
            const reminder = {
                text: reminderText,
                dueDate: new Date(dueDateValue).toISOString(),
            };

            const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
            reminders.push(reminder);
            localStorage.setItem('reminders', JSON.stringify(reminders));

            reminderInput.value = '';
            reminderDate.value = '';
            loadReminders();
        }
    });

    // Delete a reminder
    window.deleteReminder = (index) => {
        const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
        reminders.splice(index, 1);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        loadReminders();
    };

    // Initial load
    loadReminders();
});
