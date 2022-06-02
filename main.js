var whistle = "";
var on_the_ground = "";
status_song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;

function preload()
{
    whistle = loadSound("whistle.mp3");
    on_the_ground = loadSound("on the ground.mp3")
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPose);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPose(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rigthWristY = " + rightWristY);
    }
}



function draw(results)
{
    image(video,0,0,600,500);

    status_song = on_the_ground.isPlaying();

    fill('#DC143C');
    stroke('#DC143C');
    circle(leftWristX, leftWristY, 20);

    if(results.length > 0.2)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        whistle.stop();
    }

    if(status_song == "true")
    {
        on_the_ground.play();
        document.getElementById("song_name").innerHTML = "Playing: On The Ground";
    }
    else {
        on_the_ground.stop();
        document.getElementById("song_name").innerHTML = "Playing: On The Ground";
    }
}