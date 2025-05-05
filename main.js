// Handle Login/Signup tab switching
function showTab(tab) {
    document.getElementById('login-tab').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('signup-tab').style.display = tab === 'signup' ? 'block' : 'none';
    document.getElementById('login-btn').classList.toggle('active', tab === 'login');
    document.getElementById('signup-btn').classList.toggle('active', tab === 'signup');
}

// Function to show the child’s activity on the Parent Dashboard
function showActivity() {
    const activityList = document.getElementById('activity-list');
    activityList.innerHTML = '';  // Clear previous content

    // Dummy data (this will eventually come from backend)
    const activities = [
        { app: 'YouTube', time: '1 hour' },
        { app: 'Instagram', time: '30 minutes' },
        { app: 'Facebook', time: '15 minutes' }
    ];

    activities.forEach(activity => {
        const li = document.createElement('li');
        li.textContent = `${activity.app}: ${activity.time}`;
        activityList.appendChild(li);
    });
}

// Function to lock the device (simulate)
function lockDevice() {
    alert("Device has been locked!");
    // Logic to lock the device can be implemented here
}

// Function to send an alert to the child (simulate)
function sendAlert() {
    document.getElementById('alerts-section').style.display = 'block';
}

// Function to send the alert message to the child (simulate)
function sendAlertMessage() {
    const alertMessage = document.getElementById('alert-message').value;
    if (alertMessage) {
        alert("Alert sent to the child: " + alertMessage);
        document.getElementById('alert-message').value = '';  // Clear message field
    } else {
        alert("Please enter an alert message.");
    }
}

// Function to show app usage insights on Child Dashboard
function showUsage() {
    const usageList = document.getElementById('usage-list');
    usageList.innerHTML = '';  // Clear previous content

    // Dummy data (this will eventually come from backend)
    const usage = [
        { app: 'YouTube', time: '1 hour' },
        { app: 'Instagram', time: '30 minutes' },
        { app: 'Facebook', time: '15 minutes' }
    ];

    usage.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.app}: ${item.time}`;
        usageList.appendChild(li);
    });
}
