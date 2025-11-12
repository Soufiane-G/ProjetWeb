window.addEventListener("DOMContentLoaded", function () {

    /*Bonus de sauvegarde de la couleur*/
    const savedColor = localStorage.getItem("text-color");
    const savedFont = localStorage.getItem("policeSize");
    if (savedColor) {
        document.documentElement.style.setProperty("--text-color", savedColor);
    }
    if (savedFont) {
        document.documentElement.style.fontSize = savedFont;
    }

    /*code JC pour le selecteur*/
    const selecteur = document.getElementById("selecteur");
    if (selecteur) {
        selecteur.innerHTML = `<label for="color-select">Couleur : </label>
        <select id="color-select">
            <option value="#000000"> NOIR </option>
            <option value="#0000FF"> BLEU</option>
            <option value="#FF0000"> ROUGE</option>
        </select>
        <label for="police-select">Taille : </label>
        <select id="police-select">
            <option value="10px"> PETIT</option>
            <option value="16px"> MOYEN</option>
            <option value="24px"> GRAND</option>
        </select>`;
    }

    const color = document.getElementById("color-select");
    if (color) {
        color.addEventListener("change", function () {
            document.documentElement.style.setProperty("--text-color", color.value);
            localStorage.setItem("text-color", color.value);
        });
    }

    const police = document.getElementById("police-select");
    if (police) {
        police.addEventListener("change", function () {
            document.documentElement.style.fontSize = police.value;
            localStorage.setItem("policeSize", police.value);
        });
    }

    // Fonction pour mettre à jour le compteur Vue
    function updateArticlesCounter() {
        const visibles = document.querySelectorAll('.info-art:not([style*="display: none"])').length;
        if (window.updateArticlesCount) {
            window.updateArticlesCount(visibles);
        }
    }

    //Affichez/Masquer l'article
    const article = document.getElementById("article-main");
    const bouton = document.getElementById("masquer-article");
    let articlePrincipalMasque = false;

    if (article && bouton) {
        bouton.addEventListener("click", function () {
            if (article.style.display !== "none") {
                article.style.display = "none";
                bouton.textContent = "Afficher l'article";
                articlePrincipalMasque = true;
            } else {
                article.style.display = "block";
                bouton.textContent = "Masquer l'article";
                articlePrincipalMasque = false;
            }
            updateArticlesCounter();
            appliquerFiltres();
        });
    }

    /*affichage des infos en haut à droite */
    const card = document.querySelectorAll('.info-art');
    const position = document.getElementById("position");
    const msg = "";

    function over(event) {
        const art = event.currentTarget.querySelector(".text-muted");
        if (art) {
            position.innerHTML = art.innerHTML;
        } else {
            position.innerHTML = msg;
        }
    }

    function out() {
        position.innerHTML = msg;
    }

    card.forEach(elem => {
        elem.addEventListener("mouseover", over);
        elem.addEventListener("mouseout", out);
    });

    const articleSecondaire = document.querySelectorAll('.article-secondaire');
    const affichePlus = document.getElementById("montrer-plus");
    const afficheMoins = document.getElementById("montrer-moins");

    let afficherArticle = 0;

    function AfficherArticles() {
        for (let i = 0; i < articleSecondaire.length; i++) {
            if (i < afficherArticle) {
                articleSecondaire[i].style.display = "block";
            } else {
                articleSecondaire[i].style.display = "none";
            }
        }
    }

    if (affichePlus) {
        affichePlus.addEventListener("click", function () {
            if (afficherArticle < articleSecondaire.length) {
                afficherArticle += 2;
                if (afficherArticle > articleSecondaire.length) {
                    afficherArticle = articleSecondaire.length;
                }
                AfficherArticles();
                updateArticlesCounter();
                appliquerFiltres();
            }
        });
    }

    if (afficheMoins) {
        afficheMoins.addEventListener("click", function () {
            if (afficherArticle > 0) {
                afficherArticle -= 2;
                if (afficherArticle < 0) {
                    afficherArticle = 0;
                }
                AfficherArticles();
                updateArticlesCounter();
                appliquerFiltres();
            }
        });
    }

    AfficherArticles();
    updateArticlesCounter(); // Initialiser le compteur au chargement

});