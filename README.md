# Analytics Dashboard Challenge

A Next.js dashboard for tracking social media engagement across Instagram and TikTok. Built with Next.js 16, Supabase, TanStack Query, and Visx.

---

## User Credentials

1. **User A**:
   - Email: `usera@test.com`
   - Password: `TestUser123!`

2. **User B**:
   - Email: `userb@test.com`
   - Password: `TestUser123!`

---

## 🛠 Tech Stack Summary

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 16 (App Router) | SSR/CSR, routing, API routes |
| **Database** | Supabase (PostgreSQL) | Data persistence, auth, RLS |
| **Server State** | TanStack Query v5 | Caching, refetching, deduplication |
| **Client State** | Zustand | UI state, localStorage persistence |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first CSS, accessible components |
| **Charts** | Visx (D3-powered) | Composable, customizable visualizations |
| **Tables** | TanStack Table v8 | Sorting, filtering, pagination |
| **Auth** | Supabase Auth | Email/password, session management |
| **Deployment** | Vercel | Edge functions, automatic deployments |

---

## 📁 Project Structure

```
analytics-challenge/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes
│   │   │   ├── analytics/            # Analytics endpoints
│   │   │   │   └── summary/          # Summary statistics (GET)
│   │   │   ├── engagement/           # Engagement trends endpoint (POST)
│   │   │   ├── metrics/              # Metrics endpoints
│   │   │   │   └── daily/            # Daily metrics (GET, Edge runtime)
│   │   │   └── posts/                # Posts CRUD operations
│   │   │       ├── route.ts          # List posts (POST)
│   │   │       └── [id]/             # Individual post (GET)
│   │   ├── dashboard/                # Dashboard pages
│   │   │   └── page.tsx              # Main dashboard
│   │   └── auth/                     # Auth pages
│   │
│   ├── components/                   # React Components
│   │   ├── charts/                   # Chart components
│   │   │   ├── engagement/           # Engagement chart components
│   │   │   │   ├── index.tsx         # Main engagement chart
│   │   │   │   ├── visx-chart.tsx    # Visx chart implementation
│   │   │   │   ├── legend-toggle.tsx # Chart legend
│   │   │   │   └── metric-card.tsx   # Metric summary cards
│   │   │   └── chart-loading.tsx     # Loading skeleton
│   │   ├── posts/                    # Post-related components
│   │   │   ├── table/                # Posts table components
│   │   │   │   ├── index.tsx         # Main table component
│   │   │   │   ├── columns.tsx       # Table column definitions
│   │   │   │   ├── mobile-card.tsx   # Mobile card layout
│   │   │   │   ├── pagination.tsx    # Table pagination
│   │   │   │   ├── table-loading.tsx # Loading state
│   │   │   │   └── empty-state.tsx   # Empty state
│   │   │   └── modal/                # Post detail modal
│   │   ├── summary/                  # Summary card components
│   │   │   ├── index.tsx             # Main summary card
│   │   │   ├── metric-card.tsx       # Individual metric cards
│   │   │   ├── top-post-card.tsx     # Top performing post
│   │   │   └── loading.tsx           # Loading skeleton
│   │   ├── providers/                # Context providers
│   │   │   └── query-provider.tsx    # TanStack Query setup
│   │   └── ui/                       # shadcn/ui components
│   │       ├── button.tsx            # Button component
│   │       ├── card.tsx              # Card component
│   │       ├── dialog.tsx            # Dialog/modal component
│   │       ├── pagination.tsx        # Pagination component
│   │       ├── select.tsx            # Select dropdown
│   │       ├── table.tsx             # Table primitives
│   │       └── ...                   # Other UI components
│   │
│   ├── lib/                          # Utilities & Configuration
│   │   ├── auth/                     # Authentication
│   │   │   ├── auth.ts               # Server-side auth
│   │   │   └── auth-edge.ts          # Edge-compatible auth
│   │   ├── constants/                # App constants
│   │   │   ├── metrics.ts            # Metric configurations
│   │   │   ├── platforms.ts          # Platform definitions
│   │   │   └── routes.ts             # Route constants
│   │   ├── database/                 # Database types
│   │   │   └── database.types.ts     # Generated Supabase types
│   │   ├── hooks/                    # Custom React hooks
│   │   │   ├── use-posts.ts          # Posts data fetching
│   │   │   ├── use-summary.ts        # Summary data fetching
│   │   │   ├── use-trends.ts         # Engagement trends data fetching
│   │   │   └── use-daily-metrics.ts  # Daily metrics data fetching
│   │   ├── services/                 # API service layer
│   │   │   ├── engagement.service.ts # Engagement data service
│   │   │   ├── metrics.service.ts    # Metrics data service
│   │   │   ├── posts.service.ts      # Posts data service
│   │   │   └── summary.service.ts    # Summary data service
│   │   ├── stores/                   # Zustand stores
│   │   │   └── ui-store.ts           # UI state (filters, modals, etc.)
│   │   ├── supabase/                 # Supabase clients
│   │   │   ├── client.ts             # Browser client
│   │   │   ├── server.ts             # Server client
│   │   │   └── middleware.ts         # Middleware client
│   │   ├── utils/                    # Utility functions
│   │   │   ├── date-range.ts         # Date calculation utilities
│   │   │   ├── date.ts               # Date formatting utilities
│   │   │   ├── engagement.ts         # Engagement calculations
│   │   │   ├── errors.ts             # Error handling
│   │   │   ├── response.ts           # API response helpers
│   │   │   ├── utils.ts              # General utilities
│   │   │   └── validation.ts         # Input validation
│   │   └── aggregation.ts            # Data aggregation logic
│   │
│   └── middleware.ts                 # Next.js middleware (auth protection)
│
├── superbase/                        # Supabase configuration
│   ├── migrations/                   # Database migrations
│   │   └── 001_initial_schema.sql    # Initial schema setup
│   └── seed.sql                      # Seed data for testing
│
├── public/                           # Static assets
│   ├── next.svg                      # Next.js logo
│   ├── vercel.svg                    # Vercel logo
│   └── ...                           # Other static files
│
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS configuration
├── package.json                      # Dependencies
├── vercel.json                       # Vercel deployment config
├── CODE_IMPROVEMENTS.md              # Code improvement notes
├── DEPLOYMENT.md                     # Deployment guide
└── README.md                         # This file
```

### Key Architecture Decisions

**App Router Structure**
- Using Next.js 16 App Router for file-based routing
- API routes colocated with pages for better organization
- Server Components by default, Client Components where needed

**State Management Layers**
- **TanStack Query** (`src/lib/hooks/`) - Server state, caching, refetching
- **Zustand** (`src/lib/stores/`) - Client state, UI preferences, localStorage persistence
- **React State** - Component-local ephemeral state

**Component Organization**
- **Feature-based** (`charts/`, `posts/`) - Components grouped by feature
- **Shared UI** (`ui/`) - Reusable shadcn/ui primitives
- **Providers** - Context providers for global state

**Data Flow**
1. User interacts with UI component
2. Component calls custom hook (`useAnalytics`, `usePosts`)
3. Hook uses TanStack Query to fetch from API route
4. API route aggregates data from Supabase
5. Response cached by TanStack Query
6. UI updates with new data

---
# Design Decisions

## 1. Where should engagement metrics be aggregated?

**Chosen Approach: Server-Side Aggregation**

All data aggregation happens on the server. The client receives only pre-aggregated data.

### What I Built
- **Summary Metrics:**
- **Location:** `src/lib/services/summary.service.ts`
- **What:** Total engagement, average engagement rate, top post, trend percentage
- **How:** Directly calculates totals from posts using `reduce()` operations
- **Returns:** 4 computed values

```typescript
// Direct calculation without date grouping
const totalEngagement = currentPosts.reduce(
  (sum, post) => sum + calculateEngagement(post),
  0
);

// Server returns only aggregated values
return {
  totalEngagement: 1234,
  averageEngagementRate: 4.5,
  topPerformingPost: { ... },
  trendIndicator: { value: 15.2, isPositive: true }
};
```

Average Engagement Rate (%) = Σ(engagement rate of each post) / number of posts

### Why I Did It This Way

**Benefits of server-side aggregation:**

- **Minimal network transfer** - Only aggregated daily totals sent to client, not raw posts
- **Single source of truth** - All aggregation logic in one place (no duplication between client/server)
- **Better for mobile** - No client-side computation overhead, works well on slow connections
- **Scalable** - Works well up to 10k posts; can move to SQL GROUP BY at 100k+ posts

**How it works:**

**Summary Service (`summary.service.ts`):**
- Fetches posts from the database
- Directly calculates total engagement using `reduce()` and `calculateEngagement()`
- Returns aggregated summary metrics (total engagement, average rate, top post, trends)

```typescript
const totalEngagement = currentPosts.reduce(
  (sum, post) => sum + calculateEngagement(post),
  0
);
```

**Engagement Service (`engagement.service.ts`):**
- Fetches posts from the database
- Uses shared utility functions (`aggregateByDate`, `fillMissingDates`, `calculateTotals`) to group by date
- Returns daily breakdowns for charts

```typescript
{
  current: [{ date: '2024-01-01', likes: 100, comments: 20, ... }],
  previous: [{ date: '2023-12-01', likes: 80, comments: 15, ... }],
  summary: { likes: { current: 100, previous: 80, change: 25 }, ... }
}
```

TanStack Query caches these results, so switching between time periods is instant if already fetched.

### The Trade-offs

**What's good:**
- Minimal network transfer - only aggregated data sent to client
- Single source of truth for aggregation logic
- TanStack Query handles all the caching automatically
- Works well on mobile and slow connections

**What could be improved at scale:**
- At 100k+ posts, would move to database-level aggregation (SQL GROUP BY)
- Could add composite indexes on `(user_id, posted_at)` for faster queries
- Could implement materialized views for pre-computed daily rollups

---

## 2. What data should live in Zustand vs. TanStack Query vs. URL state?

**Chosen Approach: Keep it simple - Zustand for UI stuff, TanStack Query for server data**

This was actually pretty straightforward once I understood what each tool is good at.

### Where Everything Lives

| State | Where It Lives | Why |
|-------|----------|--------|
| **Platform filter** | Zustand (saved) | So it remembers if you filtered to Instagram |
| **Sort column/direction** | TanStack Table | Just table UI stuff, no need to save it |
| **Selected post (modal)** | Zustand (not saved) | Modal should close on refresh |
| **Chart view type** | Zustand (saved) | If you like area charts, it'll remember |
| **Posts data** | TanStack Query | It's from the server, TanStack Query handles it |
| **Daily metrics data** | TanStack Query | Same - server data |
| **Days filter (30/60/90)** | Zustand (saved) | Remembers your preferred time range |

### How I Set It Up

**Zustand store (`ui-store.ts`)** - Split into two groups:

*Saved to localStorage (survives refresh):*
- Platform filter (All/Instagram/TikTok)
- Page size
- Days (30/60/90)
- Chart types (line vs area)

*Not saved (resets on refresh):*
- Which post modal is open
- Modal open/closed state

**TanStack Query** - Handles all the API calls:
- Query keys like `["posts", platform, page, pageSize]` so it knows when to refetch
- Caches everything automatically
- If two components need the same data, it only fetches once

**URL state** - I didn't use it. 

### Why I Made These Choices

**Zustand for UI preferences:**

I wanted the dashboard to remember your settings. Like if you always filter to Instagram and prefer area charts, it should just stay that way when you come back. Zustand with localStorage does this perfectly.

Also, it's way simpler than syncing everything to the URL. No weird URL parsing, no navigation side effects.

**TanStack Query for server data:**

This was a no-brainer. It's literally built for fetching and caching server data. The best part is it handles all the annoying stuff - loading states, error handling, refetching, deduplication. I just call `usePosts()` and it works.

Before this project I was using Redux Toolkit, and honestly TanStack Query is so much simpler for API data.

**Why I skipped URL state:**

I thought about it - like having `?platform=instagram&days=30` in the URL so you could share links. But realistically, this is a personal dashboard. You're not sharing your analytics with anyone. And adding URL state means dealing with:
- URL parsing on mount
- Syncing URL with Zustand
- Handling browser back/forward
- More complexity for a feature nobody asked for

If this was a public analytics page or a team dashboard, then yeah, URL state would make sense. But for now, YAGNI (You Aren't Gonna Need It).

### What's Good and What's Not

**What works well:**
- Super clear where each piece of state lives
- TanStack Query does all the heavy lifting
- Settings persist across sessions
- Really easy to add new UI state

**What could be better:**
- Your settings don't sync across devices (localStorage is per-browser)

---

## 3. How do you handle the case where a user has no data?

**Chosen Approach: Return zeros and show empty states (don't crash)**

### What Happens When There's No Data

**Summary Cards:**
- Top Post card shows "No posts available" (not an error)
- Total engagement shows `0`
- Average engagement rate shows `0%`
- Trend shows `0%` (neutral, no arrow)

**Charts:**
- Loading skeleton while fetching
- Shows flat line when no data
- Doesn't crash or show a blank screen
- Handles missing previous period data gracefully

**Posts Table:**
- Hide table when no data
- Empty state with a message

**API responses:**
- Always return `[]` for empty arrays
- Always return `0` for numbers (never `null` or `undefined`)
- This keeps TypeScript happy and prevents crashes

### The Tricky Edge Cases

**What if there are 0 posts?**

Engagement rate = 0%. I thought about returning `null` or `"N/A"` but that breaks the chart rendering. Plus TypeScript would complain everywhere. Returning `0%` is technically correct (0 posts = 0% engagement) and keeps the types simple.

**What if there's no previous period data for trends?**

Trend shows `0%` change. No arrow, neutral gray color. It's the most honest answer - can't calculate a trend without data to compare.

**What if someone has only 1 post?**

Chart still renders. Shows a single point/area. Visx handles this fine, doesn't crash.

### The Code

Here's how I handle it in the API:
```typescript
const averageEngagementRate =
  currentPosts.length > 0
    ? currentPosts.reduce((sum, post) => sum + (post.engagement_rate || 0), 0) / currentPosts.length
    : 0; // Just return 0, don't overthink it
```

Simple ternary. If no posts, return 0. Done.

### Trade-offs

**What works:**
- Nothing crashes
- Consistent everywhere (always numbers, never null)
- TypeScript is happy
- Users see helpful messages

**What's not perfect:**
- `0%` engagement could be confusing (is it bad performance or no data?)
- Could show "N/A" but then I'd need to handle strings in the chart logic
- Empty states take up space, makes the dashboard look a bit empty

---

## 4. How should the "trend" percentage be calculated?

**Chosen Approach: Last 30 days vs. the 30 days before that**

I went with the simplest approach that actually makes sense.

### How It Works

If you're looking at the last 30 days:
- **Current period**: Last 30 days (e.g., Dec 1 - Dec 31)
- **Previous period**: The 30 days before that (Nov 1 - Nov 30)
- **Trend**: % change between these two periods

Code:
```typescript
const currentStartDate = new Date();
currentStartDate.setDate(currentStartDate.getDate() - days); // Go back 30 days

const previousStartDate = new Date(currentStartDate);
previousStartDate.setDate(previousStartDate.getDate() - days); // Go back another 30 days

const trendChange = ((current - previous) / previous) * 100;
```

So if you select 7 days, it compares last 7 days to the 7 days before. If you select 90 days, it compares last 90 to the previous 90. Always equal periods.

### Why I Did It This Way

**Why rolling comparison:**

It's consistent. You're always comparing apples to apples - same number of days. The UI says "↑ 15.3% vs. prior 30 days" which is pretty clear.

Also, it only needs 60 days of data max (for a 30-day comparison). New users can see trends pretty quickly.

**Why NOT "this month vs. last month":**

Months have different lengths. Comparing a 28-day February to a 31-day March is weird. Plus what if it's the 15th of the month? Do you compare a partial month? Too complicated.

**Why NOT year-over-year:**

You'd need a full year of data. A new user would see no trends for 365 days. That's terrible UX. Plus social media moves fast - comparing to a year ago isn't that useful.

### Edge Cases I Had to Handle

**Not enough data:**

If a user only has 20 days of data but asks for 30 days, I just use what's available. There's validation in `analytics.service.ts` that prevents requesting more days than the user has been active.

**Previous period is zero:**

If previous engagement was 0 and current is 100, that's technically infinite % growth. But showing "∞%" is confusing. I just return `0%` change. The `calculateChange()` function handles this:
```typescript
if (previous === 0) return 0;
```

**Negative trends:**

If engagement dropped, show it as negative with a red down arrow. Like "-12.5%". Users need to know if things are getting worse.

### What Users See

The UI shows:
```
↑ 15.3% vs. prior 30 days
```

- Green up arrow if positive
- Red down arrow if negative
- Actual percentage
- Clear label so there's no confusion about what it's comparing

### Trade-offs

**What's good:**
- Dead simple to understand
- Works for any time range
- Only needs 2x the data (60 days for 30-day trend)
- Consistent comparisons

**What could be better:**
- Doesn't account for seasonality (Christmas vs. random week in November)
- Only shows short-term trends, not long-term patterns

---

## What I'd Improve with More Time

Being realistic here - this is what I'd actually tackle if I had another week:

### Performance (The Obvious Stuff)
- **Add database indexes** - Right now I'm doing full table scans on `user_id` and `created_at`. With real data, this would be slow. Need composite indexes.
- **Optimize the chart query** - Currently fetching all daily metrics and aggregating in JS. Should probably do this in SQL with a window function.

### Features I Wanted But Didn't Have Time For
- **Date range picker** - Let users choose their own time period
- **Export to CSV** - Seems basic, but users always want to export data
- **Post editing** - Right now you can only view posts, not edit them
- **Bulk delete** - Select multiple posts and delete them at once
- **Search/filter by content** - Search post captions or filter by hashtags

### UX Polish
- **Error messages that actually help** - "Something went wrong" isn't helpful. Tell users what to do.
- **Keyboard shortcuts** - Arrow keys to navigate table, Escape to close modal, etc.
- **Mobile responsive** - It works on mobile, but it's not optimized. The cards are overlapping in Tablet view.

---

## Time Spent on This Challenge

**Total**: About 12-15 hours over 3 days 

### My Actual Development Process

**Full transparency**: I'm primarily a UI/UX developer who usually works up to API integration. I hadn't used Supabase, Zustand, or TanStack Query before this challenge. My usual stack is Redux Toolkit, so this was a learning experience.

### Day 1 - Learning Phase (~5 hours)
- **Generated the challenge requirements using AI** - Wanted to understand what I needed to build first
- **Researched the tech stack** - Read docus on TanStack Query and Zustand
- **Key realization**: TanStack Query is way simpler than Redux Toolkit for server state. Zustand is basically Redux without the boilerplate.
- **Used AI to generate SQL schema and seed data** - I'm not a database expert, so I let AI handle the initial setup

### Day 2 (~7 hours)
- **Setup** - Created Next.js project, followed Supabase docs to set up the database.
- **Auth** - Copy-pasted Supabase Auth examples, modified for my needs. Middleware inside supabase lib won't work so I moved it outside of lib/supabase/ folder.
- **Database & Seed Data** - Used the AI-generated schema, created API endpoints. Generate seed data using AI.
- **Planning** - Drew out the architecture and wireframe on paper. Decided to use AI for UI generation so I could focus on the logic and architecture.
- **NextJS App Router** - Set up the app router and middleware. 
- **TanStack Query** - Set up TanStack Query hooks. This was surprisingly easy compared to Redux. 
- **UI Components** - Generated initial UI with AI (shadcn/ui components), then customized them. Built the posts table with TanStack Table (first time using it - docs are good). 
- **State Management** - Set up Zustand. Zustand took 10 minutes to understand - it's just a simple store with hooks.
- **TanStack Table** - Built the posts table with TanStack Table.
- **Charting** - Built the engagement chart with Visx.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
# Core dependencies
npm install

# Additional packages (if not in package.json)
npm install @supabase/supabase-js @supabase/ssr
npm install zustand @tanstack/react-query
npm install @tanstack/react-table
npm install formik yup
npm install dayjs
npm install lucide-react
npm install framer-motion

# Visx for charts
npm install @visx/axis @visx/curve @visx/event @visx/grid @visx/group @visx/responsive @visx/scale @visx/shape @visx/tooltip

# shadcn/ui components
npx shadcn@latest init
npx shadcn@latest add button card dialog table select skeleton label

# Dev tools (optional)
npm install -D @tanstack/react-query-devtools
```

### 2. Setup Supabase Project

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Create Database Schema

Go to **SQL Editor** in Supabase Dashboard and run:

```sql
-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('instagram', 'tiktok')),
  caption TEXT,
  thumbnail_url TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'carousel')),
  posted_at TIMESTAMPTZ NOT NULL,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  saves INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  engagement_rate DECIMAL(5,2),
  permalink TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily metrics table
CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  engagement INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create indexes
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_posted_at ON posts(posted_at);
CREATE INDEX idx_daily_metrics_user_id ON daily_metrics(user_id);
CREATE INDEX idx_daily_metrics_date ON daily_metrics(date);
CREATE INDEX idx_daily_metrics_user_date ON daily_metrics(user_id, date);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts
CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for daily_metrics
CREATE POLICY "Users can view their own metrics"
  ON daily_metrics FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own metrics"
  ON daily_metrics FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own metrics"
  ON daily_metrics FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own metrics"
  ON daily_metrics FOR DELETE
  USING (auth.uid() = user_id);
```

### 4. Create Test Users

Go to **Authentication** → **Users** → **Add User**:

**User A:**
- Email: `usera@test.com`
- Password: `TestUser123!`
- ✅ Auto Confirm User

**User B:**
- Email: `userb@test.com`
- Password: `TestUser123!`
- ✅ Auto Confirm User

Copy the User IDs after creation.

### 5. Seed Database

Update `superbase/seed.sql` with your actual user IDs, then run it in **SQL Editor**.

### 6. Generate TypeScript Types

```bash
# Login to Supabase CLI
npx supabase login

# Generate types (replace with your project ID)
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database/database.types.ts
```

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with test user credentials.

---

## 🏗️ Architecture Overview

### Authentication Flow

```
middleware.ts → checks auth → redirects if needed
     ↓
  app/dashboard → protected route
     ↓
  API routes → verify user → query with RLS
```

### Data Flow

```
Component → TanStack Query Hook → API Route → Supabase (RLS) → Response
```

### State Management

- **Server State**: TanStack Query (posts, analytics, metrics)
- **UI State**: Zustand (filters, modals, pagination)
- **Auth State**: Supabase Auth (handled by middleware)

---

## 📝 Key Implementation Examples

### API Route with RLS

```typescript
// src/app/api/posts/route.ts
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Query with RLS - automatically filters by user_id
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("posted_at", { ascending: false });

  return NextResponse.json({ data });
}
```

### TanStack Query Hook

```typescript
// src/lib/hooks/use-posts.ts
import { useQuery } from '@tanstack/react-query';

export function usePosts(platform?: string, page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ['posts', platform, page, pageSize],
    queryFn: async () => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ platforms: platform ? [platform] : [], page, pageSize }),
      });
      
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });
}
```

### Zustand Store

```typescript
// src/lib/stores/ui-store.ts
import { create } from 'zustand';

interface UIState {
  platformFilter: string | undefined;
  selectedPostId: string | null;
  isPostModalOpen: boolean;
  setPlatformFilter: (platform: string | undefined) => void;
  openPostModal: (postId: string) => void;
  closePostModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  platformFilter: undefined,
  selectedPostId: null,
  isPostModalOpen: false,
  setPlatformFilter: (platform) => set({ platformFilter: platform }),
  openPostModal: (postId) => set({ selectedPostId: postId, isPostModalOpen: true }),
  closePostModal: () => set({ selectedPostId: null, isPostModalOpen: false }),
}));
```

---

### Day 3 (~3 hours)
- **Final Polish** - Did some final refactoring and formatting.
- **README** - Final documentation.

### What Took Longer Than Expected
- **Learning curve for the required tech stacks** - 5 hours of reading RND and trying to understand the code that was generated by AI

### What Was Faster Than Expected
- **TanStack Query** - Way simpler than Redux Toolkit. Just `useQuery` and you're done.
- **Zustand** - Took 10 minutes to set up. No actions, reducers, or middleware needed.
- **AI-assisted development** - Generating boilerplate UI and SQL saved ~2 hours

### Key Learnings
1. **TanStack Query > Redux for server state** - I'll be using this in future projects
2. **Zustand is perfect for simple client state** - No need for Redux boilerplate
3. **AI is great for boilerplate, but you need to understand the architecture** - I spent time planning the architecture and data flow before generating code
4. **Visx for custom charts** - More control, but steeper learning curve
5. **Next.js App Router is powerful but has a learning curve** - Especially middleware and route handlers

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- A Supabase project with the database schema and seed data set up
- Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Push your code to a Git repository** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new)
   - Click **"Add New Project"**
   - Import your Git repository
   - Vercel will auto-detect Next.js framework settings

3. **Configure Environment Variables**:
   In the Vercel project settings, add the following environment variables:
   
   | Variable Name | Value | Description |
   |---------------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` | Your Supabase anonymous key |

   **How to add environment variables in Vercel:**
   - Go to your project in Vercel Dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add each variable with its value
   - Select environments: **Production**, **Preview**, and **Development**
   - Click **Save**

4. **Deploy**:
   - Click **Deploy**
   - Vercel will build and deploy your application
   - Once complete, you'll receive a production URL

5. **Verify Deployment**:
   - Visit your production URL
   - Test authentication with the seeded users
   - Verify the dashboard and analytics features work correctly

### Redeployment

For subsequent deployments, simply push to your Git repository:
```bash
git push origin main
```

Vercel will automatically trigger a new deployment.

### Troubleshooting

- **Build fails**: Check the build logs in Vercel Dashboard
- **Environment variables not working**: Ensure they're set for the correct environment (Production/Preview/Development)
- **Supabase connection issues**: Verify your Supabase URL and anon key are correct
- **Need to redeploy**: Go to Deployments tab and click "Redeploy"

For more details, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
