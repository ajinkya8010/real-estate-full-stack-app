# 🏡 HomeSeek – Productive Real Estate Marketplace

A comprehensive real estate platform built with modern web technologies, featuring interactive map-based property listings, advanced filtering capabilities, and complete user management system. This full-stack application provides a seamless experience for property browsing, listing management, and user interactions supercharged with PWA support and offline-first capabilities.

**Project Link**: [https://github.com/ajinkya8010/real-estate-full-stack-app](https://github.com/ajinkya8010/real-estate-full-stack-app)

**Live Demo**: https://real-estate-frontend-59om.onrender.com

---

## 🌟 Features

### 🗺️ Interactive Map Integration
- **Map-based property listings** with real-time location display
- **Geolocation services** for precise property positioning
- **Nearby properties discovery** based on user location
- **Interactive markers** with property preview information

### 🔍 Advanced Search & Filtering
- **Multi-criteria filtering** (price, location, property type, bedrooms, etc.)
- **Real-time search** with instant results
- **Sort functionality** (price, date, popularity)
- **Advanced property filters** for refined search results

### 👤 User Management System
- **JWT Authentication** for secure user sessions
- **User registration and login** with email verification
- **Profile management** with personal information updates
- **Dashboard** for managing user listings and favorites
- **Role-based access control** (users, agents, admins)

### 🏠 Property Management
- **CRUD operations** for property listings
- **Image upload and management** for property photos
- **Property details management** (description, amenities, specifications)
- **Listing status management** (active, sold, rented)
- **Property favorites** and wishlist functionality

### 📦 Offline-First Posting with IndexedDB
- Add or edit posts even when offline — data saved in IndexedDB via localforage
- Auto-sync on reconnection: Offline posts are sent to server automatically
- Built for reliability in poor network areas and low-connectivity environments

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router** - Declarative routing for React applications
- **Context API** - State management
- **Axios** - HTTP client for API requests
- **Leaflet/MapBox** - Interactive maps integration
- **React Hook Form** - Form validation and handling
- **localforage** – Offline storage using IndexedDB
- **PWA support** – manifest.json, custom serviceWorker.js



### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **Bcrypt.js** - Password hashing
- **Cors** - Cross-Origin Resource Sharing

### Additional Tools
- **Cloudinary/AWS S3** - Image storage and optimization

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/ajinkya8010/real-estate-full-stack-app.git
cd real-estate-full-stack-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd api

# Install dependencies
npm install

# Create environment variables file
touch .env
```

### 3. Environment Variables
Create a `.env` file in the backend directory with the following variables:

```env
DATABASE_URL=mongo_atlas_url
JWT_SECRET_KEY=your_jwt_secret_key
CLIENT_URL=client_url
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd ../client

# Install dependencies
npm install
```


### 5. Run the Application

#### Start Backend Server
```bash
cd api
node app.js
```

#### Start Frontend Development Server
```bash
cd ../client
npm start
```

The application will be running at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8800

## 📁 Project Structure

```
real-estate-full-stack-app/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── upload.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   └── Favorite.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── properties.js
│   │   └── users.js
│   ├── utils/
│   │   ├── sendEmail.js
│   │   └── validateData.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── auth/
│   │   │   ├── property/
│   │   │   └── map/
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Properties.js
│   │   │   ├── PropertyDetail.js
│   │   │   ├── Profile.js
│   │   │   └── Dashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── README.md
└── .gitignore
```


## 📱 Features in Detail

### Map Integration
- Real-time property markers on interactive maps
- Cluster markers for dense property areas
- Custom property info popups
- Drawing tools for area selection
- Geocoding for address to coordinates conversion

### Search & Filter System
- Location-based search with autocomplete
- Price range sliders
- Property type checkboxes
- Amenities filtering
- Date range selection for availability
- Sorting by relevance, price, and date

### User Dashboard
- Personal property listings management
- Favorite properties collection
- Profile settings and preferences
- Message center for property inquiries
- Analytics for property views and interactions

### Property Management
- Rich text editor for descriptions
- Multiple image upload with drag-and-drop
- Virtual tour integration (if implemented)
- Property status management
- Automated email notifications

### Offline & PWA Features
- Add/Edit posts while offline
- Local queuing with localforage + IndexedDB
- Automatic background sync when online


## 👨‍💻 Author

**Ajinkya** - [@ajinkya8010](https://github.com/ajinkya8010)

## 🙏 Acknowledgments

- **React.js Community** for excellent documentation and support
- **MongoDB** for flexible NoSQL database solutions
- **Leaflet** for amazing mapping capabilities
- **JWT.io** for authentication standards
- **Open Source Community** for inspiration and contributions

---


⭐ **Star this repository** if you found it helpful!
