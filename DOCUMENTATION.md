# Learn & Earn Zone - Documentation

## Introduction

Learn & Earn Zone is a comprehensive quiz-based learning platform built with Next.js and Payload CMS. The platform allows users to read educational blog posts, complete quizzes to earn points, participate in a referral system, and withdraw their earnings. It's designed as a gamified learning experience where knowledge acquisition is rewarded with cryptocurrency-like points.

## Features Overview

### Core Features
- **User Authentication**: Email-based registration with verification
- **Blog Content Management**: Rich text blog posts with categories
- **Quiz System**: Multiple-choice quizzes linked to blog posts
- **Point System**: Earn points for completing quizzes and referrals
- **Referral Program**: Earn bonus points by referring new users
- **Wallet System**: Track points and USDT balance
- **Withdrawal System**: Request withdrawals of earned points
- **Admin Panel**: Full content management via Payload CMS
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Technical Features
- **Next.js 16**: Modern React framework with App Router
- **Payload CMS 3.62**: Headless CMS for content management
- **MongoDB**: Database for data persistence
- **Vercel Blob Storage**: Media file storage
- **Email Integration**: Nodemailer for notifications
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations

## Tech Stack & Requirements

### Frontend
- **Next.js 16.0.10**: React framework
- **React 19.1.0**: UI library
- **TypeScript 5.7.3**: Type safety
- **Tailwind CSS 4.1.15**: Styling
- **Framer Motion 12.23.24**: Animations
- **Lucide React**: Icons
- **Radix UI**: Accessible components

### Backend/CMS
- **Payload CMS 3.62.0**: Headless CMS
- **MongoDB**: Database
- **Vercel Blob Storage**: Media storage
- **Nodemailer 7.0.10**: Email service

### Development Tools
- **Node.js 24.x**: Runtime
- **PNPM 9/10**: Package manager
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Unit testing
- **Playwright**: E2E testing

### System Requirements
- Node.js 24.x
- PNPM package manager
- MongoDB database
- Email service (Gmail recommended)

## Folder Structure Explanation

```
learnearnzone-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/         # Public pages
│   │   ├── (payload)/          # Admin panel
│   │   ├── api/                # API routes
│   │   └── sitemap.xml/        # Dynamic sitemap
│   ├── collections/            # Payload CMS collections
│   │   ├── Blogs.ts           # Blog posts
│   │   ├── Members.ts         # User accounts
│   │   ├── Quizzes.ts         # Quiz content
│   │   ├── Withdrawals.ts     # Withdrawal requests
│   │   ├── Categories.ts      # Content categories
│   │   ├── Media.ts           # File uploads
│   │   └── Users.ts           # Admin users
│   ├── blocks/                # Payload CMS blocks
│   │   ├── Banner/            # Banner block
│   │   ├── Content/           # Rich text content
│   │   ├── Form/              # Form builder
│   │   └── MediaBlock/        # Media display
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   └── ...                # Feature components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── utilities/             # Helper functions
│   ├── access/                # Payload access control
│   ├── fields/                # Custom field configurations
│   └── payload.config.ts      # Payload CMS configuration
├── public/                    # Static assets
├── tests/                     # Test files
├── package.json               # Dependencies
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
└── docker-compose.yml        # Docker setup
```

## Installation Guide

### Prerequisites
1. **Node.js 24.x** - Download from [nodejs.org](https://nodejs.org/)
2. **PNPM** - Install globally: `npm install -g pnpm`
3. **MongoDB** - Either local installation or MongoDB Atlas account
4. **Email Account** - Gmail recommended for SMTP

### Install Dependencies
```bash
# Clone the repository
git clone <repository-url>
cd learnearnzone-web

# Install dependencies
pnpm install
```

### Environment Variables Setup
Create a `.env` file in the root directory:

```env
# MongoDB connection
DATABASE_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Payload CMS secret (used for JWT auth)
PAYLOAD_SECRET=your-secret-key-here

NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Quiz Learn
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Vercel Blob Storage (for production)
BLOB_READ_WRITE_TOKEN=vercel-blob-token

# Email configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin emails (comma-separated)
ADMIN_EMAILS=admin@example.com
```
As per the request, admin_emails have been added to the .env file so that only admins can get full access. Make sure administrator emails are separated by commas if multiple. Multiple people can be given access by collection.

### Database Setup
1. **MongoDB Atlas** (Recommended):
   - Create account at [mongodb.com](https://mongodb.com)
   - Create a cluster and database
   - Get connection string and update `DATABASE_URI`

2. **Local MongoDB**:
   ```bash
   # Using Docker
   docker-compose up -d
   ```

### Running the Project

#### Development Mode
```bash
pnpm dev
```
Access the application at `http://localhost:3000`

#### Production Build
```bash
pnpm build
pnpm start
```

#### Admin Panel Access
1. Visit `http://localhost:3000/admin`
2. Create your first admin user
3. Access the Payload CMS admin panel

## Admin Panel Usage (Payload CMS)

### Content Management
1. **Blogs**: Create and manage educational content
   - Add rich text content with images
   - Link quizzes to blog posts
   - Set categories and SEO metadata

2. **Quizzes**: Create multiple-choice questions
   - Define questions with options
   - Set correct answers
   - Assign point values

3. **Categories**: Organize content
   - Create topic categories
   - Add featured images

4. **Members**: User management
   - View user profiles
   - Manage wallets and balances
   - Track completed content

5. **Withdrawals**: Process payment requests
   - Review withdrawal requests
   - Approve or reject transactions
   - Automatic wallet updates

### Media Management
- Upload images and files via Vercel Blob Storage
- Automatic image optimization with Sharp
- Focal point cropping for responsive images

## User Panel Usage

### Registration & Login
1. **Sign Up**: Create account with email verification
2. **Email Verification**: Confirm email to activate account
3. **Login**: Access dashboard with credentials

### Learning Experience
1. **Browse Blogs**: Explore educational content by category
2. **Read Articles**: Full rich text content with images
3. **Take Quizzes**: Answer multiple-choice questions
4. **Earn Points**: Automatic point allocation for correct answers

### Wallet & Earnings
1. **View Balance**: Track points and USDT balance
2. **Referral Program**: Share referral code to earn bonus points
3. **Withdraw Funds**: Request withdrawal when minimum threshold met

### Profile Management
- Update personal information
- View completed content
- Track quiz scores and progress

## Customization Guide

### Styling
- **Tailwind CSS**: Modify `tailwind.config.js` for custom themes
- **Component Styling**: Update component files in `src/components/`
- **Global Styles**: Add custom CSS in appropriate component files

### Content Types
- **Add Collections**: Create new Payload collections in `src/collections/`
- **Custom Fields**: Extend existing collections with new fields
- **Blocks**: Create custom content blocks in `src/blocks/`

### API Extensions
- **Custom Endpoints**: Add API routes in `src/app/api/`
- **Hooks**: Implement custom logic with Payload hooks
- **Access Control**: Modify permissions in `src/access/`

### Email Templates
- **Templates**: Customize email templates in API routes
- **Notifications**: Add new email triggers for user actions

## Deployment Guide

### Vercel Deployment (Recommended)
1. **Connect Repository**: Link GitHub repository to Vercel
2. **Environment Variables**: Set all required environment variables
3. **Database**: Ensure MongoDB Atlas connection
4. **Build Settings**: Configure build commands and output directory
5. **Deploy**: Automatic deployments on push to main branch

### Manual Deployment
1. **Build Application**:
   ```bash
   pnpm build
   ```

2. **Server Setup**:
   - Node.js hosting (Heroku, Railway, etc.)
   - Set environment variables
   - Configure domain and SSL

3. **Database**: Ensure production database connection

### Docker Deployment
```bash
# Build and run with Docker
docker build -t learnearnzone .
docker run -p 3000:3000 learnearnzone
```

## Legal Disclaimer For Learn & Earn projects

**Educational Purpose Only**: This platform is designed for educational and entertainment purposes. Points earned have no real monetary value and cannot be exchanged for actual currency except through approved withdrawal methods.

**Terms of Service**: Users must agree to terms regarding fair play, content usage, and withdrawal policies.

**Data Privacy**: User data is collected and stored in accordance with privacy policies. Personal information is protected and not shared with third parties.

**Content Accuracy**: While efforts are made to ensure educational content accuracy, users should verify information independently.

**Liability**: Platform operators are not responsible for any financial losses or damages resulting from platform usage.

---

*This documentation is for the Learn & Earn Zone platform. For technical support, please refer to the Payload CMS documentation or contact the development team.*
