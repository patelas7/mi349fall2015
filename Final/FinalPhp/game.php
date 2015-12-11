<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

require_once "db.inc.php";

$postData = file_get_contents("php://input");
$request = json_decode($postData);

$method = $request->method;
$username = $request->username;

if($method == "save"){
	$title = $request->title;
    $hint = $request->hint;
	$wordFinal = $request->wordFinal;
	$wordTemp = $request->wordTemp;
	$wordLength = $request->wordLength;
	$correct = $request->correct;
    $clickedString = $request->clickedString;
	$bad = $request->bad;
    saveGame($username, $title, $hint, $wordFinal, $wordTemp, $wordLength, $correct, $bad, $clickedString);
}
else if ($method == "retrieve"){
    getGames($username);
}
else if ($method == "delete"){
    $title = $request->title;
    deleteGame($username, $title);
}



/*Table: ID, Username, Title, wordFinal, wordTemp, wordLength, correct, bad*/
function saveGame($username, $title, $hint, $wordFinal, $wordTemp, $wordLength, $correct, $bad, $clickedString){
    $data = array();
    $connection = pdo_connect();
    if (doesTitleExist($username, $title)){
        $query = <<<SQL
UPDATE SAVEGAMES
SET hint = ? AND wordFinal = ? AND wordTemp = ? AND wordLength = ? AND correct = ? AND bad = ? AND clickedString = ?
WHERE Username = ? AND Title = ?
SQL;
        $statement = $connection->prepare($query);
        $result = $statement->execute(array($hint, $wordFinal, $wordTemp, $wordLength, $correct, $bad, $clickedString, $username, $title));

        if ($result == true) {
            $data['save'] = true;
        } else {
            $data['save'] = false;
            $data['error'] = "Couldn't replace";
        }
    }
    else{
        $query = <<<SQL
INSERT INTO SAVEGAMES(Username, Title, wordFinal, wordTemp, wordLength, correct, bad, hint, clickedString)
VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)
SQL;
        $statement = $connection->prepare($query);
        $result = $statement->execute(array($username, $title, $wordFinal, $wordTemp, $wordLength, $correct, $bad, $hint, $clickedString));

        if ($result == true) {
            $data['save'] = true;
        } else {
            $data['save'] = false;
            $data['error'] = "Couldn't insert";
        }
    }
    echo json_encode($data);
}

function doesTitleExist($username, $title){
    $connection = pdo_connect();
    $query =<<<SQL
SELECT *
FROM SAVEGAMES
WHERE Username = ? AND Title = ?
SQL;
    $statement = $connection->prepare($query);
    $statement->execute(array($username, $title));
    if($statement->rowCount()>0)
        return true;
    else
        return false;
}

function userHasGames($username){
    $connection = pdo_connect();
    $query =<<<SQL
SELECT *
FROM SAVEGAMES
WHERE Username = ?
SQL;
    $statement = $connection->prepare($query);
    $statement->execute(array($username));
    if($statement->rowCount()>0)
        return true;
    else
        return false;
}

function getGames($username){
    $data = array();
    $connection = pdo_connect();

    $query = <<<SQL
SELECT *
FROM SAVEGAMES
WHERE Username = ?
SQL;
    $statement = $connection->prepare($query);
    $statement->execute(array($username));
    if($statement->rowCount()>0){
        while($row = $statement->fetch()){
            $data[] = array('Username' => $row['Username'],'Title' => $row['Title'], 'hint' => $row['hint'], 'wordFinal' => $row['wordFinal'],
                'wordTemp' => $row['wordTemp'], 'wordLength' => $row['wordLength'], 'correct' => $row['correct'], 'bad' => $row['bad'],
                'clickedString'=>$row['clickedString']);
        }
    }
    else{
        $data["hasGame"] = false;
    }
    echo json_encode($data);
}


function deleteGame($username, $title){
    $data = array();
    $connection = pdo_connect();
    if (doesTitleExist($username, $title)) {
        $query = <<<SQL
DELETE
FROM SAVEGAMES
WHERE Username = ? AND Title = ?
SQL;
        $statement = $connection->prepare($query);
        $result = $statement->execute(array($username, $title));

        if ($result == true) {
            $data['delete'] = true;
        } else {
            $data['delete'] = false;
            $data['error'] = "Couldn't delete";
        }
    }
    else{
        $data['delete'] = false;
        $data['error'] = "Title not valid";
    }
    echo json_encode($data);
}




