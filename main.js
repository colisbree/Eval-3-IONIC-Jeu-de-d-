function run(joueur){
    
    // ***** Initialisation des scores ***** //
    // affichage
    document.getElementById('score-player-1').innerText=0;
    document.getElementById('score-player-2').innerText=0;
    document.getElementById('score-current-player-1').innerText=0;
    document.getElementById('score-current-player-2').innerText=0;
    document.getElementById("actif1").style.display="none";
    document.getElementById("actif2").style.display="none";

    // initalisation
    document.getElementById('score-P1').value=0;
    document.getElementById('score-P2').value=0;
    document.getElementById('score-temp-P1').value=0;
    document.getElementById('score-temp-P2').value=0;

    // joueur qui démarre la partie
    document.getElementById("actif" + joueur).style.display="";
    document.getElementById("joueur_actif").value=joueur;

}

function initial_start() {
    const joueur = Math.floor(Math.random()*2)+1;
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Règle du jeu';
    alert.subHeader = '----------------------';
    alert.message = "<p>Le jeu comprend 2 joueurs sur un seul et même écran.</p><p>Chaque joueur possède un score temporaire (CURRENT) et un score global (GLOBAL).</p><p>À chaque tour, le joueur a son score temporaire initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le résultat d’un lancer est ajouté à son score temporaire.</p><p>Lors de son tour, le joueur peut décider à tout moment de:<br/>- Cliquer sur l’option “Hold”, qui permet d’envoyer les points du score temporaire vers le score GLOBAL. Ce sera alors le tour de l’autre joueur.<br/>- Lancer le dé. S’il obtient un 1, son score temporaire est perdu et c’est la fin de son tour.</p><p><b>Le premier joueur qui atteint les 100 points au GLOBAL gagne le jeu.</b></p><p>Le joueur " + joueur + " démarre la partie.</p><p>Bonne Chance !</p>";
    alert.buttons = ['OK'];
  
    run(joueur);
    document.body.appendChild(alert);
    return alert.present();
}


function erreur() {
    const alert = document.createElement('ion-alert');
        alert.cssClass = 'my-custom-class';
        alert.header = 'Erreur !';
        alert.subHeader = '----------------------';
        alert.message = "Pour commencer le jeu, vous devez d'abord cliquer sur<br/>NEW GAME...";
        alert.buttons = ['OK'];

        document.body.appendChild(alert);
        return alert.present();
}

function joueur_actif(joueur){
    // RAZ des variables temporaires
    document.getElementById('score-temp-P' + joueur).value=0;
    document.getElementById("score-current-player-" + joueur).innerText=0;
    document.getElementById("actif" + joueur).style.display="none";
    
    // nouveau joueur actif
    let nouveauJoueurActif = joueur % 2
    nouveauJoueurActif = nouveauJoueurActif == 0 ? 1 : 2;
    document.getElementById("joueur_actif").value=nouveauJoueurActif;
    document.getElementById("actif" + nouveauJoueurActif).style.display="";
    return;
}

function roll_dice() {
    // récupération du joueur actif
    const joueur = document.getElementById("joueur_actif").value;
    if(joueur == undefined || joueur == null){
        erreur();        
    }

    // récupération du score global
    let scoreGlobal = document.getElementById("score-P" + joueur).value;
    if (scoreGlobal >= 100){
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'my-custom-class';
        alert.header = 'Désolé !';
        alert.subHeader = '----------------------';
        alert.message = "<p>La partie est terminée.</p><p>Cliquez sur NEW GAME pour commencer une nouvelle partie.</p>";
        alert.buttons = ['OK'];
   
        document.body.appendChild(alert);
        return alert.present();
    }
    
    // lancement du dé
    const resultatDe= Math.floor(Math.random()*6)+1;
    document.getElementById('valeur-de').src="de-" + resultatDe +".png";

    // le dé affiche 1
    if(resultatDe === 1){
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'my-custom-class';
        alert.header = 'Arghhhh !';
        alert.subHeader = '----------------------';
        alert.message = "Désolé, vous avez tirer un 1 !<br/>Vous passez votre tour...";
        alert.buttons = ['OK'];

        // passage de la main à l'ature joueur
        joueur_actif(joueur)
        
        document.body.appendChild(alert);
        return alert.present();
    }

    // récupération score temp
    let scoreTemp = document.getElementById("score-temp-P" + joueur).value;
    scoreTemp = scoreTemp + resultatDe;
    
    // affichage score temp
    document.getElementById("score-temp-P" + joueur).value= scoreTemp;
    document.getElementById("score-current-player-" + joueur).innerText=scoreTemp;
}

function hold(){
    // récupération du joueur actif
    const joueur = document.getElementById("joueur_actif").value;
    if(joueur == undefined || joueur == null){
        erreur();        
    }

    // récupération score temp
    let scoreTemp = document.getElementById("score-temp-P" + joueur).value;

    // ajout du score temp au score global
    let scoreGlobal = document.getElementById("score-P" + joueur).value;
    scoreGlobal = scoreGlobal + scoreTemp;

    // affichage du score global et reset du score temp
    document.getElementById('score-player-' + joueur).innerText=scoreGlobal;
    document.getElementById("score-P" + joueur).value= scoreGlobal;
    document.getElementById('score-current-player-' + joueur).innerText=0;
    document.getElementById("score-temp-P" + joueur).value= 0;

    // score global >=100
    if(scoreGlobal >= 100){
        const alert = document.createElement('ion-alert');
        alert.cssClass = 'my-custom-class';
        alert.header = 'Felicitation !';
        alert.subHeader = '----------------------';
        alert.message = "Le joueur " + joueur + " est le gagnant !<br/>avec un score de " + scoreGlobal;
        alert.buttons = ['OK'];
        
        document.body.appendChild(alert);
        return alert.present();
    }

    // passage de la main à l'ature joueur
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Yes ! ...';
    alert.subHeader = '----------------------';
    alert.message = "Votre score provisoire est sauvé.<br/>Vous passez votre tour...";
    alert.buttons = ['OK'];

    // passage de la main à l'ature joueur
    joueur_actif(joueur)
    
    document.body.appendChild(alert);
    return alert.present();


}
