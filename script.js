const options = [
  { id: 0, name: "Mini Game", icon: "🎮", votes: 0 },
  { id: 1, name: "Mini Store", icon: "🛒", votes: 0 },
  { id: 2, name: "To-Do App", icon: "📝", votes: 0 },
  { id: 3, name: "Quiz App", icon: "🧠", votes: 0 }
];

let lastVotedName = "";
let userTotalVotes = 0;

function renderCards() {
  const container = document.getElementById("voting-container");
  if (!container) return;

  container.innerHTML = "";

  options.forEach((item) => {

    const card = document.createElement("div");
    card.className = "bg-[#0f172a] border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:border-indigo-500 transition duration-200";

    card.innerHTML = `
      <div class="text-5xl mb-4">${item.icon}</div>
      <h2 class="text-lg font-bold mb-1">${item.name}</h2>
      <p class="text-slate-400 text-sm mb-6">Votes: <span id="vote-${item.id}" class="font-semibold text-white">${item.votes}</span></p>
      <button id="btn-${item.id}" class="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition active:scale-95 flex items-center justify-center gap-2">
        Vote ${item.icon}
      </button>
    `;

    container.appendChild(card);

    const voteButton = card.querySelector(`#btn-${item.id}`);
    voteButton.addEventListener("click", function () {
      tambahVote(item.id);
    });
  });
}

function tambahVote(id) {
  const kandidat = options.find((item) => item.id === id);

  if (kandidat) {
    kandidat.votes++;
    userTotalVotes++;
    lastVotedName = `${kandidat.name} ${kandidat.icon}`;

    const voteText = document.getElementById(`vote-${id}`);
    if (voteText) {
      voteText.textContent = kandidat.votes;
    }

    updateInfoUI();
  }
}

function updateInfoUI() {
  let totalSemuaVote = 0;
  options.forEach((item) => {
    totalSemuaVote += item.votes;
  });


  document.getElementById("total-votes").textContent = totalSemuaVote;

  const statusText = document.getElementById("status-text");
  if (lastVotedName !== "") {
    statusText.textContent = `🎉 Kamu memilih ${lastVotedName}! (Total vote kamu: ${userTotalVotes}x)`;
  } else {
    statusText.textContent = "Silakan klik tombol vote di atas!";
  }
}

function setupReset() {
  const resetBtn = document.getElementById("reset-btn");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", function () {
    options.forEach((item) => {
      item.votes = 0;
    });

    lastVotedName = "";
    userTotalVotes = 0;

    renderCards();
    updateInfoUI();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  updateInfoUI();
  setupReset();
});