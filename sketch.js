currentStudent = NaN;
students = [
    {
        "name": "Andrea",
        "tries": 0,
        "correct": 0,
        "normal": 0,
        "incorrect": 0
    },
    {
        "name": "Martina A",
        "tries": 0,
        "correct": 0,
        "normal": 0,
        "incorrect": 0
    },
    {
        "name": "Bruno",
        "tries": 0,
        "correct": 0,
        "normal": 0,
        "incorrect": 0
    },
    {
        "name": "Kenzo",
        "tries": 0,
        "correct": 0,
        "normal": 0,
        "incorrect": 0
    }
]

function preload() {
    //loadJSON("https://raw.githubusercontent.com/carlogarro/quizz-class/refs/heads/main/pointsA.json?token=GHSAT0AAAAAACXULU7NXDDZZCY263ILNUACZXSZMUA", loadData);
    //loadJSON("points.json", loadData);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(220);
    rectMode(CENTER);
    nextStudent = false;
}

function draw() {
    textSize(200);
    if (nextStudent) {
        textAlign(CENTER, CENTER);

        text(students[currentStudent].name, width / 2, height / 2);
    }
    textSize(20);
    textAlign(LEFT, CENTER);
    text("Next student (SPACE BAR)", 0, height - 50);
    textAlign(LEFT, CENTER);
    text("🤏 ↔️", width / 2, height - 50);
    textAlign(CENTER, CENTER);
    text("👍 ⬆️", (3 * width) / 4, height - 50);
    textAlign(RIGHT, CENTER);
    text("👎 ⬇️", width, height - 50);
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
        //saveJSON(students, 'pointsA.json');
        // setTimeout(resetScreen, 5000);
    }

    if (keyCode === UP_ARROW) {
        background("#B6E2A1");
        students[currentStudent].tries++;
        students[currentStudent].correct++;
        //saveJSON(students, 'pointsA.json');
        setTimeout(resetScreen, 5000);
    }
    if (keyCode === DOWN_ARROW) {
        background("#FEBE8C");
        students[currentStudent].tries++;
        students[currentStudent].incorrect++;
        //saveJSON(students, 'pointsA.json');
        setTimeout(resetScreen, 5000);
    }

}