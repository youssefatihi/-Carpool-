# Covoiturage Backend

Backend Spring Boot minimal pour une application de covoiturage avec données mockées/hardcodées.

## 🎯 Objectif

Ce backend sert uniquement à supporter le développement frontend React avec des données mockées. Il permet de démarrer rapidement le développement frontend sans attendre l'implémentation complète du backend.

## 🚀 Démarrage rapide

### Prérequis
- Java 17 ou supérieur
- Maven 3.6+

### Installation et lancement

```bash
# Cloner le projet
git clone <repo-url>
cd covoiturage-backend

# Lancer l'application
mvn spring-boot:run
```

L'application sera disponible sur `http://localhost:8080/api`

## 📚 Documentation API

Une fois l'application lancée, la documentation Swagger est disponible sur :
- **Swagger UI** : http://localhost:8080/api/swagger-ui.html
- **OpenAPI JSON** : http://localhost:8080/api/v3/api-docs

## 🔐 Comptes de test

Le backend est initialisé avec ces comptes de test :

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| driver1@test.com | password123 | Conducteur |
| driver2@test.com | password123 | Conducteur |
| passenger1@test.com | password123 | Passager |
| passenger2@test.com | password123 | Passager |
| admin@test.com | password123 | Admin |

## 🛣️ Endpoints principaux

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription
- `POST /api/auth/refresh` - Renouvellement token

### Trajets
- `GET /api/trips` - Liste des trajets (pagination)
- `GET /api/trips/{id}` - Détail d'un trajet
- `GET /api/trips/search` - Recherche de trajets
- `POST /api/trips` - Créer un trajet (conducteur)
- `GET /api/trips/my-trips` - Mes trajets (conducteur)

### Utilisateurs
- `GET /api/users/me` - Mon profil
- `PUT /api/users/me` - Modifier mon profil
- `GET /api/users/{id}` - Profil public d'un utilisateur
- `POST /api/users/upload-avatar` - Upload avatar (mockée)

### Réservations
- `POST /api/bookings` - Créer une réservation
- `GET /api/bookings/my-bookings` - Mes réservations (passager)
- `GET /api/bookings/my-trip-bookings/{tripId}` - Réservations d'un trajet (conducteur)
- `PUT /api/bookings/{id}/confirm` - Confirmer une réservation
- `PUT /api/bookings/{id}/cancel` - Annuler une réservation

### Avis
- `POST /api/reviews` - Créer un avis
- `GET /api/reviews/user/{userId}` - Avis reçus par un utilisateur

## 🔧 Configuration

### Base de données
- **H2 en mémoire** pour le développement
- Console H2 accessible sur : http://localhost:8080/api/h2-console
- URL JDBC : `jdbc:h2:mem:testdb`
- Username : `sa` / Password : `password`

### JWT
- Secret : `devSecretKey123456789`
- Durée token : 24h
- Durée refresh token : 7 jours

### CORS
- Autorisé pour `http://localhost:5173` (Vite)
- Autorisé pour `http://localhost:3000` (Create React App)

## 📊 Données mockées

Le backend génère automatiquement :
- **15 utilisateurs** (5 conducteurs, 8 passagers, 1 admin, 1 compte test)
- **40 trajets** répartis entre 12 villes françaises
- **20 réservations** avec différents statuts
- **30 avis** avec commentaires réalistes

## 🏗️ Architecture

```
src/main/java/com/covoiturage/backend/
├── config/          # Configuration Spring Security, CORS, etc.
├── controller/      # Contrôleurs REST
├── dto/            # Objets de transfert de données
│   ├── request/    # DTOs pour les requêtes
│   └── response/   # DTOs pour les réponses
├── model/          # Entités JPA
├── service/        # Services métier (avec données mockées)
├── security/       # Configuration JWT et filtres
├── util/           # Générateurs de données mockées
└── exception/      # Gestion des erreurs
```

## 🎛️ Fonctionnalités

### ✅ Implémenté (avec mocks)
- Authentification JWT complète
- CRUD complet pour tous les modèles
- Recherche et filtrage des trajets
- Pagination des résultats
- Gestion des erreurs globale
- Documentation Swagger
- Validation des données
- CORS configuré

### 🔄 À implémenter plus tard
- Base de données PostgreSQL
- Envoi d'emails
- Paiements
- Géolocalisation
- Notifications push
- Tests automatisés

## 🛠️ Développement

### Modifier les données mockées
Les données sont générées dans `MockDataGenerator.java`. Vous pouvez :
- Ajouter/modifier des utilisateurs
- Changer les villes disponibles
- Ajuster les prix des trajets
- Personnaliser les commentaires

### Ajouter un endpoint
1. Créer le DTO dans `dto/request` ou `dto/response`
2. Ajouter la méthode dans le service approprié
3. Créer l'endpoint dans le contrôleur
4. Tester avec Swagger

### Logs
Les logs sont configurés pour afficher :
- Niveau DEBUG pour le package `com.covoiturage.backend`
- Niveau DEBUG pour Spring Security
- Toutes les requêtes SQL (JPA)

## 🚨 Important

⚠️ **Ce backend utilise des données mockées en mémoire**
- Les données sont perdues à chaque redémarrage
- Parfait pour le développement frontend
- Ne pas utiliser en production

## 📞 Support

Pour toute question ou problème :
1. Vérifier les logs au démarrage
2. Consulter la documentation Swagger
3. Tester les endpoints avec Postman ou curl

## 🔄 Prochaines étapes

1. Développer le frontend React
2. Remplacer progressivement les mocks par de vraies implémentations
3. Ajouter PostgreSQL
4. Implémenter les fonctionnalités avancées
5. Déployer en production