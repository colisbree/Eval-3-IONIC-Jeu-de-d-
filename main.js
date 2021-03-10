function run(joueur){
    
    // Initialisation des scores
    document.getElementById('score-player-one').innerText=0;
    document.getElementById('score-player-two').innerText=0;
    document.getElementById('score-current-player-one').innerText=0;
    document.getElementById('score-current-player-two').innerText=0;
    document.getElementById("actif1").style.display="none";
    document.getElementById("actif2").style.display="none";

    // joueur qui démarre la partie
    document.getElementById("actif" + joueur).style.display="";
}

function initial_start() {
    joueur = Math.floor(Math.random()*2)+1;
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Rèlge du jeu';
    alert.subHeader = '----------------------';
    alert.message = "<p>Le jeu comprend 2 joueurs sur un seul et même écran.</p><p>Chaque joueur possède un score temporaire (CURRENT) et un score global (GLOBAL).</p><p>À chaque tour, le joueur a son score temporaire initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le résultat d’un lancer est ajouté à son score temporaire.</p><p>Lors de son tour, le joueur peut décider à tout moment de:<br/>- Cliquer sur l’option “Hold”, qui permet d’envoyer les points du score temporaire vers le score GLOBAL. Ce sera alors le tour de l’autre joueur.<br/>- Lancer le dé. S’il obtient un 1, son score temporaire est perdu et c’est la fin de son tour.</p><p><b>Le premier joueur qui atteint les 100 points au GLOBAL gagne le jeu.</b></p><p>Le joueur " + joueur + " démarre la partie.</p><p>Bonne Chance !</p>";
    alert.buttons = ['OK'];
  
    run(joueur);
    document.body.appendChild(alert);
    return alert.present();
  }
