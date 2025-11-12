export default {
    name: 'SearchForm',
    
    data() {
        return {
            motCle: '',
            dureeMin: 0,
            dureeMax: 60,
            nombreArticles: 25
        }
    },

    template: `
        <div class="card-body card mb-4">
            <p><b>Recherche formulaire : </b></p>
            <form @submit.prevent class="form-control">
                <label class="col-19 col-md-5">Mot clés :</label> 
                <input v-model="motCle" @input="appliquerFiltres" id="motInput" class="col-12 col-md-5">
                
                <div class="mb-3">
                    <label class="col-19 col-md-5">Durée Min : <span>{{ dureeMin }}</span> min</label>
                    <input 
                        type="range" 
                        v-model.number="dureeMin" 
                        @input="updateSliders"
                        class="col-12 col-md-5" 
                        min="0" 
                        max="60" 
                        step="1">
                </div>
                
                <div class="mb-3">
                    <label class="col-19 col-md-5">Durée Max : <span>{{ dureeMax }}</span> min</label>
                    <input 
                        type="range" 
                        v-model.number="dureeMax" 
                        @input="updateSliders"
                        class="col-12 col-md-5" 
                        min="0" 
                        max="60" 
                        step="1">
                </div>
                
                <label class="col-19 col-md-5">Nombre max d'articles :</label>
                <input 
                    type="number" 
                    v-model.number="nombreArticles" 
                    @input="appliquerFiltres"
                    class="col-12 col-md-5" 
                    min="1" 
                    max="20">
            </form>
        </div>
    `,
    
    mounted() {
        // Initialiser les filtres après le montage du composant
        setTimeout(() => {
            this.appliquerFiltres();
        }, 100);
    },
    
    methods: {
        appliquerFiltres() {
            const motCle = this.motCle.toLowerCase().trim();
            const minVal = this.dureeMin;
            const maxVal = this.dureeMax;
            const maxArticles = this.nombreArticles;

            const articlesFiltrables = document.querySelectorAll(".info-art, .article-card");
            let compteurAffiches = 0;

            articlesFiltrables.forEach(article => {
                if (article.id === "article-main" && window.articlePrincipalMasque) {
                    return;
                }

                let correspondCriteres = true;

                // Filtrage par mot-clé
                if (motCle) {
                    const titre = article.querySelector('.titre-form') || article.querySelector('h2');
                    if (titre) {
                        const titreText = titre.textContent.toLowerCase().trim();
                        if (!titreText.includes(motCle)) {
                            correspondCriteres = false;
                        }
                    }
                }

                // Filtrage par durée
                const readtimeElement = article.querySelector(".readtime");
                if (readtimeElement) {
                    const texte = readtimeElement.textContent;
                    const match = texte.match(/(\d+)\s*min/);
                    if (match) {
                        const tempsLecture = parseInt(match[1]);
                        if (tempsLecture < minVal || tempsLecture > maxVal) {
                            correspondCriteres = false;
                        }
                 }
                }
                    else {
                    const readingTimeAttr = article.getAttribute('data-reading-time');
                        if (readingTimeAttr) {
                        const tempsLecture = parseInt(readingTimeAttr);
                    if (tempsLecture < minVal || tempsLecture > maxVal) {
                        correspondCriteres = false;
                        }
                    }    
                }

                // Affichage des articles correspondants
                if (correspondCriteres && compteurAffiches < maxArticles) {
                    const estArticleSecondaire = article.classList.contains('article-secondaire');

                    if (estArticleSecondaire) {
                        const articleSecondaire = document.querySelectorAll('.article-secondaire');
                        const indexArticle = Array.from(articleSecondaire).indexOf(article);
                        if (window.afficherArticle !== undefined && indexArticle >= window.afficherArticle) {
                            article.style.display = "none";
                        } else {
                            article.style.display = "";
                            compteurAffiches++;
                        }
                    } else {
                        article.style.display = "";
                        compteurAffiches++;
                    }
                } else {
                    article.style.display = "none";
                }
            });

            // Mise à jour du compteur d'articles visibles
            if (window.updateArticlesCount) {
                window.updateArticlesCount(compteurAffiches);
            }
        },

        updateSliders() {
            // S'assurer que min <= max
            if (this.dureeMin > this.dureeMax) {
                this.dureeMin = this.dureeMax;
            }
            if (this.dureeMax < this.dureeMin) {
                this.dureeMax = this.dureeMin;
            }

            this.appliquerFiltres();
        }
    }
}