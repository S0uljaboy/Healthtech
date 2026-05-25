# Architecture Overview

## Tech Stack
- **Monorepo:** Turborepo
- **Backend:** NestJS (Node.js)
- **Frontend:** Next.js 16 (React, TailwindCSS, Shadcn, Framer Motion)
- **Database:** PostgreSQL (via Prisma ORM)
- **Cache:** Redis
- **Message Queue:** BullMQ

## Core Services
1. **Auth & Visibility Service:** RBAC, multi-tenant boundaries, and strict patient-data visibility filtering for Parents vs Clinical vs Internal staff.
2. **Assessment Engine:** Strategy pattern for scoring complex tests (SNAP-IV, AQ-10).
3. **Clinical EMR:** Unified timeline of observations and referrals.
4. **Intelligence Layer:** Asynchronous worker-based processing for NLP classification and generation of recommendations.

## Infrastructure
- Configured with Helmet and Throttler for backend protection.
- Redis caching for high-volume endpoints (e.g., student lists).
