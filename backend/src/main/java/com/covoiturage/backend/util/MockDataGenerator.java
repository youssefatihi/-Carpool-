package com.covoiturage.backend.util;

import com.covoiturage.backend.model.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Component
public class MockDataGenerator {
    
    private final PasswordEncoder passwordEncoder;
    
    public MockDataGenerator(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    
    public List<User> generateUsers() {
        List<User> users = new ArrayList<>();
        
        // Comptes hardcodés
        users.add(createUser(1L, "driver1@test.com", "password123", "Pierre", "Martin", User.Role.DRIVER, 
                "Conducteur expérimenté avec 5 ans d'expérience. Conduite sécurisée et conviviale.", 4.8, "0678901234", true, false, true));
        users.add(createUser(2L, "driver2@test.com", "password123", "Marie", "Dupont", User.Role.DRIVER, 
                "Conduis régulièrement Paris-Lyon. Ponctuelle et responsable.", 4.6, "0612345678", false, true, false));
        users.add(createUser(3L, "passenger1@test.com", "password123", "Julien", "Bernard", User.Role.PASSENGER, 
                "Passager régulier, toujours prêt à participer aux frais et à la conversation.", 4.9, "0634567890", false, false, true));
        users.add(createUser(4L, "passenger2@test.com", "password123", "Sophie", "Moreau", User.Role.PASSENGER, 
                "Étudiante sympa qui voyage souvent le week-end.", 4.7, "0656789012", false, false, false));
        users.add(createUser(5L, "admin@test.com", "password123", "Admin", "System", User.Role.ADMIN, 
                "Administrateur système", 5.0, "0600000000", false, false, false));
        
        // Conducteurs supplémentaires
        users.add(createUser(6L, "lucas.garcia@email.com", "password123", "Lucas", "Garcia", User.Role.DRIVER, 
                "Conducteur professionnel, véhicule confortable et climatisé.", 4.9, "0645123789", false, false, true));
        users.add(createUser(7L, "emma.rousseau@email.com", "password123", "Emma", "Rousseau", User.Role.DRIVER, 
                "Conduis souvent sur l'axe Sud-Est. Adore les voyages et les rencontres.", 4.5, "0623456789", true, true, true));
        users.add(createUser(8L, "nicolas.petit@email.com", "password123", "Nicolas", "Petit", User.Role.DRIVER, 
                "Ingénieur qui fait du covoiturage pour partager les frais d'essence.", 4.7, "0678123456", false, false, false));
        
        // Passagers supplémentaires
        users.add(createUser(9L, "chloe.david@email.com", "password123", "Chloé", "David", User.Role.PASSENGER, 
                "Étudiante en master, voyage souvent pour les vacances.", 4.8, "0634789123", false, false, true));
        users.add(createUser(10L, "antoine.roux@email.com", "password123", "Antoine", "Roux", User.Role.PASSENGER, 
                "Jeune professionnel, ponctuel et respectueux.", 4.6, "0656123789", false, false, false));
        users.add(createUser(11L, "lea.simon@email.com", "password123", "Léa", "Simon", User.Role.PASSENGER, 
                "Voyageuse expérimentée, toujours de bonne humeur.", 4.9, "0612789456", false, true, true));
        users.add(createUser(12L, "thomas.michel@email.com", "password123", "Thomas", "Michel", User.Role.PASSENGER, 
                "Photographe freelance, voyage pour le travail.", 4.4, "0678456123", true, false, false));
        users.add(createUser(13L, "camille.laurent@email.com", "password123", "Camille", "Laurent", User.Role.PASSENGER, 
                "Étudiante en médecine, calme et studieuse.", 4.8, "0634123456", false, false, false));
        users.add(createUser(14L, "hugo.martin@email.com", "password123", "Hugo", "Martin", User.Role.PASSENGER, 
                "Sportif qui se déplace souvent pour les compétitions.", 4.5, "0623789456", false, false, true));
        users.add(createUser(15L, "manon.dubois@email.com", "password123", "Manon", "Dubois", User.Role.PASSENGER, 
                "Artiste qui voyage pour les expositions et événements.", 4.7, "0656789123", false, true, true));
        
        return users;
    }
    
    public List<Trip> generateTrips() {
        List<Trip> trips = new ArrayList<>();
        List<String> cities = Arrays.asList("Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille", "Rennes", "Grenoble", "Montpellier");
        List<String> carModels = Arrays.asList("Peugeot 208", "Renault Clio", "Citroën C3", "Volkswagen Golf", "Ford Fiesta", "Opel Corsa", "Nissan Micra", "Toyota Yaris");
        List<String> colors = Arrays.asList("Blanc", "Noir", "Gris", "Rouge", "Bleu", "Vert");
        List<Long> driverIds = Arrays.asList(1L, 2L, 6L, 7L, 8L);
        
        for (int i = 1; i <= 40; i++) {
            String departureCity = cities.get(ThreadLocalRandom.current().nextInt(cities.size()));
            String arrivalCity;
            do {
                arrivalCity = cities.get(ThreadLocalRandom.current().nextInt(cities.size()));
            } while (arrivalCity.equals(departureCity));
            
            LocalDateTime departureDate = LocalDateTime.now().plus(ThreadLocalRandom.current().nextInt(1, 60), ChronoUnit.DAYS)
                    .plus(ThreadLocalRandom.current().nextInt(6, 22), ChronoUnit.HOURS);
            
            BigDecimal price = calculatePrice(departureCity, arrivalCity);
            int totalSeats = ThreadLocalRandom.current().nextInt(2, 5);
            int availableSeats = ThreadLocalRandom.current().nextInt(1, totalSeats + 1);
            
            Trip trip = new Trip();
            trip.setId((long) i);
            trip.setDriverId(driverIds.get(ThreadLocalRandom.current().nextInt(driverIds.size())));
            trip.setDepartureCity(departureCity);
            trip.setArrivalCity(arrivalCity);
            trip.setDepartureAddress(generateAddress(departureCity));
            trip.setArrivalAddress(generateAddress(arrivalCity));
            trip.setDepartureDate(departureDate);
            trip.setPrice(price);
            trip.setAvailableSeats(availableSeats);
            trip.setTotalSeats(totalSeats);
            trip.setDescription(generateTripDescription(departureCity, arrivalCity));
            trip.setStatus(Trip.Status.ACTIVE);
            trip.setCreatedAt(LocalDateTime.now().minus(ThreadLocalRandom.current().nextInt(1, 10), ChronoUnit.DAYS));
            trip.setCarModel(carModels.get(ThreadLocalRandom.current().nextInt(carModels.size())));
            trip.setCarColor(colors.get(ThreadLocalRandom.current().nextInt(colors.size())));
            
            trips.add(trip);
        }
        
        return trips;
    }
    
    public List<Booking> generateBookings() {
        List<Booking> bookings = new ArrayList<>();
        List<Long> passengerIds = Arrays.asList(3L, 4L, 9L, 10L, 11L, 12L, 13L, 14L, 15L);
        List<Booking.Status> statuses = Arrays.asList(Booking.Status.PENDING, Booking.Status.CONFIRMED, Booking.Status.CANCELLED);
        List<String> messages = Arrays.asList(
                "Bonjour, je souhaite réserver une place pour ce trajet. Merci !",
                "Salut, je suis ponctuel et voyage léger. À bientôt !",
                "Hello, j'aimerais réserver 2 places si possible. Merci d'avance.",
                "Bonjour, je confirme ma réservation. Pouvez-vous me donner votre numéro ?",
                "Salut, super trajet ! Je réserve une place.",
                "Bonjour, je voyage souvent sur ce trajet. Hâte de faire votre connaissance !",
                "Hello, je réserve pour moi et un ami. Nous sommes sympas !",
                "Bonjour, merci pour ce trajet. Je serai là à l'heure convenue."
        );
        
        for (int i = 1; i <= 20; i++) {
            Long tripId = (long) ThreadLocalRandom.current().nextInt(1, 41);
            Long passengerId = passengerIds.get(ThreadLocalRandom.current().nextInt(passengerIds.size()));
            int numberOfSeats = ThreadLocalRandom.current().nextInt(1, 3);
            Booking.Status status = statuses.get(ThreadLocalRandom.current().nextInt(statuses.size()));
            
            Booking booking = new Booking();
            booking.setId((long) i);
            booking.setTripId(tripId);
            booking.setPassengerId(passengerId);
            booking.setNumberOfSeats(numberOfSeats);
            booking.setStatus(status);
            booking.setTotalPrice(BigDecimal.valueOf(25 * numberOfSeats));
            booking.setCreatedAt(LocalDateTime.now().minus(ThreadLocalRandom.current().nextInt(1, 30), ChronoUnit.DAYS));
            booking.setMessage(messages.get(ThreadLocalRandom.current().nextInt(messages.size())));
            
            bookings.add(booking);
        }
        
        return bookings;
    }
    
    public List<Review> generateReviews() {
        List<Review> reviews = new ArrayList<>();
        List<String> comments = Arrays.asList(
                "Excellent conducteur, très ponctuel et voiture confortable !",
                "Voyage agréable, bonne ambiance et conduite sécurisée.",
                "Parfait ! Recommande vivement ce conducteur.",
                "Très bon voyage, conducteur sympa et véhicule propre.",
                "RAS, trajet effectué dans de bonnes conditions.",
                "Super expérience, à refaire sans hésiter !",
                "Conducteur ponctuel et respectueux, merci !",
                "Voyage agréable, bonne conversation durant le trajet.",
                "Rien à redire, parfait du début à la fin.",
                "Très bonne expérience de covoiturage, je recommande !",
                "Conduite prudente et respectueuse, merci beaucoup.",
                "Parfait, conducteur très sympa et voyage confortable."
        );
        
        for (int i = 1; i <= 30; i++) {
            Long fromUserId = (long) ThreadLocalRandom.current().nextInt(3, 16);
            Long toUserId = (long) ThreadLocalRandom.current().nextInt(1, 16);
            while (fromUserId.equals(toUserId)) {
                toUserId = (long) ThreadLocalRandom.current().nextInt(1, 16);
            }
            
            Review review = new Review();
            review.setId((long) i);
            review.setFromUserId(fromUserId);
            review.setToUserId(toUserId);
            review.setTripId((long) ThreadLocalRandom.current().nextInt(1, 41));
            review.setRating(ThreadLocalRandom.current().nextInt(3, 6));
            review.setComment(comments.get(ThreadLocalRandom.current().nextInt(comments.size())));
            review.setCreatedAt(LocalDateTime.now().minus(ThreadLocalRandom.current().nextInt(1, 60), ChronoUnit.DAYS));
            
            reviews.add(review);
        }
        
        return reviews;
    }
    
    private User createUser(Long id, String email, String password, String firstName, String lastName, User.Role role, 
                           String bio, Double rating, String phoneNumber, Boolean smoker, Boolean pets, Boolean music) {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRole(role);
        user.setBio(bio);
        user.setRating(rating);
        user.setPhoneNumber(phoneNumber);
        user.setSmoker(smoker);
        user.setPets(pets);
        user.setMusic(music);
        user.setProfilePicture("https://i.pravatar.cc/150?u=" + email);
        user.setCreatedAt(LocalDateTime.now().minus(ThreadLocalRandom.current().nextInt(30, 365), ChronoUnit.DAYS));
        return user;
    }
    
    private BigDecimal calculatePrice(String departureCity, String arrivalCity) {
        Map<String, Integer> basePrices = new HashMap<>();
        basePrices.put("Paris-Lyon", 30);
        basePrices.put("Paris-Marseille", 45);
        basePrices.put("Paris-Toulouse", 40);
        basePrices.put("Lyon-Marseille", 25);
        basePrices.put("Lyon-Nice", 35);
        basePrices.put("Marseille-Nice", 20);
        
        String route = departureCity + "-" + arrivalCity;
        String reverseRoute = arrivalCity + "-" + departureCity;
        
        Integer basePrice = basePrices.get(route);
        if (basePrice == null) {
            basePrice = basePrices.get(reverseRoute);
        }
        if (basePrice == null) {
            basePrice = ThreadLocalRandom.current().nextInt(20, 50);
        }
        
        int variation = ThreadLocalRandom.current().nextInt(-5, 6);
        return BigDecimal.valueOf(basePrice + variation);
    }
    
    private String generateAddress(String city) {
        List<String> streets = Arrays.asList("Rue de la République", "Avenue des Champs", "Boulevard Saint-Michel", 
                "Place de la Mairie", "Rue Victor Hugo", "Avenue Jean Jaurès");
        String street = streets.get(ThreadLocalRandom.current().nextInt(streets.size()));
        int number = ThreadLocalRandom.current().nextInt(1, 200);
        return number + " " + street + ", " + city;
    }
    
    private String generateTripDescription(String departureCity, String arrivalCity) {
        List<String> descriptions = Arrays.asList(
                "Trajet direct " + departureCity + " → " + arrivalCity + ". Véhicule confortable, climatisation.",
                "Voyage " + departureCity + "-" + arrivalCity + " en bonne compagnie. Arrêt possible en cours de route.",
                "Covoiturage " + departureCity + " vers " + arrivalCity + ". Départ ponctuel, conduite sécurisée.",
                "Trajet régulier " + departureCity + "-" + arrivalCity + ". Ambiance détendue, musique au choix.",
                "Voyage " + departureCity + " → " + arrivalCity + " dans véhicule récent. Bagages acceptés.",
                "Covoiturage " + departureCity + "-" + arrivalCity + ". Partage des frais d'autoroute inclus."
        );
        return descriptions.get(ThreadLocalRandom.current().nextInt(descriptions.size()));
    }
}