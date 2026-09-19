# Online Bookstore - Front-End

A modern, responsive, and fully tested React frontend application for the **Simple Online Bookstore**, built with TypeScript, React Router Data APIs, TanStack Query, Zustand, and Tailwind CSS.

---

## 🌟 Key Features

- **Book Catalog & Filtering**: Browse curated software engineering and literature books with real-time title/author searching.
- **Book Details**: Detailed view of each book with ISBN, description, price, live stock indicators, and direct add-to-cart actions.
- **Shopping Cart**: Real-time shopping cart with item quantity increment/decrement, item removal, subtotal and order summary calculations.
- **Checkout & Order Placement**: Multi-field validated shipping and contact form with instant checkout mutation.
- **Order History**: Track past orders with fulfillment status badges, item breakdowns, shipping metadata, and formatted totals.
- **Authentication**: JWT authentication with persistent session state (cookies and Zustand), dedicated login and registration pages with full-field validations.
- **Data Loaders & Suspense**: Declarative data fetching powered by React Router Data APIs with TanStack Query caching and smooth skeleton suspense states.
- **Granular Error Handling**: Route-level and application-level error boundaries rendering dedicated HTTP error pages (404 Not Found, 401/403 Unauthorized, 500 Server Error).
- **Responsive & Accessible UI**: Decomposed components built with Tailwind CSS, accessible form controls (`react-hook-form`), and Lucide icons.

---

## 🏗️ Architecture & Best Practices

- **Strict Test-Driven Development (TDD)**: Every feature was developed following Red $\rightarrow$ Green $\rightarrow$ Refactor with discrete git commits.
- **Co-located Tests**: Every unit test is co-located directly next to the source file it tests (`[Component].test.tsx` next to `[Component].tsx`).
- **Single Responsibility Principle (SRP)**:
  - Navbar is decomposed into `BrandLogo`, `NavSearchBar`, `CartButton`, and `UserNav`.
  - Book elements are decomposed into `BookCover`, `StockBadge`, `BookInfo`, `BookCard`, and `BookDetailCard`.
  - Forms utilize reusable `EmailInput`, `PasswordInput`, `FullNameInput`, `PhoneInput`, and `AddressInput`.
- **DRY Design & Reusability**: Centralized utilities for `formatCurrency` and `formatDate` (defaulting to `'en-US'`), shared `QuantitySelector`, and `EmptyState`.
- **Performance Optimization**: `MemoizedBookCard` and `MemoizedCartItemRow` prevent unnecessary re-renders in large lists.
- **State Management**:
  - **Server State**: Managed via TanStack Query with optimistic cache queries and invalidation.
  - **Client State**: Fine-grained Zustand stores for authentication (`useAuthStore`), search filtering (`useSearchStore`), and toast alerts (`useToastStore`).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI Library |
| **TypeScript** | Static typing & interface definitions |
| **React Router 7 / DOM 6** | Declarative routing, data loaders, protected routes |
| **TanStack Query (React Query)** | Server state management & caching |
| **Zustand** | Lightweight client state management |
| **React Hook Form** | Performant form state & validation |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icons |
| **Vitest & React Testing Library** | Unit and integration testing |
| **Vite** | Fast development server and build tool |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18)
- `pnpm` package manager

### Installation
```bash
pnpm install
```

### Development Server
```bash
pnpm dev
```
Runs the app in development mode at [http://localhost:5173](http://localhost:5173).

### Running Tests
```bash
pnpm test
```
Executes all 55 test suites (167 unit/integration tests) using Vitest.

### Type Checking
```bash
pnpm exec tsc --noEmit
```
Verifies zero TypeScript errors.

### Production Build
```bash
pnpm build
```
Type checks and bundles the production distribution into `dist/`.

### Preview Production Build
```bash
pnpm preview
```
Previews the production build locally.
