# 🚗 Plateforme de Covoiturage

Une application web moderne de covoiturage développée avec Spring Boot (backend) et React (frontend).

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation complète](#installation-complète)
- [Lancement du projet](#lancement-du-projet)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Troubleshooting](#troubleshooting)

## Vue d'ensemble

Cette plateforme permet de :
- 🚘 Publier des trajets en tant que conducteur
- 🔍 Rechercher et réserver des trajets en tant que passager
- 💬 Communiquer entre conducteurs et passagers
- ⭐ Noter et commenter les trajets
- 💳 Gérer les réservations

## Technologies utilisées

### Backend
- **Java 17+**
- **Spring Boot 3.2+**
- **Spring Security** (JWT)
- **H2 Database** (développement)
- **PostgreSQL** (production - à venir)
- **Maven**

### Frontend
- **Node.js 18+**
- **React 18**
- **TypeScript**
- **Vite**
- **React Router**
- **Axios**

## Prérequis

Avant de commencer, vous devez installer les outils suivants sur votre machine.

### 1. Java Development Kit (JDK)

#### Windows
1. Télécharger JDK 17 depuis [Oracle](https://www.oracle.com/java/technologies/downloads/#java17) ou [Adoptium](https://adoptium.net/)
2. Exécuter l'installateur
3. Configurer la variable d'environnement JAVA_HOME :
   - Ouvrir les variables d'environnement système
   - Créer `JAVA_HOME` = `C:\Program Files\Java\jdk-17`
   - Ajouter `%JAVA_HOME%\bin` au PATH

#### macOS
```bash
# Avec Homebrew
brew install openjdk@17

# Ou télécharger depuis Oracle/Adoptium
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk

# Fedora
sudo dnf install java-17-openjdk-devel
```

Vérifier l'installation :
```bash
java -version
# Devrait afficher : openjdk version "17.x.x"
```

### 2. Maven

#### Windows
1. Télécharger Maven depuis [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
2. Extraire dans `C:\Program Files\Apache\maven`
3. Ajouter `C:\Program Files\Apache\maven\bin` au PATH

#### macOS
```bash
brew install maven
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt install maven

# Fedora
sudo dnf install maven
```

Vérifier l'installation :
```bash
mvn -version
# Devrait afficher : Apache Maven 3.x.x
```

### 3. Node.js et npm

#### Windows/macOS
Télécharger et installer depuis [https://nodejs.org/](https://nodejs.org/) (version LTS recommandée)

#### Linux
```bash
# Avec NodeSource
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Ou avec snap
sudo snap install node --classic
```

Vérifier l'installation :
```bash
node -version  # v18.x.x ou plus
npm -version   # 9.x.x ou plus
```

### 4. Git (optionnel mais recommandé)

```bash
# Windows : télécharger depuis https://git-scm.com/
# macOS : brew install git
# Linux : sudo apt install git
```

## Installation complète

### 1. Cloner ou télécharger le projet

```bash
# Si vous avez Git
git clone <url-du-repo>
cd covoiturage

# Ou télécharger et extraire le ZIP
```

### 2. Configuration du Backend

```bash
# Naviguer vers le backend
cd backend

# Installer les dépendances
mvn clean install

# Si erreur de certificat SSL avec Maven, essayer :
mvn -Dmaven.wagon.http.ssl.insecure=true clean install
```

### 3. Configuration du Frontend

```bash
# Dans un nouveau terminal, naviguer vers le frontend
cd ../frontend

# Installer les dépendances
npm install

# Si npm install échoue, essayer :
npm cache clean --force
npm install
```

## Lancement du projet

### 1. Démarrer le Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

Le backend sera accessible sur : `http://localhost:8080/api`

Vérifier que le backend fonctionne :
- Swagger UI : http://localhost:8080/api/swagger-ui.html
- Health check : http://localhost:8080/api/actuator/health

### 2. Démarrer le Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Le frontend sera accessible sur : `http://localhost:5173`

## Utilisation

### Comptes de test disponibles

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| driver1@test.com | password123 | Conducteur |
| driver2@test.com | password123 | Conducteur |
| passenger1@test.com | password123 | Passager |
| passenger2@test.com | password123 | Passager |
| admin@test.com | password123 | Admin |

### Fonctionnalités principales

1. **Page d'accueil** : Recherche de trajets
2. **Connexion** : Utiliser un compte de test
3. **Publier un trajet** (conducteurs uniquement)
4. **Réserver un trajet** (passagers)
5. **Mes trajets** : Voir ses trajets/réservations

### Base de données H2

Console H2 accessible (en dev) : http://localhost:8080/api/h2-console
- JDBC URL : `jdbc:h2:mem:testdb`
- Username : `sa`
- Password : `password`

## Structure du projet

```
covoiturage/
├── backend/        # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/         # Code source Java
│   │   │   └── resources/    # Configurations
│   ├── pom.xml               # Dépendances Maven
│   └── README.md
│
└── frontend/       # Frontend React
    ├── src/
    │   ├── components/       # Composants React
    │   ├── pages/           # Pages de l'app
    │   ├── services/        # Appels API
    │   ├── types/           # Types TypeScript
    │   └── App.tsx          # Composant principal
    ├── package.json         # Dépendances npm
    └── vite.config.ts       # Config Vite
```

## Troubleshooting

### Problèmes courants

#### Port déjà utilisé
```bash
# Backend (8080)
netstat -ano | findstr :8080  # Windows
lsof -i :8080                  # macOS/Linux
# Tuer le processus ou changer le port dans application.properties

# Frontend (5173)
# Changer le port dans vite.config.ts
```

#### Erreur CORS
- Vérifier que le backend est bien lancé
- Vérifier l'URL dans les services frontend

#### Maven build failure
```bash
# Nettoyer et reconstruire
mvn clean
mvn install -DskipTests

# Si problème de mémoire
set MAVEN_OPTS=-Xmx1024m  # Windows
export MAVEN_OPTS=-Xmx1024m  # macOS/Linux
```

#### npm install échoue
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Utiliser une version spécifique de Node
nvm use 18  # Si vous avez nvm
```

### Logs et débogage

- **Backend logs** : Dans la console où `mvn spring-boot:run` est lancé
- **Frontend logs** : Console du navigateur (F12)
- **Network** : Onglet Network des DevTools pour voir les appels API

## 🚀 Prochaines étapes

1. **Développement** : Le backend utilise des données mockées, parfait pour le développement frontend
2. **Base de données** : Migrer vers PostgreSQL pour la production
3. **Tests** : Ajouter des tests unitaires et d'intégration
4. **CI/CD** : Configurer GitHub Actions ou GitLab CI
5. **Déploiement** : Docker, Kubernetes, ou services cloud

## 📝 Notes importantes

- Les données sont réinitialisées à chaque redémarrage du backend (H2 en mémoire)
- Les tokens JWT expirent après 24h
- Le projet est configuré pour le développement local uniquement

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request



**Besoin d'aide ?** Ouvrir une issue sur GitHub ou contacter l'équipe de développement.