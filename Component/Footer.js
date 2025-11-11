export default {
    name: 'FooterComponent',

    // ✅ Tout ce qui peut changer vient en props (données passées par le parent)
    props: {
        aboutText: {
            type: String,
            default: "Découvrez les dernières actualités du cinéma belge."
        },
        links: {
            type: Array,
            // ex: [{ label: 'Accueil', href: 'index.html' }, ...]
            default: () => ([
                { label: "Accueil",        href: "index.html"  },
                { label: "Articles",       href: "article.html"},
                { label: "Personnalisation", href: "custom.html"},
                { label: "Articles", href: "articles.html", active: false },
                { label: "Favoris", href: "favoris.html", active: false },
                { label: "Formulaire", href: "formulaire.html", active: false },
                { label: "Connexion", href: "connexion.html", active: false },
                { label: "A propos", href: "apropos.html", active: false }
            ])
        },
        contact: {
            type: Object,
            // ex: { email: 'contact@monsite.be', phone: '+32 2 123 45 67' }
            default: () => ({
                email: "contact@monsite.be",
                phone: "+32 2 123 45 67"
            })
        },
        siteName: {
            type: String,
            default: "Bilain Jaber"
        },
        theme: {
            // "light" | "dark" (à toi de mapper ces classes à ton CSS si besoin)
            type: String,
            default: "light"
        }
    },

    computed: {
        year() {
            return new Date().getFullYear()
        },
        footerClasses() {
            // ✅ Tu ne changes PAS ton CSS : on applique juste des classes conditionnelles
            // Adapte si tu as .bg-dark/.text-white dans ton CSS/Bootstrap
            return [
                "bg-white",
                "shadow-sm",
                "mt-5",
                this.theme === "dark" ? "bg-dark text-white" : "bg-white"
            ]
        }
    },

    template: `
  <footer  :class="footerClasses">
    <section class="container py-4">
      <section class="row">
        <section class="col-md-4 mb-3">
        <a href="aPropos.html" class="text-decoration-none">
          <h5 class="text-primary mb-3">À propos
          
          </h5></a>
          
          <p class="text-muted mb-0">{{ aboutText }}</p>
        </section>

        <nav class="col-md-4 mb-3" aria-label="Liens rapides">
          <h5 class="text-primary mb-3">Liens rapides</h5>
          <ul class="list-unstyled mb-0">
            <li v-for="(l, i) in links" :key="i">
              <a class="text-muted text-decoration-none" :href="l.href">{{ l.label }}</a>
            </li>
          </ul>
        </nav>

        <section class="col-md-4">
          <h5 class="text-primary mb-3">Contact</h5>
          <p class="text-muted mb-0">
            Email: <a class="text-muted text-decoration-none" :href="'mailto:' + contact.email">{{ contact.email }}</a><br>
            Tél: {{ contact.phone }}
          </p>
          <!-- ✅ Slot optionnel si tu veux injecter un bloc (réseaux sociaux, newsletter...) -->
          <slot name="extra"></slot>
        </section>
      </section>

      <hr class="my-4">
      <p class="text-center text-muted mb-0">
        &copy; {{ year }} {{ siteName }}. Tous droits réservés.
      </p>
    </section>
  </footer>
  `
}