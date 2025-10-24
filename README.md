# CraftLink 🛍️

Empowering women to sell handmade goods, food, and clothing from home.

## 🚀 Features

- **Beautiful Responsive Homepage**
- **Seller Registration & Dashboard**
- **Product Management System**
- **Order Management**
- **PostgreSQL Database with Prisma ORM**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Prisma, PostgreSQL
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Feben145/craftlink.git
   cd craftlink
   ```

# 2. Install dependencies

npm install

# 3. Set up environment variables

# Create .env file and add your database URL

DATABASE_URL="postgresql://username:password@localhost:5432/craftlink"

# 4. Set up database

npx prisma generate
npx prisma migrate dev
npx tsx scripts/seed.ts

# 5. Run development server

npm run dev
