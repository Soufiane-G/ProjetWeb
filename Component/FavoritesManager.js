// Gestionnaire centralisé des favoris
export const FavoritesManager = {
    // Clé pour le localStorage
    STORAGE_KEY: 'cinema_favoris',

    // Récupérer tous les favoris
    getFavorites() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    // Sauvegarder les favoris
    saveFavorites(favorites) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
    },

    // Vérifier si un article est en favoris
    isFavorite(articleId) {
        const favorites = this.getFavorites();
        return favorites.includes(articleId);
    },

    // Ajouter un article aux favoris
    addFavorite(articleId) {
        const favorites = this.getFavorites();
        if (!favorites.includes(articleId)) {
            favorites.push(articleId);
            this.saveFavorites(favorites);
            return true;
        }
        return false;
    },

    // Retirer un article des favoris
    removeFavorite(articleId) {
        let favorites = this.getFavorites();
        const index = favorites.indexOf(articleId);
        if (index > -1) {
            favorites.splice(index, 1);
            this.saveFavorites(favorites);
            return true;
        }
        return false;
    },

    // Basculer l'état favori d'un article
    toggleFavorite(articleId) {
        if (this.isFavorite(articleId)) {
            this.removeFavorite(articleId);
            return false;
        } else {
            this.addFavorite(articleId);
            return true;
        }
    },

    // Obtenir le nombre de favoris
    getFavoritesCount() {
        return this.getFavorites().length;
    }
};






