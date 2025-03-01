# SwiftCart Frontend Application

A modern, full-featured e-commerce application built with React, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart management
- 💳 Secure checkout process
- 👤 User authentication
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication-related components
│   ├── layout/        # Layout components (navbar, etc.)
│   ├── product/       # Product-related components
│   └── ui/            # Basic UI components (buttons, etc.)
├── lib/               # Utilities and context providers
├── pages/             # Page components
└── main.tsx          # Application entry point
```

### Key Components

#### Authentication (`src/lib/auth.tsx`)
- Manages user authentication state
- Provides login/signup functionality
- Protects routes requiring authentication

#### Cart Management (`src/lib/cart.tsx`)
- Handles shopping cart state
- Provides add/remove/update item functionality
- Calculates cart totals

#### API Integration (`src/lib/api.ts`)
- Centralizes API calls
- Handles authentication headers
- Provides typed API methods

### Pages

#### Home (`src/pages/home.tsx`)
- Landing page with featured products
- Hero section with promotional content

#### Products (`src/pages/products.tsx`)
- Product listing with filtering
- Category navigation
- Search functionality

#### Product Details (`src/pages/product.tsx`)
- Detailed product information
- Image gallery
- Add to cart functionality

#### Cart (`src/pages/cart.tsx`)
- Cart items display
- Quantity adjustment
- Checkout process initiation

#### Checkout (`src/pages/checkout.tsx`)
- Multi-step checkout process
- Shipping information collection
- Payment processing

#### Account (`src/pages/account.tsx`)
- User profile management
- Order history
- Account settings

### Components

#### Navbar (`src/components/layout/navbar.tsx`)
- Main navigation
- Cart status
- User menu

#### Product Card (`src/components/product/product-card.tsx`)
- Product display card
- Quick actions
- Price and details

#### Protected Route (`src/components/auth/protected-route.tsx`)
- Route protection for authenticated users
- Redirect to login

#### Button (`src/components/ui/button.tsx`)
- Reusable button component
- Multiple variants
- Loading state support

## API Integration

The application integrates with a REST API for:

- User authentication
- Product data
- Order management
- User profile management

API endpoints are centralized in `src/lib/api.ts` for easy maintenance.

## State Management

- **Authentication**: Context-based auth state
- **Cart**: Context-based cart management
- **API Data**: Axios for API requests

## Styling

- Tailwind CSS for utility-first styling
- Custom components with consistent design
- Responsive design patterns

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   VITE_API_URL=your_api_url
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- TypeScript for type safety
- ESLint for code quality
- Vite for fast development
- React Router for navigation

## Production

Build the application:
```bash
npm run build
```

The build output will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request`