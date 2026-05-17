const form = document.getElementById("eventForm");

const titleInput = document.getElementById("title");

const dateInput = document.getElementById("date");

const categoryInput = document.getElementById("category");

const eventList = document.getElementById("eventList");

const message = document.getElementById("message");

const totalEvents = document.getElementById("totalEvents");

let events = JSON.parse(localStorage.getItem("events")) || [];

renderEvents();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const title = titleInput.value.trim();

    const date = dateInput.value;

    const category = categoryInput.value.trim();

    if(
        title === "" ||
        date === "" ||
        category === ""
    ){

        message.textContent =
        "Todos los campos son obligatorios";

        return;
    }

    message.textContent = "";

    const event = {
        title: title,
        date: date,
        category: category
    };

    events.push(event);

    saveEvents();

    renderEvents();

    form.reset();
});

function saveEvents(){

    localStorage.setItem(
        "events",
        JSON.stringify(events)
    );
}

function renderEvents(){

    eventList.innerHTML = "";

    events.forEach((event, index) => {

        const li =
        document.createElement("li");

        li.innerHTML = `

            <div class="event-info">

                <strong>${event.title}</strong>

                <span>📅 ${event.date}</span>

                <span>🏷️ ${event.category}</span>

            </div>

            <div class="actions">

                <button onclick="editEvent(${index})">
                    Editar
                </button>

                <button onclick="deleteEvent(${index})">
                    Eliminar
                </button>

            </div>
        `;

        eventList.appendChild(li);
    });

    totalEvents.textContent =
    events.length;
}

function deleteEvent(index){

    const confirmDelete =
    confirm("¿Deseas eliminar este evento?");

    if(confirmDelete){

        events.splice(index, 1);

        saveEvents();

        renderEvents();
    }
}

function editEvent(index){

    let event = events[index];

    const newTitle = prompt(
        "Editar nombre:",
        event.title
    );

    if(newTitle === null) return;

    const newDate = prompt(
        "Editar fecha (YYYY-MM-DD):",
        event.date
    );

    if(newDate === null) return;

    const newCategory = prompt(
        "Editar categoría:",
        event.category
    );

    if(newCategory === null) return;

    events[index] = {

        title: newTitle.trim(),

        date: newDate.trim(),

        category: newCategory.trim()
    };

    saveEvents();

    renderEvents();
}