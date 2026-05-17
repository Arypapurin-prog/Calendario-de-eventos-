script.js
const form = document.getElementById('eventForm');
const titleInput = document.getElementById('title');
const dateInput = document.getElementById('date');
const eventList = document.getElementById('eventList');
const message = document.getElementById('message');

let events = JSON.parse(localStorage.getItem('events')) || [];

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
}

function renderEvents() {
    eventList.innerHTML = '';

    events.forEach((event, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <span>${event.title} - ${event.date}</span>
            <div class="actions">
                <button onclick="editEvent(${index})">Editar</button>
                <button onclick="deleteEvent(${index})">Eliminar</button>
            </div>
        `;

        eventList.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const date = dateInput.value;

    if (title === '' || date === '') {
        message.textContent = 'Todos los campos son obligatorios';
        return;
    }

    message.textContent = '';

    events.push({ title, date });

    saveEvents();
    renderEvents();

    form.reset();
});

function deleteEvent(index) {
    events.splice(index, 1);
    saveEvents();
    renderEvents();
}

function editEvent(index) {
    const newTitle = prompt('Editar nombre del evento:', events[index].title);

    if (newTitle !== null && newTitle.trim() !== '') {
        events[index].title = newTitle;
        saveEvents();
        renderEvents();
    }
}

renderEvents();