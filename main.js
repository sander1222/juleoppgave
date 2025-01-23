const calendar = document.getElementById("calendar");
const message = document.getElementById("message");
const openedDays = new Set();

// Opprett kalenderen
for (let i = 1; i <= 24; i++) {
  const day = document.createElement("div");
  day.classList.add("day");
  day.textContent = i;
  day.addEventListener("click", () => openDay(i, day));
  calendar.appendChild(day);
}

async function openDay(dayNumber, dayElement) {
  if (openedDays.has(dayNumber)) {
    message.textContent = `Luke ${dayNumber} er allerede åpnet!`;
    return;
  }

  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Any");
    const data = await response.json();
    let joke = "";

    if (data.type === "single") {
      joke = data.joke;
    } else if (data.type === "twopart") {
      joke = `${data.setup} ${data.delivery}`;
    }

    message.textContent = `Luke ${dayNumber}: ${joke}`;
    dayElement.classList.add("opened");
    openedDays.add(dayNumber);
  } catch (error) {
    message.textContent = "Kunne ikke hente innhold. Prøv igjen senere!";
  }
}
