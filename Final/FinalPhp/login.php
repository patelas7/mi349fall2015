<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

require_once "db.inc.php";

$postData = file_get_contents("php://input");
$request = json_decode($postData);

$method = $request->method;
$username = $request->username;


if($method == "login"){
    $password = $request->password;
    login($username, $password);
}
else if ($method == "create"){
    $password = $request->password;
    create($username, $password);
}
else if($method == "logout")
    logOut($username);




function login($username, $password){
    $data = array();
    $connection = pdo_connect();

    $query = <<<SQL
SELECT Password, ID
FROM USERS
WHERE Username = ?
SQL;
    $statement = $connection->prepare($query);
    $statement->execute(array($username));

    if($row = $statement->fetch()){
        $hash_pass = $row['Password'];
        if(password_verify($password, $hash_pass)){

            $data['login'] = true;
            $query2 =<<<SQL
UPDATE USERS
SET Connected = ?
WHERE Username = ?
SQL;
            $statement2 = $connection->prepare($query2);
            $statement2->execute(array(true, $username));

        }
        else{
            $data['login'] = false;
            $data['error'] = "Wrong Password";
        }
        echo json_encode($data);
        exit;

    }

    $data['login'] = false;
    $data['error'] = "Wrong username or password";
    echo json_encode($data);
    exit;

}

function create($username, $password)
{
    $connection = pdo_connect();
    $data = array();
    if (doesUserExist($username)) {
        $data['create'] = false;
        $data['error'] = "User already exists";
        echo json_encode($data);
        exit;

    }

    $query = <<<SQL
INSERT INTO USERS (Username, Password, Connected)
VALUES (?,?,?)
SQL;
    $statement = $connection->prepare($query);

    $hashedPass = password_hash($password, PASSWORD_DEFAULT);
    $result = $statement->execute(array($username, $hashedPass, true));


    if ($result == true) {
        $data['create'] = true;
        echo json_encode($data);
        exit;
    }
    $data['create'] = false;
    $data['error'] = "Could not create";
    echo json_encode($data);
    exit;

}


function doesUserExist($username) {

    $connection = pdo_connect();

    $query =<<<SQL
SELECT *
FROM USERS
WHERE Username = ?
SQL;
    $statement = $connection->prepare($query);
    $statement->execute(array($username));
    if($statement->rowCount()>0)
        return true;
    else
        return false;
}

function logOut($username){
    $connection = pdo_connect();
    $data = array();
    if (doesUserExist($username)) {
        $query =<<<SQL
UPDATE USERS
SET Connected = ?
WHERE Username = ?
SQL;
        $statement = $connection->prepare($query);
        $result = $statement->execute(array(false, $username));
        if($result == true){
            $data['logout'] = true;
        }
        else{
            $data['logout'] = false;
            $data['error'] = "Failed to logout the user";
        }
    }
    else{
        $data['logout'] = false;
        $data['error'] = "User does not exist";
    }
   echo json_encode($data);
}
