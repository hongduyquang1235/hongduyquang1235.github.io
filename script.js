// Load completed tasks from localStorage on page load
window.onload = function() {
    const tasks = document.querySelectorAll('#daily-routine li');
    tasks.forEach((li, index) => {
        if (localStorage.getItem('task-' + index) === 'completed') {
            li.classList.add('completed');
            li.querySelector('button').textContent = 'Completed!';
        }
    });
    updateProgress();
};

function markComplete(button) {
    const li = button.closest('li');
    const index = Array.from(document.querySelectorAll('#daily-routine li')).indexOf(li);

    li.classList.toggle('completed');
    button.textContent = li.classList.contains('completed') ? 'Completed!' : 'Complete';

    // Save status in localStorage
    localStorage.setItem('task-' + index, li.classList.contains('completed') ? 'completed' : 'incomplete');

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
}
