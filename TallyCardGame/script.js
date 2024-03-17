var oznacenaStevila = [];
var casZacetka;
var audio;
var izzrebanaStevila = [];

function OmogociIgro() {
    var select = document.getElementById("VelikostPloscadi");
    var value = select.options[select.selectedIndex].value;
    var button = document.getElementById("NovaIgra");
    button.disabled = false;
}

function PozeniIgro() {
    var select = document.getElementById("VelikostPloscadi");
    var rows = parseInt(select.value);
    var columns = 5;
    var maxNumber;
    var polja = "";

    switch (rows) {
        case 3:
            maxNumber = 75;
            columns = 5;
            break;
        case 4:
            maxNumber = 80;
            columns = 5;
            break;
        case 5:
            maxNumber = 75;
            columns = 5;
            break;
        default:
            return;
    }

    var numTables = rows;
    for (var k = 0; k < numTables; k++) {
        polja += "<table border='1' class='custom-table' style='margin-bottom:10px' onclick='IzberiTabelo(this)'>";
        for (var i = 0; i < rows; i++) {
            polja += "<tr>";
            for (var j = 0; j < columns; j++) {
                var number = (k * columns * rows) + (j + i * columns) + 1;
                if (number <= maxNumber) {
                    polja += "<td>" + number + "</td>";
                }
            }
            polja += "</tr>";
        }
        polja += "</table>";
    }

    var igralnoPolje = document.getElementById("IgralnoPolje");
    igralnoPolje.innerHTML = polja;

    casZacetka = new Date().getTime();
    izpisiCasIgranja();

    audio = document.getElementById("myAudio");
    audio.play();
}

function toggleMute() {
    var muteButton = document.getElementById("muteButton"); 
    if (audio.muted) {
        audio.muted = false;
        muteIcon.classList.remove("fa-microphone-slash");
        muteIcon.classList.add("fa-microphone");
    } else {
        audio.muted = true;
        muteIcon.classList.remove("fa-microphone");
        muteIcon.classList.add("fa-microphone-slash");
    }
}

function izpisiCasIgranja() {
    var casIgranjaElement = document.getElementById("CasIgranja");
    var trenutniCas = new Date().getTime();
    var casRazlike = trenutniCas - casZacetka;
    var minute = Math.floor((casRazlike / 60000) % 60);
    var sekunde = Math.floor((casRazlike / 1000) % 60);
    casIgranjaElement.textContent = minute + " min " + sekunde + " s";
    setTimeout(izpisiCasIgranja, 1000);
}

function IzberiTabelo(table) {
    var izbranoPolje = document.getElementById("izbranoPolje");
    izbranoPolje.innerHTML = ""; 

    var novaTabela = table.cloneNode(true); 
    var vsaPolja = novaTabela.querySelectorAll("td");

    
    vsaPolja.forEach(function(polje) {
        polje.addEventListener("click", function(event) {
            event.stopPropagation();
            if (polje.style.backgroundColor !== "green") {
                polje.style.backgroundColor = "green";
                oznacenaStevila.push(parseInt(polje.textContent));

                PreveriPolneVrsticeIgralca();
            }
        });
    });

    izbranoPolje.appendChild(novaTabela);

    
    var racunalnikPolje = document.getElementById("racunalnikPolje");
    racunalnikPolje.removeEventListener("click", IzberiTabeloZaRacunalnik);

    IzberiTabeloZaRacunalnik();
}

function preveriBingo() {
    PreveriPolneVrsticeIgralca();
}

function IzberiTabeloZaRacunalnik() {
    var select = document.getElementById("VelikostPloscadi");
    var rows = parseInt(select.value);
    var numTables = rows;

    var randomIndex = Math.floor(Math.random() * numTables);

    var izbraneTabele = document.getElementById("IgralnoPolje").getElementsByTagName("table");
    var izbranaTabela = izbraneTabele[randomIndex].cloneNode(true);

    var racunalnikPolje = document.getElementById("racunalnikPolje");
    racunalnikPolje.innerHTML = "";
    racunalnikPolje.appendChild(izbranaTabela);

    racunalnikPolje.style.pointerEvents = "none";

    var naprejButton = document.getElementById("naprej");
    naprejButton.disabled = false;
}
/*
function IzberiStevilko() {
    var vseTabele = document.querySelectorAll("#IgralnoPolje table");
    var vsaStevila = [];

    vseTabele.forEach(function(table) {
        var tabelaStevil = table.querySelectorAll("td");
        tabelaStevil.forEach(function(td) {
            vsaStevila.push(parseInt(td.textContent));
        });
    });

    // Odstranimo že izbrana števila iz seznama možnih števil
    for (var i = 0; i < oznacenaStevila.length; i++) {
        var index = vsaStevila.indexOf(oznacenaStevila[i]);
        if (index !== -1) {
            vsaStevila.splice(index, 1);
        }
    }

    var nakljucnoStevilo = vsaStevila[Math.floor(Math.random() * vsaStevila.length)];

    var randomSteviloElement = document.getElementById("randomStevilo");
    randomSteviloElement.textContent = nakljucnoStevilo;

    vseTabele.forEach(function(table) {
        var vsaPolja = table.querySelectorAll("td");
        vsaPolja.forEach(function(polje) {
            if (parseInt(polje.textContent) === nakljucnoStevilo) {
                polje.style.backgroundColor = "yellow";
            }
        });
    });

    var racunalnikPolje = document.getElementById("racunalnikPolje");
    var polja = racunalnikPolje.querySelectorAll("td");
    polja.forEach(function(polje) {
        if (parseInt(polje.textContent) === nakljucnoStevilo) {
            polje.style.backgroundColor = "red";
        }
    });

    oznacenaStevila.push(nakljucnoStevilo);

    PreveriPolneVrstice();
}
*/



function IzberiStevilko() {
    var vseTabele = document.querySelectorAll("#IgralnoPolje table");
    var vsaStevila = [];

    
    vseTabele.forEach(function(table) {
        var tabelaStevil = table.querySelectorAll("td");
        tabelaStevil.forEach(function(td) {
            vsaStevila.push(parseInt(td.textContent));
        });
    });

    
    for (var i = 0; i < izzrebanaStevila.length; i++) {
        var index = vsaStevila.indexOf(izzrebanaStevila[i]);
        if (index !== -1) {
            vsaStevila.splice(index, 1);
        }
    }

   
    var nakljucnoStevilo = vsaStevila[Math.floor(Math.random() * vsaStevila.length)];

    izzrebanaStevila.push(nakljucnoStevilo);

    var randomSteviloElement = document.getElementById("randomStevilo");
    randomSteviloElement.textContent = nakljucnoStevilo;

    vseTabele.forEach(function(table) {
        var vsaPolja = table.querySelectorAll("td");
        vsaPolja.forEach(function(polje) {
            if (parseInt(polje.textContent) === nakljucnoStevilo) {
                polje.style.backgroundColor = "yellow";
            }
        });
    });

    var racunalnikPolje = document.getElementById("racunalnikPolje");
    var polja = racunalnikPolje.querySelectorAll("td");
    polja.forEach(function(polje) {
        if (parseInt(polje.textContent) === nakljucnoStevilo) {
            polje.style.backgroundColor = "red";
        }
    });

    PreveriPolneVrsticeIgralca();
    PreveriPolneVrstice();
}

function PreveriPolneVrstice() {
    var racunalnikPolje = document.getElementById("racunalnikPolje");
    var vrstice = racunalnikPolje.getElementsByTagName("tr");
    var vsajEnaPolnaVrstica = false;

    for (var i = 0; i < vrstice.length; i++) {
        var stolpci = vrstice[i].getElementsByTagName("td");
        var vsiOznaceni = true;
        var vsiIzzrebani = true;

        for (var j = 0; j < stolpci.length; j++) {
            if (stolpci[j].style.backgroundColor !== "red") { 
                vsiOznaceni = false;
                break;
            }
            var stevilkaPolja = parseInt(stolpci[j].textContent);
            if (!izzrebanaStevila.includes(stevilkaPolja)) { 
                vsiIzzrebani = false;
                break;
            }
        }

        if (vsiOznaceni && vsiIzzrebani) {
            vsajEnaPolnaVrstica = true;
            break; 
        }
    }

    if (vsajEnaPolnaVrstica) {
        alert("Bingo! Računalnik je zmagal!");
    } else {
        console.log("Računalnik: Ni polne vrstice.");
    }
}

function PreveriPolneVrsticeIgralca() {
    var izbranoPolje = document.getElementById("izbranoPolje");
    var vrstice = izbranoPolje.getElementsByTagName("tr");

    for (var i = 0; i < vrstice.length; i++) {
        var stolpci = vrstice[i].getElementsByTagName("td");
        var vseOznacene = true;
        for (var j = 0; j < stolpci.length; j++) {
            if (stolpci[j].style.backgroundColor !== "green") {
                vseOznacene = false;
                break;
            }
            var stevilka = parseInt(stolpci[j].textContent);
            if (!izzrebanaStevila.includes(stevilka)) { 
                vseOznacene = false;
                break;
            }
        }
        if (vseOznacene) {
            alert("Bingo! Igralec je zmagal!");
            return;
        }
    }
    console.log("Igralec: Ni polne vrstice.");
}



        