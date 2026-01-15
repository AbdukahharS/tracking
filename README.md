# Tracking

Vue 3 tracking application for monitoring and managing deliveries, finances, and communications.

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router 4
- Pinia (state management)
- ApexCharts (data visualization)
- vite-svg-loader

## Features

- **Dashboard** - Overview of tracking data
- **List View** - Browse and manage tracked items
- **Finance Tracking** - Financial analytics with charts
- **Delivery Management** - Track and manage deliveries
- **Chat** - Communication features
- **Sidebar Navigation** - Easy access to all sections

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check and build
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Structure

```
src/
├── components/             # Reusable components
│   ├── SideBar.vue         # Navigation sidebar
│   └── BaseCheckBox.vue    # Form input component
├── pages/                  # Route views
│   ├── HomePage.vue        # Dashboard
│   ├── ListPage.vue        # List view
│   ├── FinancePage.vue     # Finance tracking with charts
│   ├── DeliveryPage.vue    # Delivery management
│   └── ChatPage.vue        # Chat/messaging
├── router/                 # Route definitions
├── stores/                 # Pinia stores
├── assets/                 # Static assets
├── App.vue                 # Root component
└── main.ts                 # Entry point
```

## Notes

- Requires Node.js 20.19.0+ or 22.12.0+
- Uses TypeScript project references
- SVG icons loaded via vite-svg-loader
