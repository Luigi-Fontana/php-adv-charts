$(document).ready(function () {

    ajaxCallGet('server-fatturato.php'); // Richiamo funzione di chiamata Ajax al server-fatturato
    ajaxCallGet('server-agente.php'); // Richiamo funzione di chiamata Ajax al server-agente

    function ajaxCallGet(server) { // Funzione di chiamata GET con url in entrata
        $.ajax({
            url: server,
            method: 'GET',
            success: function (data) {
                if (data.type == 'line') { // Se il tipo è line
                    var months = ['Gennaio', 'Febbraio','Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
                    createLineChart(months, data.data); // Richiamo funzione di creazione grafico a linee con labels e data in entrata
                } else if (data.type == 'pie') { // Se il tipo è pie
                   var objectChart = createObjectChart(data.data); // Creo un oggetto contenente i due array labels e data
                   createPieChart(objectChart.labels, objectChart.data); // Richiamo funzione di creazione grafico a torta con labels e data in entrata
                }
            },
            error: function (err) {
                alert('Errore API');
            }
        });
    }

    function createObjectChart(object) { // Funzione che dato un oggetto in entrata crea un oggetto con due array labels e data
        var arrayLabels = []; // Inizializzo i due Array
        var arrayData = [];
        for (var key in object) { // Ciclo all'interno dell'oggetto per trasformare la coppia chiave-valore in due array da dare a Chart.js
            arrayLabels.push(key); // Inserisco il nome del venditore nell'arrayLabels
            arrayData.push(object[key]); // Inserisco nell'arrayData la somma di tutte le vendite relative a quel venditore
        }
        return {
            labels: arrayLabels,
            data: arrayData
        };
    }

    function createLineChart(labels, data) { // Funzione di creazione grafico a linea con labels e data in entrata
        var ctx = $('#line-chart');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Vendite',
                    backgroundColor: '#C0C0C0',
                    borderColor: '#003366',
                    data: data
                }]
            }
        });
    }

    function createPieChart(labels, data) { // Funzione di creazione grafico a torta con labels e data in entrata
        var ctx = $('#pie-chart');
        var chart = new Chart(ctx, {
            type: 'pie',
            data: {
                datasets: [{
                    data: data,
                    backgroundColor: ['pink', 'orange', 'lightblue', 'lightgreen']
                }],
                labels: labels
            }
        });
    }

});
