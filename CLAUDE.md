# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Database
- `npx drizzle-kit generate` - Generate database migrations
- `npx drizzle-kit migrate` - Run database migrations
- `npx drizzle-kit studio` - Open Drizzle Studio for database management
- `tsx src/db/seed.ts` - Run database seeding script

## Architecture Overview

This is a Next.js 15 e-commerce application built with the App Router, featuring:

### Core Stack
- **Framework**: Next.js 15 with App Router and React 19
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: better-auth with email/password and Google OAuth
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation

### Database Schema
The application uses a well-structured relational database with the following key entities:

- **User Management**: `userTable`, `sessionTable`, `accountTable`, `verificationTable`
- **Product Catalog**: `categoryTable`, `productTable`, `productVariantTable`
- **Shopping Cart**: `cartTable`, `cartItemTable`
- **Shipping**: `shippingAddressTable`

Key relationships:
- Users have one cart and multiple shipping addresses
- Products belong to categories and have multiple variants
- Cart contains multiple items referencing product variants

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui base components
- `src/components/common/` - Reusable business components
- `src/actions/` - Server actions for data mutations
- `src/db/` - Database configuration, schema, and seeding
- `src/lib/` - Utility libraries and configurations
- `src/helpers/` - Helper functions (e.g., money formatting)
- `src/providers/` - React context providers

### Authentication Flow
- Uses better-auth with Drizzle adapter
- Supports email/password and Google OAuth
- Session management with proper user relations
- Auth configuration in `src/lib/auth.ts`

### Cart Functionality
- Server-side cart management with session validation
- Cart items automatically merge when adding existing products
- Cart creation is lazy (created when first item is added)
- Located in `src/actions/add-cart-product/`

### Component Patterns
- UI components follow shadcn/ui conventions
- Business components in `src/components/common/`
- Server actions use Zod schemas for validation
- Proper TypeScript with path aliases (`@/*` → `./src/*`)

### Styling
- Tailwind CSS with custom configuration
- Uses Geist fonts (sans and mono)
- Toast notifications via Sonner
- Responsive design patterns

### External Dependencies
- Images hosted on `fsc-projects-static.s3.us-east-1.amazonaws.com`
- Environment variables for database and OAuth configuration

### Development Notes
- Uses TypeScript with strict configuration
- ESLint with Next.js configuration and simple-import-sort
- Prettier with Tailwind CSS plugin for formatting
- Database migrations managed through Drizzle Kit