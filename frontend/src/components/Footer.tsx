interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLink[];
  showSocials?: boolean;
}

function Footer({ links = [], showSocials = true }: FooterProps) {
  const defaultLinks: FooterLink[] = [
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'CGU', href: '/terms' },
    { label: 'Confidentialité', href: '/privacy' }
  ];
  
  const displayLinks = links.length > 0 ? links : defaultLinks;
  
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section principale */}
        <div className="footer-main">
          <div className="footer-brand">
            <h3>🚗 Covoiturage</h3>
            <p>Voyagez ensemble, économisez plus</p>
          </div>
          
          {/* Liens */}
          <div className="footer-links">
            <h4>Liens utiles</h4>
            <ul>
              {displayLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Réseaux sociaux */}
          {showSocials && (
            <div className="footer-socials">
              <h4>Suivez-nous</h4>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="Instagram">📷</a>
              </div>
            </div>
          )}
        </div>
        
        {/* Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Covoiturage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;