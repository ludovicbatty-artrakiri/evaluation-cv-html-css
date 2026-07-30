// ==========================================
// Sélection des éléments du DOM
// ==========================================
const form = document.querySelector('#comment-form');
const nameInput = document.querySelector('#comment-name');
const textInput = document.querySelector('#comment-text');
const errorMessage = document.querySelector('#error-message');
const commentsList = document.querySelector('#comments-list');

// ==========================================
// Fonction : afficher un message d'erreur
// ==========================================
function afficherErreur(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
}

// ==========================================
// Fonction : masquer le message d'erreur
// ==========================================
function masquerErreur() {
    errorMessage.textContent = '';
    errorMessage.hidden = true;
}

// ==========================================
// Fonction : créer une carte de commentaire
// ==========================================
function creerCommentaire(nom, texte) {
    // Carte du commentaire
    const carte = document.createElement('li');
    carte.classList.add('comment-card');

    // Nom de l'auteur
    const auteur = document.createElement('p');
    auteur.classList.add('comment-author');
    auteur.textContent = nom;

    // Texte du commentaire
    const contenu = document.createElement('p');
    contenu.classList.add('comment-text');
    contenu.textContent = texte;

    // Bouton Supprimer
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.classList.add('btn-delete');
    boutonSupprimer.textContent = '🗑️ Supprimer';

    // Suppression du commentaire au clic
    boutonSupprimer.addEventListener('click', function () {
        carte.remove();
    });

    // Assemblage de la carte
    carte.appendChild(auteur);
    carte.appendChild(contenu);
    carte.appendChild(boutonSupprimer);

    return carte;
}

// ==========================================
// Rendre supprimables les commentaires déjà présents dans le HTML
// ==========================================
const boutonsExistants = document.querySelectorAll('.comment-card .btn-delete');

for (let i = 0; i < boutonsExistants.length; i++) {
    const bouton = boutonsExistants[i];

    bouton.addEventListener('click', function () {
        bouton.parentElement.remove();
    });
}

// ==========================================
// Gestion de la soumission du formulaire
// ==========================================
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nom = nameInput.value.trim();
    const texte = textInput.value.trim();

    // Validation : nom
    if (nom.length < 2) {
        afficherErreur('Le nom doit contenir au moins 2 caractères.');
        return;
    }

    // Validation : commentaire
    if (texte.length < 10) {
        afficherErreur('Le commentaire doit contenir au moins 10 caractères.');
        return;
    }

    // Le formulaire est valide : on masque l'erreur éventuelle
    masquerErreur();

    // Création et ajout du commentaire en haut de la liste
    const nouveauCommentaire = creerCommentaire(nom, texte);
    commentsList.prepend(nouveauCommentaire);

    // Réinitialisation du formulaire
    form.reset();
});