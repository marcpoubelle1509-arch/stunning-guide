# Carnet d'entraînement : installer ta propre appli

Ce dossier contient toute l'application. Elle fonctionne sans Claude, sans compte et hors ligne (photos comprises). Tes données sont enregistrées sur ton téléphone.

Contenu :
- `index.html` : l'application
- `sw.js` : le service worker qui la fait marcher hors ligne
- `manifest.webmanifest` et les icônes `icon-*.png` : ce qui la rend installable
- `lib.json` et le dossier `sh/` : la bibliothèque de 870 exercices et leurs photos (domaine public, Free Exercise DB)
- `.nojekyll` : fichier caché nécessaire pour GitHub Pages (ne pas le supprimer)

---

## Étape 0 : récupérer tes données actuelles

Dans la version actuelle (celle hébergée sur Claude) : **Réglages → Exporter un fichier (.json)**. Garde ce fichier, tu l'importeras dans la nouvelle appli.

## Étape 1 : mettre l'appli en ligne gratuitement (GitHub Pages, ~10 min, sur ordinateur)

1. Crée un compte sur https://github.com (gratuit).
2. Crée un nouveau dépôt (**New repository**) :
   - Nom conseillé : `ton-pseudo.github.io` (remplace `ton-pseudo` par ton nom d'utilisateur GitHub, exactement). L'appli sera alors à l'adresse `https://ton-pseudo.github.io/`, ce qui simplifie l'étape 3.
   - Visibilité : **Public**.
3. Dans le dépôt : **Add file → Upload files**, puis glisse **tout le contenu** de ce dossier (fichiers + dossier `sh`). Clique sur **Commit changes**.
   - Si le fichier `.nojekyll` n'apparaît pas (fichier caché), crée-le : **Add file → Create new file**, nom `.nojekyll`, contenu vide, **Commit**.
4. **Settings → Pages** : Source = **Deploy from a branch**, Branch = `main`, dossier `/ (root)`, **Save**.
5. Attends 1 à 2 minutes : ton appli est en ligne à `https://ton-pseudo.github.io/`.

## Étape 2 : l'installer sur ton téléphone

1. Ouvre l'adresse dans **Chrome** sur Android.
2. Menu ⋮ → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
3. Lance-la depuis l'icône, puis **Réglages → Importer → Choisir un fichier d'export** → ton fichier de l'étape 0 → **Tout remplacer**.
4. Ouvre-la une fois avec du réseau et attends quelques secondes : elle télécharge les photos (~11 Mo) pour le mode hors ligne.

C'est suffisant pour un usage perso : icône, plein écran, hors ligne.

## Étape 3 (facultatif) : générer une vraie APK

1. Va sur https://www.pwabuilder.com, colle l'adresse de ton appli, lance l'analyse.
2. **Package for stores → Android → Generate package**, puis télécharge le zip.
3. Le zip contient un `.apk` (pour installer directement) et un `.aab` (pour le Play Store). Envoie l'`.apk` sur ton téléphone et installe-le (Android demandera d'autoriser l'installation d'applis inconnues).
4. Pour enlever la barre d'adresse en haut de l'appli : le zip contient un fichier `assetlinks.json`. Dans ton dépôt, crée le fichier `.well-known/assetlinks.json` avec ce contenu (**Add file → Create new file**, tape `.well-known/assetlinks.json` comme nom). Ça ne marche que si l'appli est à la racine du domaine, d'où le nom de dépôt conseillé à l'étape 1.

Le Play Store n'est utile que pour diffuser l'appli à d'autres : compte développeur Google Play, 25 $ une fois, vérification d'identité.

---

## Tes données

- Elles sont dans le stockage local de l'appli, sur ton téléphone uniquement.
- Protections incluses :
  1. Au lancement, l'appli demande à Android de protéger son stockage (statut visible dans **Réglages**).
  2. Une copie de secours automatique est faite chaque jour d'ouverture (les 2 dernières sont gardées, restaurables dans **Réglages**).
  3. Une carte « Sauvegarde à faire » apparaît si ton dernier export a plus de 15 jours. Le bouton ouvre le partage Android : choisis Google Drive ou ton mail.
- Elles sont effacées si tu désinstalles l'appli ou vides les données de Chrome. Exporte avant de changer de téléphone.

## Mettre à jour l'appli plus tard

Remplace `index.html` dans ton dépôt GitHub par la nouvelle version (**Add file → Upload files**). L'appli récupère la mise à jour à la prochaine ouverture avec du réseau. Tes données ne sont pas touchées.
