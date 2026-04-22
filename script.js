firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        window.location = "login.html";
    }
});

function dodaj() {
    var d = document.getElementById("datum").value;
    var v = document.getElementById("vrijeme").value;

    if (d == "" || v == "") {
        alert("Moraš popuniti sve!");
        return;
    }

    // Slanje podataka na PHP
    fetch("backend/add.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "datum=" + d + "&vrijeme=" + v
    }).then(function() {
        ucitajSve(); // Ponovo učitaj listu
        document.getElementById("datum").value = "";
        document.getElementById("vrijeme").value = "";
    });
}

function ucitajSve() {
    fetch("backend/get.php")
    .then(function(odgovor) {
        return odgovor.json();
    })
    .then(function(podaci) {
        var lista = document.getElementById("lista");
        lista.innerHTML = "";
        
        podaci.forEach(function(rez) {
            lista.innerHTML += "<li>" + rez.datum + " u " + rez.vrijeme + 
            " <button onclick='obrisi(" + rez.id + ")'>X</button></li>";
        });
    });
}

function obrisi(id) {
    if (confirm("Jesi li siguran?")) {
        fetch("backend/delete.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "id=" + id
        }).then(function() {
            ucitajSve();
        });
    }
}

function odjaviSe() {
    firebase.auth().signOut();
}

window.onload = ucitajSve;