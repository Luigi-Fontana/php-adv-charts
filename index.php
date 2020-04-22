<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet">
        <link rel="shortcut icon" href="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.flaticon.com%2Ficons%2Fpng%2F512%2F138%2F138339.png&f=1&nofb=1">
        <title>ADS | Charts</title>
        <link rel="stylesheet" href="dist/css/app.css">
    </head>
    <body>
        <main>
            <div class="container">
                <canvas id="line-chart"></canvas>
            </div>
        </main>

        <script>
            $(document).ready(function () {
                var months = ['Gennaio', 'Febbraio','Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
                <?php $data = [1000,1322,1123,2301,3288,988,502,2300,5332,2300,1233,2322]; ?>
                var data = <?php echo json_encode($data); ?>;

                var ctx = $('#line-chart');
                var chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: months,
                        datasets: [{
                            label: 'Vendite',
                            backgroundColor: '#C0C0C0',
                            borderColor: '#003366',
                            data: data
                        }]
                    }
                });
            });
        </script>

        <!-- <script src="dist/js/app.js" charset="utf-8"></script> -->
    </body>
</html>
