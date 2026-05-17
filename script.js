const form = document.getElementById("eventForm");

const titleInput = document.getElementById("title");

const dateInput = document.getElementById("date");

const categoryInput = document.getElementById("category");

const eventList = document.getElementById("eventList");

const message = document.getElementById("message");

const totalEvents = document.getElementById("totalEvents");

let events = JSON.parse(
    localStorage.getItem("events")
) || [];

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

        title,
        date,
        category
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

    events.forEach((event,index)=>{

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

    if(confirm(
        "¿Deseas eliminar este evento?"
    )){

        events.splice(index,1);

        saveEvents();

        renderEvents();
    }
}

function editEvent(index){

    const newTitle = prompt(
        "Editar evento:",
        events[index].title
    );

    if(
        newTitle !== null &&
        newTitle.trim() !== ""
    ){

        events[index].title =
        newTitle;

        saveEvents();

        renderEvents();
    }
}