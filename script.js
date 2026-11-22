
const squadre = [
  {nome:"Inter", v:9, n:2, p:1},
  {nome:"Milan", v:8, n:2, p:2},
  {nome:"Napoli", v:7, n:3, p:2},
  {nome:"Juventus", v:7, n:2, p:3},
  {nome:"Roma", v:6, n:3, p:3},
  {nome:"Atalanta", v:6, n:2, p:4},
  {nome:"Lazio", v:5, n:4, p:3},
  {nome:"Bologna", v:5, n:3, p:4},
  {nome:"Fiorentina", v:5, n:2, p:5},
  {nome:"Torino", v:4, n:4, p:4},
  {nome:"Udinese", v:4, n:3, p:5},
  {nome:"Monza", v:4, n:2, p:6},
  {nome:"Genoa", v:3, n:4, p:5},
  {nome:"Lecce", v:3, n:3, p:6},
  {nome:"Sassuolo", v:3, n:2, p:7},
  {nome:"Empoli", v:2, n:4, p:6},
  {nome:"Cagliari", v:2, n:3, p:7},
  {nome:"Verona", v:2, n:2, p:8},
  {nome:"Frosinone", v:1, n:4, p:7},
  {nome:"Salernitana", v:1, n:2, p:9}
];

const partite = [];

const tabella = document.getElementById("classifica");
const casaSelect = document.getElementById("casa");
const ospiteSelect = document.getElementById("ospite");
const form = document.getElementById("match-form");


// CREAZIONE MENU SQUADRE

function preparaSelezioni() {

  squadre.forEach(squadra => {

    const opzioneCasa = document.createElement("option");
    opzioneCasa.value = squadra.nome;
    opzioneCasa.textContent = squadra.nome;

    const opzioneOspite = opzioneCasa.cloneNode(true);

    casaSelect.appendChild(opzioneCasa);
    ospiteSelect.appendChild(opzioneOspite);

  });

}


// AGGIORNAMENTO CLASSIFICA

function aggiornaClassifica() {

  squadre.forEach(s => {

    s.pg = s.v + s.n + s.p;
    s.punti = s.v * 3 + s.n;

  });

  squadre.sort((a, b) =>
    b.punti - a.punti ||
    b.v - a.v ||
    a.nome.localeCompare(b.nome)
  );

  tabella.innerHTML = "";

  squadre.forEach((s, i) => {

    const riga = document.createElement("tr");

    const valori = [
      i + 1,
      s.nome,
      s.punti,
      s.pg,
      s.v,
      s.n,
      s.p
    ];

    valori.forEach(valore => {

      const cella = document.createElement("td");
      cella.textContent = valore;

      riga.appendChild(cella);

    });

    tabella.appendChild(riga);

  });

}


// VISUALIZZAZIONE RISULTATI

function mostraRisultati() {

  const contenitore = document.getElementById("risultati");

  contenitore.innerHTML = "";

  partite.slice().reverse().forEach(partita => {

    const elemento = document.createElement("div");

    elemento.className = "risultato";

    elemento.textContent =
      `${partita.casa} ${partita.golCasa} - ` +
      `${partita.golOspite} ${partita.ospite}`;

    contenitore.appendChild(elemento);

  });

}


// REGISTRAZIONE PARTITA

form.addEventListener("submit", function(event) {

  event.preventDefault();

  const casa = casaSelect.value;
  const ospite = ospiteSelect.value;

  const golCasa = Number(
    document.getElementById("gol-casa").value
  );

  const golOspite = Number(
    document.getElementById("gol-ospite").value
  );

  const messaggio = document.getElementById("messaggio");

  if (!casa || !ospite) {

    messaggio.textContent =
      "Seleziona entrambe le squadre.";

    return;

  }

  if (casa === ospite) {

    messaggio.textContent =
      "Scegli due squadre diverse!";

    return;

  }

  const squadraCasa = squadre.find(
    s => s.nome === casa
  );

  const squadraOspite = squadre.find(
    s => s.nome === ospite
  );

  if (golCasa > golOspite) {

    squadraCasa.v++;
    squadraOspite.p++;

  } else if (golCasa < golOspite) {

    squadraOspite.v++;
    squadraCasa.p++;

  } else {

    squadraCasa.n++;
    squadraOspite.n++;

  }

  partite.push({
    casa,
    ospite,
    golCasa,
    golOspite
  });

  aggiornaClassifica();
  mostraRisultati();

  messaggio.textContent =
    "Partita registrata! Classifica aggiornata.";

  form.reset();

});


// AVVIO DEL SITO

preparaSelezioni();
aggiornaClassifica();
mostraRisultati();
