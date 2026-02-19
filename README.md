# Kodflex - Movie Streaming Platform

A modern Netflix-style movie streaming application built with React, TypeScript, and TMDB API.

## Features

- **Netflix-style UI**: Beautiful, responsive interface inspired by Netflix
- **TMDB Integration**: Fetch real movie data from The Movie Database API
- **User Authentication**: Glassmorphic login and registration system
- **Movie Categories**: Browse trending, popular, top-rated, and upcoming movies
- **Search Functionality**: Search for your favorite movies
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, Vite

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons
- **Vitest** for testing

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kodflex
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/kodflex
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Start the development servers**
   
   - Start the backend server (from the `server` directory):
     ```bash
     npm run dev
     ```
   
   - Start the frontend (from the root directory):
     ```bash
     npm run dev
     ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Configuration

The application uses TMDB API for movie data. The API key is already configured in the frontend code:

```typescript
const API_KEY = '2ac243714eb51a261560fde07afdfaf1';
```

## Testing

### Frontend Tests
Run the frontend tests:
```bash
npm run test
```

### Backend Tests
Run the backend tests (from the `server` directory):
```bash
npm test
```

## Project Structure

```
kodflex/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   └── Home/
│   │       ├── Home.tsx
│   │       ├── Navbar.tsx
│   │       ├── Hero.tsx
│   │       └── MovieRow.tsx
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   └── MovieContext.tsx
│   ├── services/
│   │   ├── tmdbApi.ts
│   │   └── __tests__/
│   │       └── tmdbApi.test.ts
│   ├── test/
│   │   └── setup.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Features in Detail

### Authentication System
- **Glassmorphic Design**: Modern, frosted glass effect for auth forms
- **Secure Registration**: Email validation, password hashing, phone number validation
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Only authenticated users can access the main app

### Movie Display
- **Hero Section**: Featured movie with backdrop image and call-to-action buttons
- **Movie Rows**: Horizontal scrolling rows for different categories
- **Hover Effects**: Interactive movie cards with play/info buttons
- **Responsive Images**: Optimized image loading with fallbacks

### User Experience
- **Smooth Animations**: Transitions and hover effects throughout
- **Loading States**: Proper loading indicators for better UX
- **Error Handling**: User-friendly error messages and retry options
- **Mobile Responsive**: Works perfectly on all device sizes

## Environment Variables

### Frontend
No frontend environment variables are required as the TMDB API key is included.

### Backend
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For any issues or questions, please create an issue in the repository.

---

**Note**: Make sure to replace the JWT_SECRET with a secure, randomly generated string in production.
