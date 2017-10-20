var positionGlobal = 0;
var pointGuards = [];
var shootingGuards = [];
var smallForwards = [];
var powerForwards = [];
var centers = [];
var thisLineup = [];
thisLineup.push(pointGuards, shootingGuards, smallForwards, powerForwards, centers)

function Player(name, points){
    this.name = name;
    this.points = points;
}

function storePlayers(){
    for(var i = 0; i < 6; i++){
        var name = $("#player" + i).val().trim();
        var points = $("#points" + i).val();

        if(name.length > 1 && points > 1){
            console.log("positionGlobal: " + positionGlobal);
            var newPlayer = new Player(name, points);
            console.log(newPlayer);
            thisLineup[positionGlobal][i] = newPlayer;
        }
    }
}

function adjustHtml(){
    switch(positionGlobal){
        case 0:
            $("#text-get-started").text("Point Guards");
            $("#advance").text("Advance to Shooting Guards");
            break;
        case 1:
            $("#text-get-started").text("Shooting Guards");
            $("#advance").text("Advance to Small Forwards");
            break;
        case 2:
            $("#text-get-started").text("Small Forwards");
            $("#advance").text("Advance to Power Forwards");
            break;
        case 3:
            $("#text-get-started").text("Power Forwards");
            $("#advance").text("Advance to Centers");
            break;
        case 4:
            $("#text-get-started").text("Centers");
            $("#advance").text("Optimize!");
            optimize();
            break;
    }
}


$("#advance").on("click", function(){
    storePlayers();
    positionGlobal++;
    adjustHtml();
})

function optimize(){
    sortLineup();

}

function sortLineup(){
    var guards = [];
    var guards = thisLineup[0].concat(thisLineup[1]);
    guards.sort(function(a,b){
        return parseFloat(a.points) - parseFloat(b.points);
    });
    guards.reverse();

    var forwards = [];
    var forwards = thisLineup[2].concat(thisLineup[3]);
    forwards.sort(function(a,b){
        return parseFloat(a.points) - parseFloat(b.points);
    });
    forwards.reverse();

    var utility = [];
    var utility = thisLineup[0].concat(thisLineup[1]);
    utility = utility.concat(thisLineup[2]);
    utility = utility.concat(thisLineup[3]);
    utility = utility.concat(thisLineup[4]);
    console.log(utility);
    utility.sort(function(a,b){
        return parseFloat(a.points) - parseFloat(b.points);
    });
    utility.reverse();

    thisLineup.push(guards, forwards, utility);
    console.log(thisLineup);
}


for(var a = 0; a < thisLineup[0].length; a++){
            for(var b = 0; b < thisLineup[1].length; b++){
                for(var c = 0; c < thisLineup[2].length; c++){
                    for(var d = 0; d < thisLineup[3].length; d++){
                        for(var e = 0; e < thisLineup[4].length; e++){
                            for(var f = 0; f < guards.length; f++){
                                if(!guards[f].name == thisLineup[1][b].name && !guards[f].name == thisLineup[0][a].name && !guards[f].name == forwards[c].name){
                                    for(var g = 0; g < forwards.size(); g++){
                                        if(!forwards[g].name == guards[2].name && !forwards[g].name == thisLineup.get(3).get(d).name && !forwards[g].name == thisLineup[2][c].name && !forwards[g].name == thisLineup.get(4).get(d).name){
                                            for(var h = 0; h < 20; h++){
                                                if(!utility.get(h).name == forwards[g].name && !utility.get(h).name == guards[f].name && !utility.get(h).name == thisLineup.get(4).get(e).name && !utility.get(h).name == thisLineup.get(3).get(d).name && !utility.get(h).name == thisLineup[2][c].name && !utility.get(h).name == thisLineup[1][b].name && !utility.get(h).name == thisLineup[0][a].name){
                                                    if(thisLineup[0][a].price + thisLineup[1][b].price + thisLineup[2][c].price + thisLineup.get(3).get(d).price + thisLineup.get(4).get(e).price + guards[f].price + forwards[g].price + utility.get(h).price < 50000){
                                                        if(totalPoints < thisLineup[0][a].getProjectedPoints()  + thisLineup[1][b].getProjectedPoints() + thisLineup[2][c].getProjectedPoints() + thisLineup.get(3).get(d).getProjectedPoints() + thisLineup.get(4).get(e).getProjectedPoints() + guards[f].getProjectedPoints() + forwards[g].getProjectedPoints() + utility.get(h).getProjectedPoints()){
                                                            if(playerCheck(a, b, c, d, e, f, g, h, thisLineup, guards, forwards, utility)){
                                                                totalPoints = thisLineup[0][a].getProjectedPoints()  + thisLineup[1][b].getProjectedPoints() + thisLineup[2][c].getProjectedPoints() + thisLineup.get(3).get(d).getProjectedPoints() + thisLineup.get(4).get(e).getProjectedPoints() + guards[f].getProjectedPoints() + forwards[g].getProjectedPoints() + utility.get(h).getProjectedPoints();
                                                                finalA = a;
                                                                finalB = b;
                                                                finalC = c;
                                                                finalD = d;
                                                                finalE = e;
                                                                finalF = f;
                                                                finalG = g;
                                                                finalH = h;
                                                                count++;
                                                                lineuptest = "true";
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

