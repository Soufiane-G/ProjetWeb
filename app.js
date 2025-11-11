import { createApp } from 'vue'
import HeaderComponent from './Component/Header.js'
import FooterComponent from './Component/Footer.js'
import {FavoritesManager} from './Component/FavoritesManager.js'

createApp({
    components: {
        'header-component': HeaderComponent,
        'footer-component': FooterComponent,
    },
    data() {
        return {
            // Compteur d'articles visibles (mis à jour par index.js via une fonction globale)
            articlesVisibles: 0,

            // Compteur de favoris
            favoritesCount: FavoritesManager.getFavoritesCount(),

            header:{
                siteName: "Bilain Jaber",
                links: [
                    { label: "Accueil", href: "index.html", active: true },
                    { label: "Articles", href: "article.html", active: false },
                    { label: "Personnalisation", href: "custom.html", active: false },
                    { label: "Articles", href: "articles.html", active: false },
                    { label: "Favoris", href: "favoris.html", active: false },
                    { label: "Formulaire", href: "formulaire.html", active: false },
                    { label: "Connexion", href: "connexion.html", active: false },
                    { label: "A propos", href: "apropos.html", active: false }
                ]
            },
            footer: {
                about: "Découvrez les dernières actualités du cinéma belge.",
                links: [
                    { label: "Accueil",          href: "index.html"   },
                    { label: "Articles",         href: "article.html" },
                    { label: "Personnalisation", href: "custom.html"  },
                    { label: "Articles", href: "articles.html", active: false },
                    { label: "Favoris", href: "favoris.html", active: false },
                    { label: "Formulaire", href: "formulaire.html", active: false },
                    { label: "Connexion", href: "connexion.html", active: false },
                    { label: "A propos", href: "apropos.html", active: false }
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
    methods: {
        updateFavoritesCount() {
            this.favoritesCount = FavoritesManager.getFavoritesCount();
        }
    },
    mounted() {
        // Exposer une méthode globale pour que index.js puisse mettre à jour le compteur
        window.updateArticlesVisibles = (count) => {
            this.articlesVisibles = count;
        };

        // Écouter les changements dans le localStorage (pour synchronisation entre onglets)
        window.addEventListener('storage', (e) => {
            if (e.key === 'cinema_favoris') {
                this.updateFavoritesCount();
            }
        });

        // Exposer une méthode pour mettre à jour les favoris depuis index.js
        window.updateFavoritesCount = () => {
            this.updateFavoritesCount();
        };
    }
}).mount('#app')






