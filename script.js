const user = localStorage.getItem('currentUser');
const storageKeyPrefix = 'tasks-' + user;
const streakKey = 'streak-' + user;

const welcomeUser = document.getElementById('welcome-user');
if (welcomeUser) {
    welcomeUser.textContent = `Welcome, ${user}!`;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

window.onload = function() {
    const tasks = document.querySelectorAll('#daily-routine li');
    const savedTasks = JSON.parse(localStorage.getItem(storageKeyPrefix)) || [];
    
    tasks.forEach((li, index) => {
        if (savedTasks[index]) {
            li.classList.add('completed');
            li.querySelector('button').textContent = 'Completed!';
        }
    });

    const lastLogin = localStorage.getItem('lastLogin-' + user);
    const today = new Date().toDateString();
    let streak = parseInt(localStorage.getItem(streakKey)) || 0;

    if (lastLogin && lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastLogin !== yesterday.toDateString()) {
            streak = 0;
        }
    }
    document.getElementById('streak-text').textContent = `Current streak: ${streak} days`;
    localStorage.setItem('lastLogin-' + user, today);
    localStorage.setItem(streakKey, streak);

    updateProgress();
};

function markComplete(button) {
    const li = button.closest('li');
    const tasks = document.querySelectorAll('#daily-routine li');
    const index = Array.from(tasks).indexOf(li);

    li.classList.toggle('completed');
    button.textContent = li.classList.contains('completed') ? 'Completed!' : 'Complete';

    const tasksStatus = Array.from(tasks).map(task => task.classList.contains('completed'));
    localStorage.setItem(storageKeyPrefix, JSON.stringify(tasksStatus));

    updateProgress();
}

function updateProgress() {
    const tasks = document.querySelectorAll('#daily-routine li');
    const completedTasks = document.querySelectorAll('#daily-routine li.completed');
    const progressPercent = Math.round((completedTasks.length / tasks.length) * 100);

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    progressBar.style.width = progressPercent + '%';
    progressText.textContent = progressPercent + '% completed';

    if (progressPercent < 50) progressBar.style.backgroundColor = '#e74c3c';
    else if (progressPercent < 80) progressBar.style.backgroundColor = '#f1c40f';
    else progressBar.style.backgroundColor = '#2ecc71';

    const streakText = document.getElementById('streak-text');
    let streak = parseInt(localStorage.getItem(streakKey)) || 0;
    if (progressPercent === 100) {
        streak++;
        localStorage.setItem(streakKey, streak);
        streakText.textContent = `Current streak: ${streak} days`;
    }
}

function resetDay() {
    if (!confirm("Are you sure you want to reset today's tasks?")) return;

    const tasks = document.querySelectorAll('#daily-routine li');
    tasks.forEach(task => {
        task.classList.remove('completed');
        task.querySelector('button').textContent = 'Complete';
    });

    localStorage.setItem(storageKeyPrefix, JSON.stringify(tasks.map(() => false)));

    updateProgress();
}
