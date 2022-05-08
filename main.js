leftwristY = 0;
rightwristY = 0;
leftwristX = 0;
rightwristX = 0;
noseX = 0;
noseY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;
scorenose = 0;
Song1Status = "";
Song2Status = "";

function preload() {
    harryPotter = loadSound("harry_potter_theme.mp3");
    bellaCiao = loadSound("Money heist - bella ciao.mp3")
}

function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Is Loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        scorenose = results[0].pose.keypoints[0].score;
    }
}

function draw() {
    Song1Status = harryPotter.isPlaying();
    Song2Status = bellaCiao.isPlaying();
    image(video, 0, 0, 500, 400);
    circle(noseX, noseY, 20);
    fill("red");

    if (scoreleftwrist > 0.1) {
        leftWristnumber = Number(leftwristY);
        round = floor(leftWristnumber);
        Volume = round/400;
        document.getElementById("VOLUME").innerHTML = "Volume : " +Volume;
        if (noseX > 250) {
            harryPotter.stop();
            if (Song2Status == false) {
            bellaCiao.play();
            bellaCiao.setVolume(Volume);
            document.getElementById("songSelector").innerHTML = "Bella Ciao";
            }
        }
        else if (noseX < 250) {
            bellaCiao.stop();
            if (Song1Status == false) {
            harryPotter.play();
            harryPotter.setVolume(Volume);
            document.getElementById("songSelector").innerHTML = "Harry Potter";
            }
        } 
    }
    if (rightwristY > 0 && rightwristY <= 100) {
        if (noseX > 250) {
            harryPotter.stop();
            if (Song2Status == false) {
            bellaCiao.play();
            bellaCiao.rate(0.5);
            document.getElementById("songSelector").innerHTML = "Bella Ciao";
            }
        }
        else if (noseX < 250) {
            bellaCiao.stop();
            if (Song1Status == false) {
            harryPotter.play();
            harryPotter.rate(0.5);
            document.getElementById("songSelector").innerHTML = "Harry Potter";
            }
        } 
        document.getElementById("SPEED").innerHTML = "Speed : 0.5x";
    }
    else if (rightwristY > 100 && rightwristY <= 200) {
        if (noseX > 250) {
            harryPotter.stop();
            if (Song2Status == false) {
            bellaCiao.play();
            bellaCiao.rate(1);
            document.getElementById("songSelector").innerHTML = "Bella Ciao";
            }
        }
        else if (noseX < 250) {
            bellaCiao.stop();
            if (Song1Status == false) {
            harryPotter.play();
            harryPotter.rate(1);
            document.getElementById("songSelector").innerHTML = "Harry Potter";
            }
        } 
        document.getElementById("SPEED").innerHTML = "Speed : 1x";
    }
    else if (rightwristY > 200 && rightwristY <= 300) {
        if (noseX > 250) {
            harryPotter.stop();
            if (Song2Status == false) { 
            bellaCiao.play();
            bellaCiao.rate(1.5);
            document.getElementById("songSelector").innerHTML = "Bella Ciao";
            }
        }
        else if (noseX < 250) {
            bellaCiao.stop();
            if (Song1Status == false) {
            harryPotter.play();
            harryPotter.rate(1.5);
            document.getElementById("songSelector").innerHTML = "Harry Potter";
            }
        } 
        document.getElementById("SPEED").innerHTML = "Speed : 1.5x";
    }
    else if (rightwristY > 300 && rightwristY <= 400) {
        if (noseX > 250) {
            harryPotter.stop();
            if (Song2Status == false) {
            bellaCiao.play();
            bellaCiao.rate(2);
            document.getElementById("songSelector").innerHTML = "Bella Ciao";
            }
        }
        else if (noseX < 250) {
            bellaCiao.stop();
            if (Song1Status == false) {
            harryPotter.play();
            harryPotter.rate(2);
            document.getElementById("songSelector").innerHTML = "Harry Potter";
            }
        } 
        document.getElementById("SPEED").innerHTML = "Speed : 2x";
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}