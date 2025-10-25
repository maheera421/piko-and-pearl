# Piko & Pearl Crochet Item Store

## Overview
Piko & Pearl is a crochet item store that provides a platform for managing products and categories. This project is built using Node.js, Express, and MongoDB with Mongoose for data management.

## Features
- **Product Management**: Add, update, delete, and fetch products.
- **Category Management**: Add, update, delete, and fetch categories.
- **RESTful API**: All operations are exposed through a RESTful API.
- **Validation**: Input validation for both products and categories.
- **Error Handling**: Centralized error handling middleware.
- **Logging**: Basic logging utilities for monitoring application behavior.

## Folder Structure
```
piko-and-pearl-backend
├── src
│   ├── index.ts               # Entry point of the application
│   ├── app.ts                  # Express app configuration
│   ├── config
│   │   ├── db.ts              # Database connection logic
│   │   └── config.ts          # Application configuration settings
│   ├── controllers
│   │   ├── category.controller.ts # Category-related request handlers
│   │   └── product.controller.ts   # Product-related request handlers
│   ├── models
│   │   ├── category.model.ts   # Mongoose schema for categories
│   │   └── product.model.ts     # Mongoose schema for products
│   ├── routes
│   │   ├── category.routes.ts   # Category-related API routes
│   │   ├── product.routes.ts    # Product-related API routes
│   │   └── index.ts             # Combine all routes
│   ├── services
│   │   ├── category.service.ts   # Business logic for categories
│   │   └── product.service.ts    # Business logic for products
│   ├── middlewares
│   │   ├── errorHandler.ts       # Centralized error handling
│   │   └── validateRequest.ts    # Request validation middleware
│   ├── validators
│   │   ├── category.validator.ts  # Validation logic for categories
│   │   └── product.validator.ts   # Validation logic for products
│   ├── utils
│   │   └── logger.ts             # Logging utilities
│   └── types
│       └── index.d.ts            # TypeScript types and interfaces
├── package.json                  # npm configuration file
├── tsconfig.json                 # TypeScript configuration file
├── .env.example                  # Template for environment variables
├── .gitignore                    # Files to ignore by Git
└── README.md                     # Project documentation
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd piko-and-pearl-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Start the application:
   ```
   npm run dev
   ```

### API Endpoints
- **Categories**
  - `GET /api/categories` - Fetch all categories
  - `POST /api/categories` - Create a new category
  - `PUT /api/categories/:id` - Update a category
  - `DELETE /api/categories/:id` - Delete a category

- **Products**
  - `GET /api/products` - Fetch all products
  - `POST /api/products` - Create a new product
  - `PUT /api/products/:id` - Update a product
  - `DELETE /api/products/:id` - Delete a product

## License
This project is licensed under the MIT License. See the LICENSE file for details.