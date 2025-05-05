// Establish socket connection
const socket = io();

// ------------- CHILD SIDE -------------
if (window.location.pathname.includes("dashboardchild")) {
    // Listen for lock device command
    socket.on("lock_device", (data) => {
        alert("⚠️ Device lock command received. Please stop using now.");
        // Simulate device lock (custom logic can be added here)
        document.body.innerHTML = "<h2 style='text-align:center;'>🔒 Your device is now locked by a parent.</h2>";
    });

    // Listen for alert messages
    socket.on("receive_alert", (data) => {
        alert("🚨 Alert from parent: " + data.message);
    });
}

// ------------- PARENT SIDE -------------
if (window.location.pathname.includes("dashboardparent")) {
    // Example: send alert button
    document.getElementById("sendAlertBtn")?.addEventListener("click", () => {
        const message = prompt("Enter alert message:");
        if (message) {
            fetch("/api/send-alert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) alert("✅ Alert sent!");
                    else alert("❌ Failed to send alert.");
                });
        }
    });

    // Example: lock device button
    document.getElementById("lockDeviceBtn")?.addEventListener("click", () => {
        fetch("/api/lock-device", {
            method: "POST"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) alert("🔒 Lock command sent!");
                else alert("❌ Failed to lock device.");
            });
    });
}
