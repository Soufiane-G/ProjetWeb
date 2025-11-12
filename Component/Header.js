export default {
    name: 'HeaderComponent',

    props: {
        siteName: {
            type: String,
            default: "Bilain Jaber"
        },
        links: {
            type: Array,
            default: () => ([
                { label: "Accueil", href: "index.html", active: true },
                { label: "Article", href: "article.html", active: false },
                { label: "Personnalisation", href: "custom.html", active: false },
                { label: "Articles", href: "articles.html", active: false },
                { label: "Favoris", href: "favoris.html", active: false },
                { label: "Formulaire", href: "formulaire.html", active: false },
                { label: "Connexion", href: "connexion.html", active: false },
                //{ label: "A propos", href: "apropos.html", active: false }
            ])
        },
        favoritesCount: {
            type: Number,
            default: 0
        },
        showFavoritesCounter: {
            type: Boolean,
            default: true
        }
    },

    template: `
  <header class="main-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container">

        <!-- Nom du site (prop) - utiliser un chemin relatif -->
        <a class="navbar-brand" href="index.html">{{ siteName }}</a>

        <!-- Slot pour le sélecteur de thème/police -->
        <div>
          <slot name="selectors"></slot>
        </div>

        <!-- Compteur de favoris avec icône étoile -->
        <a v-if="showFavoritesCounter" href="favoris.html" class="favorites-counter-link ms-3" title="Voir mes favoris">
          <span class="favorites-counter">
            <span class="star-icon-header">★</span>
            <span class="badge bg-primary">{{ favoritesCount }}</span>
          </span>
        </a>

        <!-- Slot pour le compteur articles -->
        <span class="ms-3">
          <slot name="counter"></slot>
        </span>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li v-for="(l, i) in links" :key="i" class="nav-item">
              <a :class="['nav-link', { active: l.active }]" :href="l.href">{{ l.label }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>`
}
    




