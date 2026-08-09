const sections = [
    "health",
    "request",
    "outpost",
    "sms"
];


// Show selected section

function show(id) {

    sections.forEach(function(section) {

        document
            .getElementById(section)
            .classList
            .toggle(
                "hidden",
                section !== id
            );

    });

    document
        .getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });

}


// Get saved requests

let requests =
    JSON.parse(
        localStorage.getItem("bcReq") || "[]"
    );


// Display saved requests

function renderRequests() {

    const container =
        document.getElementById("requests");

    container.innerHTML = "";

    requests.forEach(function(request) {

        container.innerHTML += `

            <div class="request">

                <b>
                    ${request.type}
                </b>

                <span class="pill">
                    QUEUED
                </span>

                <p>
                    ${request.description}
                </p>

                <small>
                    ${request.name}
                </small>

            </div>

        `;

    });

}


// Save offline request

document
    .getElementById("form")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const request = {

                name:
                    document
                    .getElementById("name")
                    .value,

                type:
                    document
                    .getElementById("type")
                    .value,

                description:
                    document
                    .getElementById("desc")
                    .value

            };


            requests.push(request);


            localStorage.setItem(
                "bcReq",
                JSON.stringify(requests)
            );


            event.target.reset();

            renderRequests();


            alert(
                "Request saved offline and queued."
            );

        }
    );


// Simulate SMS

function simulateSMS() {

    alert(
        "📩 SMS RECEIVED: Temporary health outpost is open at the designated evacuation center."
    );

}


// Update connection status

function updateStatus() {

    const status =
        document.getElementById("status");


    if (navigator.onLine) {

        status.textContent =
            "● CONNECTED";

        status.classList
            .remove("offline");

    }

    else {

        status.textContent =
            "● OFFLINE MODE";

        status.classList
            .add("offline");

    }

}


window.addEventListener(
    "online",
    updateStatus
);


window.addEventListener(
    "offline",
    updateStatus
);


// Initialize

updateStatus();

renderRequests();