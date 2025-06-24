package com.covoiturage.backend.util;

import com.covoiturage.backend.service.MockBookingService;
import com.covoiturage.backend.service.MockReviewService;
import com.covoiturage.backend.service.MockTripService;
import com.covoiturage.backend.service.MockUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {
    
    private final MockUserService userService;
    private final MockTripService tripService;
    private final MockBookingService bookingService;
    private final MockReviewService reviewService;
    
    @Override
    public void run(String... args) throws Exception {
        log.info("=== INITIALISATION DES DONNÉES MOCKÉES ===");
        
        log.info("✅ Utilisateurs initialisés: {}", userService.findAll().size());
        log.info("✅ Trajets initialisés: {}", tripService.findAll().size());
        log.info("✅ Réservations initialisées: {}", bookingService.findAll().size());
        log.info("✅ Avis initialisés: {}", reviewService.findAll().size());
        
        log.info("=== DONNÉES MOCKÉES PRÊTES ===");
        log.info("🚗 Backend covoiturage démarré avec succès !");
        log.info("📖 Documentation API disponible: http://localhost:8080/api/swagger-ui.html");
        log.info("🔐 Comptes de test disponibles:");
        log.info("   - driver1@test.com / password123 (Conducteur)");
        log.info("   - driver2@test.com / password123 (Conducteur)");
        log.info("   - passenger1@test.com / password123 (Passager)");
        log.info("   - passenger2@test.com / password123 (Passager)");
        log.info("   - admin@test.com / password123 (Admin)");
    }
}