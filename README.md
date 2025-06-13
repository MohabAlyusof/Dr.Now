# Dr.Now - MERN Stack Gesundheitsplattform

## Überblick

Dr.Now ist eine umfassende Gesundheitsplattform, die mit dem MERN-Stack (MongoDB, Express.js, React.js, Node.js) erstellt wurde. Sie ermöglicht eine nahtlose Interaktion zwischen Patienten, Ärzten und Administratoren und bietet Funktionen wie Terminplanung, Videoberatungen (unterstützt von Agora), sichere Zahlungen (Stripe) und eine robuste Benutzerverwaltung. Dieses Projekt zielt darauf ab, eine effiziente und benutzerfreundliche Erfahrung für die Verwaltung von Gesundheitsdiensten zu bieten.

## Funktionen

- **Benutzerauthentifizierung**: Sichere Anmeldung und Registrierung für Patienten, Ärzte und Administratoren.
- **Terminverwaltung**: Patienten können Termine bei Ärzten buchen, und Ärzte können ihre Zeitpläne verwalten.
- **Videoberatung**: Integriertes Agora SDK für Echtzeit-Videoanrufe zwischen Patienten und Ärzten.
- **Integration von Zahlungsgateways**: Unterstützt Stripe und für sichere Online-Transaktionen.
- **Cloudinary-Integration**: Für effiziente Bild- und Dateiuploads.
- **Admin-Panel**: Ein dediziertes Dashboard für Administratoren zur Verwaltung von Benutzern, Ärzten und Systemeinstellungen.
- **Responsives Design**: Benutzerfreundliche Oberfläche auf verschiedenen Geräten.

## Live-Demo

[https://dr-now-frontend.onrender.com]
[https://dr-now-admin.onrender.com]

## Verwendete Technologien

### Frontend (Admin-Panel)

- **React.js**: Eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen.
- **Vite**: Ein schnelles Build-Tool für moderne Webprojekte.
- **Tailwind CSS**: Ein Utility-First-CSS-Framework für die schnelle UI-Entwicklung.
- **Axios**: Versprechensbasierter HTTP-Client für den Browser und Node.js.
- **Framer Motion**: Eine produktionsreife Bewegungsbibliothek für React.
- **React Router DOM**: Deklaratives Routing für React.
- **React Icons**: Beliebte Icons als React-Komponenten.
- **React Toastify**: Für einfache Benachrichtigungen.
- **Agora RTC SDK NG**: Für Echtzeit-Videokommunikation.

### Backend

- **Node.js**: JavaScript-Laufzeitumgebung.
- **Express.js**: Schnelles, meinungsfreies, minimalistisches Web-Framework für Node.js.
- **MongoDB**: Eine NoSQL-Datenbank zum Speichern von Anwendungsdaten.
- **Mongoose**: Eine ODM-Bibliothek (Object Data Modeling) für MongoDB und Node.js.
- **bcrypt**: Zum Hashen von Passwörtern.
- **jsonwebtoken**: Zur Implementierung der JWT-basierten Authentifizierung.
- **dotenv**: Zum Laden von Umgebungsvariablen aus einer `.env`-Datei.
- **cors**: Zum Aktivieren von Cross-Origin Resource Sharing.
- **multer**: Eine Middleware zur Verarbeitung von `multipart/form-data`, hauptsächlich für das Hochladen von Dateien verwendet.
- **Cloudinary**: Cloud-basierter Bild- und Videoverwaltungsdienst.
- **Stripe**: Zahlungsabwicklungsplattform.
- **validator**: Zur Zeichenkettenvalidierung und -bereinigung.
- **Agora Access Token**: Zum Generieren von Agora-Tokens.

## Installation und Einrichtung

### Voraussetzungen

- Node.js (v14 oder höher)
- npm oder Yarn
- MongoDB-Instanz (lokal oder Cloud-basiert)
- Cloudinary-Konto
- Stripe-Konto
- Agora.io-Konto

### Backend-Einrichtung

1.  **Klonen Sie das Repository:**
    ```bash
    git clone <repository_url>
    cd Dr.Now/backend
    ```
2.  **Installieren Sie die Abhängigkeiten:**
    ```bash
    npm install
    # oder yarn install
    ```
3.  **Erstellen Sie eine `.env`-Datei** im Verzeichnis `backend` und fügen Sie Ihre Umgebungsvariablen hinzu:
    ```
    PORT=7777
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    AGORA_APP_ID=your_agora_app_id
    AGORA_APP_CERTIFICATE=your_agora_app_certificate
    ```
4.  **Starten Sie den Backend-Server:**
    ```bash
    npm start
    # oder npm run server (für die Entwicklung mit nodemon)
    ```

### Frontend-Einrichtung (Admin-Panel)

1.  **Navigieren Sie zum Frontend-Verzeichnis:**
    ```bash
    cd ../admin
    ```
2.  **Installieren Sie die Abhängigkeiten:**
    ```bash
    npm install
    # oder yarn install
    ```
3.  **Starten Sie den Frontend-Entwicklungsserver:**
    ```bash
    npm run dev
    ```

## Projektstruktur

```
Dr.Now/
├── admin/                # Frontend (React.js Admin-Panel)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/              # Backend (Node.js/Express.js API)
    ├── config/           # Datenbank- und Cloudinary-Konfigurationen
    ├── controllers/      # Geschäftslogik für API-Endpunkte
    ├── models/           # Mongoose-Schemas
    ├── middleware/       # Express-Middleware
    ├── routes/           # API-Routen
    ├── node_modules/
    ├── package.json
    └── server.js         # Haupt-Backend-Serverdatei
```

## Mitwirken

Beiträge sind willkommen! Bitte befolgen Sie diese Schritte:

1.  Forken Sie das Repository.
2.  Erstellen Sie einen neuen Branch (`git checkout -b feature/YourFeature`).
3.  Nehmen Sie Ihre Änderungen vor.
4.  Committen Sie Ihre Änderungen (`git commit -m 'Add some feature'`).
5.  Pushen Sie zum Branch (`git push origin feature/YourFeature`).
6.  Öffnen Sie einen Pull Request.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert – weitere Details finden Sie in der Datei LICENSE.


