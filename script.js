const cards = document.querySelectorAll(".card"); // Chaque rectangle blanc
const lists = document.querySelectorAll(".list"); // Chaque zone

for (const card of cards) {
  card.addEventListener("dragstart", dragStart); // quand on prend la carte
  card.addEventListener("dragend", dragEnd); // Quand on la lache
}

for (const list of lists) {
  list.addEventListener("dragover", dragOver); // On survole une des 3 zone
  list.addEventListener("dragenter", dragEnter); // On entre dans une zone
  list.addEventListener("dragleave", dragLeave); // on sort d'une zone
  list.addEventListener("drop", dragDrop); // on dépose la carte
}

function dragStart(e) {
  // Permet de stocker l'id de la carte : " Je prends la carte #buy1 ""
  e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
  console.warn("Drag ended");
}

function dragOver(e) {
  // Cette ligne est importante car de base les navigateurs refusent de drop des élément ssur d'autres éléments donc il faut enlever le comportement de base du navigateur
  e.preventDefault();
}

function dragEnter(e) {
  // Cette ligne est importante car de base les navigateurs refusent de drop d'es élément ssur d'autres éléments
  e.preventDefault();
  this.classList.add("over"); // Ajoute un effet visuel sur la zone
}

function dragLeave(e) {
  this.classList.remove("over"); // Retire l'effet visuel sur la zone
}

function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain"); // On récupère l’id de la carte
  const card = document.getElementById(id); // On retrouve l’élément réel
  this.appendChild(card); // On l’ajoute dans la zone
  this.classList.remove("over"); // On enlève l’effet visuel
}

// -------------------------------

const addCardBtn = document.getElementById("add-card-btn");
const newCardText = document.getElementById("new-card-text");
const toDoList = document.getElementById("list1");

let cardIdCounter = 3;

addCardBtn.addEventListener("click", () => {
  const text = newCardText.value.trim();
  if (text === "") return;

  const card = document.createElement("div");
  card.className = "card";
  card.id = "card" + cardIdCounter++;
  card.textContent = text;
  card.draggable = true;

  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  toDoList.appendChild(card);
  newCardText.value = "";
});

newCardText.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addCardBtn.click();
  }
});
