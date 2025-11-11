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
                { label: "Articles", href: "article.html", active: false },
                { label: "Personnalisation", href: "custom.html", active: false }
            ])
        }
    },

    template: `
  <header class="main-header">
    <nav class="navbar navbar-expand-lg">
      <div class="container">

        <!-- Nom du site (prop) -->
        <a class="navbar-brand" href="index.html">{{ siteName }}</a>

        <!-- Slot pour le sélecteur de thème/police -->
        <div>
          <slot name="selectors"></slot>
        </div>

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