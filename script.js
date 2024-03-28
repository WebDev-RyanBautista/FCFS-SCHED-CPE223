function generateInputs() {
    var numProcesses = document.getElementById('num-processes').value;
    var processInputs = document.getElementById('process-inputs');
    processInputs.innerHTML = '';

    for (var i = 0; i < numProcesses; i++) {
        processInputs.innerHTML += '<div class="process"><label for="arrival-time-' + i + '">Arrival Time for Process ' + (i + 1) + ':</label><input type="number" id="arrival-time-' + i + '" min="0" placeholder="e.g., 0"><label for="burst-time-' + i + '">Burst Time for Process ' + (i + 1) + ':</label><input type="number" id="burst-time-' + i + '" min="1" placeholder="e.g., 3"></div>';
    }
}

function calculateFCFS() {
    var numProcesses = document.getElementById('num-processes').value;
    var results = [];
    var currentTime = 0;

    for (var i = 0; i < numProcesses; i++) {
        var arrivalTime = document.getElementById('arrival-time-' + i).value;
        var burstTime = document.getElementById('burst-time-' + i).value;
        var finishTime = Math.max(currentTime, arrivalTime) + parseInt(burstTime);
        var turnaroundTime = finishTime - arrivalTime;
        var waitingTime = turnaroundTime - burstTime;
        results.push({
            arrival: arrivalTime,
            burst: burstTime,
            finish: finishTime,
            turnaround: turnaroundTime,
            waiting: waitingTime
        });
        currentTime = finishTime;
    }

    var table = document.getElementById('result-table');
    table.innerHTML = '<tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Finish Time</th><th>Turnaround Time</th><th>Waiting Time</th></tr>';
    results.forEach(function(result, index) {
        table.innerHTML += '<tr><td>' + (index + 1) + '</td><td>' + result.arrival + '</td><td>' + result.burst + '</td><td>' + result.finish + '</td><td>' + result.turnaround + '</td><td>' + result.waiting + '</td></tr>';
    });

    // Calculate averages
    var totalTurnaroundTime = results.reduce((sum, result) => sum + result.turnaround, 0);
    var totalWaitingTime = results.reduce((sum, result) => sum + result.waiting, 0);
    var averageTurnaroundTime = totalTurnaroundTime / numProcesses;
    var averageWaitingTime = totalWaitingTime / numProcesses;

    console.log('Average Turnaround Time (TAT):', averageTurnaroundTime);
    console.log('Average Waiting Time (WT):', averageWaitingTime);

    // Calculate CPU utilization (assuming total burst time is known)
    var totalBurstTime = results.reduce((sum, result) => sum + parseInt(result.burst), 0);
    var totalTime = currentTime; // Adjust as needed
    var cpuUtilization = (totalBurstTime / totalTime) * 100;
    console.log('CPU Utilization:', cpuUtilization.toFixed(2) + '%');
}

function updateBackground() {
    var imageUrl = document.getElementById('background-image-url').value;
    document.getElementById('background-image-container').style.backgroundImage = 'url(' + imageUrl + ')';
}
function toggleTable() {
    const table = document.getElementById("result-table");
    if (table.style.display === "none") {
        table.style.display = "table"; // Show the table
    } else {
        table.style.display = "none"; // Hide the table
    }
}

const msg = new SpeechSynthesisUtterance();
msg.text = "";
window.speechSynthesis.speak(msg); // Play the message

