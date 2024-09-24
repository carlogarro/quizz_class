currentStudent = NaN;

function preload() {
    loadJSON("./db.json", loadData);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
    rectMode(CENTER);
    nextStudent = false;
}

function draw() {
    textSize(20);
    textAlign(LEFT, CENTER);
    text("Next student (SPACE BAR)", 0, height - 50);
    if (nextStudent) {
        textAlign(LEFT, CENTER);
        text(`${students[currentStudent].normal}/${students[currentStudent].tries}` + "🤏 ↔️", width / 2, height - 50);
        textAlign(CENTER, CENTER);
        text(`${students[currentStudent].correct}/${students[currentStudent].tries}` + "👍 ⬆️", (3 * width) / 4, height - 50);
        textAlign(RIGHT, CENTER);
        text(`${students[currentStudent].incorrect}/${students[currentStudent].tries}` + "👎 ⬇️", width, height - 50);
        textSize(200);
        textAlign(CENTER, CENTER);
        text(students[currentStudent].name, width / 2, height / 2);
    }
}

function loadData(studentsData) {
    students = [];
    for (let student of studentsData) {
        students.push(student);
    }
}

function selectStudent() {
    return floor(random(0, students.length));
}

function resetScreen() {
    nameStudent = "";
    background(220);
}

function keyPressed() {
    if (keyCode === 32) {
        background(220);
        selectStudent();
        nextStudent = true;
        currentStudent = selectStudent();
        console.log(`Next student selected: ${currentStudent.name}`);
        graded = false;
    }

    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        background("#FFFBC1");
        students[currentStudent].tries++;
        students[currentStudent].normal++;
        sendData(students);
        //saveJSON(students, 'pointsA.json');
        // setTimeout(resetScreen, 5000);
    }

    if (keyCode === UP_ARROW) {
        background("#B6E2A1");
        students[currentStudent].tries++;
        students[currentStudent].correct++;
        sendData(students);
        //saveJSON(students, 'pointsA.json');
        setTimeout(resetScreen, 5000);
    }
    if (keyCode === DOWN_ARROW) {
        background("#FEBE8C");
        students[currentStudent].tries++;
        students[currentStudent].incorrect++;
        sendData(students);
        //saveJSON(students, 'pointsA.json');
        setTimeout(resetScreen, 5000);
    }

}

function sendData(data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch('/api', options);
}