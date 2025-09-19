setTimeout(function () {
      if (document.getElementById('about')) {
        window.scrollBy({
          top: window.innerHeight,

          behavior: 'smooth'
        });
      }
    }, 2000);

    function wDetail(w, opener, hanger) {
      var snd = new Audio("ekdjgjchdjjacgfbElca.wav");
      var x = document.getElementById(w);
      var o = document.getElementById(opener);
      var h = document.getElementById(hanger);
      snd.play();
      if (x.style.display == "block") {
        x.style.display = "none";
        o.src = "ecabejdcddgiah.png";
        h.style.display = "none";
      }
      else {
        x.style.display = "block";
        o.src = "updraw.png";
        h.style.display = "block";
      }
    }