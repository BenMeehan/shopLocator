<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Record</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
</head>
<body>
    <?php
        $addr1=$_POST['address1'];
        $addr2=$_POST['address2'];
        $pin=$_POST['pincode'];
        $statecity=$_POST['state-city'];
        $district=$_POST['district'];
        $area=$_POST['area'];

        $servername = "freedb.tech:3306";
        $username = "freedbtech_ben";
        $password = "123";
        $dbname = "freedbtech_shoplocation";
            
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: ". $conn->connect_error);
        }

        $sqlquery = "INSERT INTO location VALUES ('$addr1', '$addr2', '$pin','$statecity','$district','$area')";
    
        if ($conn->query($sqlquery) === TRUE) {
            echo "<div class=\"container text-center my-5\">
                    <h1>Location Added Successfully</h1>
                    <a href=\"../index.html\">Add an another location</a>
                </div>";
        } else {
            echo "<div class=\"container text-center my-5\">
                <h1>Error: $sql<br>$conn->error</h1>
                <a href=\"../index.html\">Try again</a>
            </div>";
        }
    ?>
</body>
</html>