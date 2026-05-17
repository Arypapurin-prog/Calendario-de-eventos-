const form = document.getElementById('eventForm');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const categoryInput = document.getElementById('category');
const eventList = document.getElementById('eventList');
const message = document.getElementById('message');
const totalEvents = document.getElementById('totalEvents');

let events = JSON.parse(localStorage.getItem('events')) || [];

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function updateStats() {
    totalEvents.textContent = events.length;
}

function renderEvents() {
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <div>
                <strong>${event.title}</strong><br>
                📅 ${event.date}<br>
                🏷️ ${event.category}
            </div>

            <div class="actions">
                <button onclick="editEvent(${index})">Editar</button>
                <button onclick="deleteEvent(${index})">Eliminar</button>
            </div>
        `;

        eventList.appendChild(li);
    });

    updateStats();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;
    const category = categoryInput.value.trim();

    if (title === '' || date === '' || category === '') {
        message.textContent = 'Todos los campos son obligatorios';
        return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    if (date < currentDate) {
renderEvents();