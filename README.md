# GlobeTrotter - Travel Planning App

A modern, full-featured travel planning application built with React and TypeScript, localized for Tamil Nadu, India.

## 🌟 Features

- **Trip Management**: Create, edit, and manage your travel itineraries
- **City & Stop Planning**: Add multiple cities/stops to your trips
- **Activity Tracking**: Add activities with costs and categories to each stop
- **Budget Calculator**: Automatic budget breakdown by category (Transport, Accommodation, Activities, Food)
- **Explore Destinations**: Browse and discover popular destinations in Tamil Nadu
- **User Authentication**: Simple signup/login system with localStorage
- **Localized for India**: All prices in ₹ (INR) with realistic Indian travel costs
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **localStorage** - Data persistence

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dream-weaver-travel-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable React components
│   ├── home/       # Home page components
│   ├── layout/     # Header, Footer
│   ├── trips/      # Trip-related components
│   └── ui/         # shadcn/ui components
├── data/           # Mock data and constants
├── hooks/          # Custom React hooks
├── lib/            # Utility functions
├── pages/          # Page components
├── types/          # TypeScript type definitions
└── App.tsx         # Main app component
```

## 🎯 Key Features Explained

### Trip Creation
- Create trips with name, description, dates, and cover photo
- Drag & drop image upload with Base64 conversion
- All trips saved to localStorage

### Itinerary Planning
- Add stops (cities) to your trip
- Date validation ensures stops are within trip dates
- Add multiple activities per stop with costs
- Activities categorized (sightseeing, food, adventure, culture, etc.)

### Budget Management
- Automatic calculation from:
  - Transport costs
  - Accommodation costs
  - Activity costs
  - Food estimate (₹400 per day)
- Visual breakdown with progress bars
- Per-destination cost summary

### Explore Destinations
- Browse Tamil Nadu cities (Chennai, Coimbatore, Madurai, Trichy, Ooty)
- Add cities directly to your planning trips
- Search and filter functionality

## 💰 Currency & Localization

The app is fully localized for Tamil Nadu, India:
- All prices in **₹ (INR)**
- Realistic Indian travel costs:
  - Food: ₹300-₹500 per day
  - Local transport: ₹200-₹500
  - Activities: ₹200-₹2,000
  - Accommodation: ₹1,000-₹3,000 per night
- Indian number formatting (₹1,500, ₹12,000)

## 🔐 Authentication

Simple localStorage-based authentication:
- Sign up with name, email, and password
- Sign in with email and password
- User data stored in browser localStorage
- No backend required (hackathon-safe)

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation with mobile menu
- Optimized for all screen sizes
- Touch-friendly interactions

## 🎨 UI Components

Built with shadcn/ui components:
- Buttons, Inputs, Forms
- Modals and Dialogs
- Cards and Badges
- Toast notifications
- And more...

## 📝 Data Persistence

- All trips saved to `localStorage`
- Data persists across page refreshes
- No backend required
- Easy to clear (delete localStorage key: `globeTrotter_trips`)

## 🗺️ Tamil Nadu Destinations

Pre-configured cities:
- **Chennai** - Cultural capital with beaches and temples
- **Coimbatore** - Gateway to Nilgiris
- **Madurai** - Ancient temple city
- **Trichy** - Historic city with Rock Fort
- **Ooty** - Queen of Hill Stations

## 🚧 Development Notes

- Uses Vite for fast HMR (Hot Module Replacement)
- TypeScript for type safety
- ESLint for code quality
- All images support drag & drop upload
- Base64 encoding for image storage (localStorage-safe)

## 📄 License

This project is open source and available for use.

## 👨‍💻 Development

Built with modern React best practices:
- Functional components with hooks
- TypeScript for type safety
- Component composition
- Custom hooks for reusable logic
- Context-free state management (props drilling for simplicity)

---

**Note**: This is a frontend-only application. All data is stored in browser localStorage. For production use, consider adding a backend API.
