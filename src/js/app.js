$(document).ready(function () {

    apiCallGet();

    function apiCallGet() {
        $.ajax({
            url: 'server.php',
            method: 'GET',
            success: function (data) {
                var months = ['Gennaio', 'Febbraio','Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
                createLineChart(months, data);
            },
            error: function (err) {
                alert('Errore API');
            }
        });
    };

    function createLineChart(labels, data) {
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
    };
});
