import { createApp } from 'vue'
import HeaderComponent from './Component/Header.js'
import FooterComponent from './Component/Footer.js'

createApp({
    components: {
        'header-component': HeaderComponent,
        'footer-component': FooterComponent,
       // 'main-component' : MainComponent

    },
    data() {
        return {
            // Compteur d'articles visibles (mis à jour par index.js via une fonction globale)
            articlesVisibles: 0,

            header:{
                siteName: "Bilain Jaber",
                links: [
                    { label: "Accueil", href: "index.html", active: true },
                    { label: "Articles", href: "article.html", active: false },
                    { label: "Personnalisation", href: "custom.html", active: false }
                ]
            },
            footer: {
                about: "Découvrez les dernières actualités du cinéma belge.",
                links: [
                    { label: "Accueil",          href: "index.html"   },
                    { label: "Articles",         href: "article.html" },
                    { label: "Personnalisation", href: "custom.html"  }
                ],
                contact: {
                    email: "contact@monsite.be",
                    phone: "+32 2 123 45 67"
                },
                siteName: "Bilain Jaber",
                theme: "light"
            }
        }
    },
    mounted() {
        // Exposer une méthode globale pour que index.js puisse mettre à jour le compteur
        window.updateArticlesVisibles = (count) => {
            this.articlesVisibles = count;
        };
    }
}).mount('#app')
