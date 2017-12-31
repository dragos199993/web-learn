function setup(){
    createCanvas(400, 400);
    background(51);
    console.log('running');
    loadJSON('/all', gotData);
}


function gotData(data){
    console.log(data);
}