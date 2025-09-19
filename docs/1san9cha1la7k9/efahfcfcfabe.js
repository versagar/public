function loadScript(dtf) {
    if (dtf === "O0O0O0O010O0O0O0O0") {
        hint = "/1san9cha1la7k9/dbhhfcfcfabe.js"
    }
    if (dtf === "O0O000001OOOO0O0O0") {
        hint = "/1san9cha1la7k9/dkbhhfcfcfabieaeElcg.js"
    }
    if (dtf === "OO0O00O010O0OO0O00") {
        hint = "/1san9cha1la7k9/djfghhfbadejjeha.js"
    }
    if (dtf === "OO0O0O0010O00O0O00") {
        hint = "/1san9cha1la7k9/bbhgcjcgjcfdajia.js"
    }
    if (dtf === "../O0O0O0O010O0O0O0O0") {
        hint = "../1san9cha1la7k9/dbhhfcfcfabe.js"
    }
    if (dtf === "../O0O000001OOOO0O0O0") {
        hint = "../1san9cha1la7k9/dkbhhfcfcfabieaeElcg.js"
    }
    if (dtf === "../OO0O00O010O0OO0O00") {
        hint = "../1san9cha1la7k9/djfghhfbadejjeha.js"
    }
    if (dtf === "../OO0O0O0010O00O0O00") {
        hint = "../1san9cha1la7k9/bbhgcjcgjcfdajia.js"
    }
    if (dtf === "../../O0O0O0O010O0O0O0O0") {
        hint = "../../1san9cha1la7k9/dbhhfcfcfabe.js"
    }
    if (dtf === "../../O0O000001OOOO0O0O0") {
        hint = "../../1san9cha1la7k9/dkbhhfcfcfabieaeElcg.js"
    }
    if (dtf === "../../OO0O00O010O0OO0O00") {
        hint = "../../1san9cha1la7k9/djfghhfbadejjeha.js"
    }
    if (dtf === "../../OO0O0O0010O00O0O00") {
        hint = "../../1san9cha1la7k9/bbhgcjcgjcfdajia.js"
    }
    getHint(hint)
}

function getBeauty(cds) {
    let hint;  // Declare hint variable
    
    if (cds === "dtp") {
        hint = "bjedh";
    } else if (cds === "mbp") {
        hint = "bdeja";
    } else if (cds === "kpp") {
        hint = "cigja";
    } else {
        hint = cds;  // Default to cds if no match
    }
    
    // Pass the full CSS path to the beautyHint function
    beautyHint("/b1eaut2yofp1hys4er9/" + hint + ".css");
    beautyHint("b1eaut2yofp1hys4er9/" + hint + ".css");
    beautyHint("../b1eaut2yofp1hys4er9/" + hint + ".css");
    beautyHint("../../b1eaut2yofp1hys4er9/" + hint + ".css");
    beautyHint("../../../b1eaut2yofp1hys4er9/" + hint + ".css");
}