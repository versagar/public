countOne= 0;
countTwo= 0;
vcounterOne= String('');
vcounterTwo= String('');


function incrfirst(){
    countOne= countOne+ 1;
    vcounterOne= vcounterOne+ String('🍎');
    document.getElementById('firstNum').innerHTML= countOne;
    document.getElementById('vcountOne').innerHTML= vcounterOne;
}

function decrfirst(){
    if (countOne>0){
    countOne= countOne- 1;
    vcounterOne= vcounterOne.replace('🍎','');
    document.getElementById('firstNum').innerHTML= countOne;
    document.getElementById('vcountOne').innerHTML= vcounterOne;
}
else {
document.getElementById('firstNum').innerHTML="No Apples";
document.getElementById('vcountOne').innerHTML= "🐒"
}
}

function incrsecond(){
    countTwo= countTwo+ 1;
    vcounterTwo= vcounterTwo+ String('🍓');
    document.getElementById('secondNum').innerHTML= countTwo;
    document.getElementById('vcountTwo').innerHTML= vcounterTwo;
}

function decrsecond(){
    if (countTwo>0){
    countTwo= countTwo- 1;
    vcounterTwo= vcounterTwo.replace('🍓','');
    document.getElementById('secondNum').innerHTML= countTwo;
    document.getElementById('vcountTwo').innerHTML= vcounterTwo;
}
else {
    document.getElementById('secondNum').innerHTML= "No Strawberries";
    document.getElementById('vcountTwo').innerHTML= "🐒";
}
}

function getsum(){
    if (countOne+ countTwo>0){
    sum = countOne+ countTwo;
    vsum= vcounterOne+ vcounterTwo;
    document.getElementById('sumNum').innerHTML= sum;
    document.getElementById('vSum').innerHTML= vsum;
}
else {
    document.getElementById('sumNum').innerHTML= "No Fruits";
    document.getElementById('vSum').innerHTML= "🐒";
}
}
