# ByteSpace — Project Documentation

**Product:** ByteSpace Online Learning Platform (OLP)
**Document owner:** Project Manager
**Version:** 1.0 | **Status:** Approved for planning
**Audience:** Developers, QA, stakeholders, future maintainers

> Assumptions are marked **[A]**. Confirm or correct them in the first kickoff; every estimate below depends on them.

---

## 1. Executive Summary

ByteSpace is a web platform where **instructors publish courses** and **students discover, enroll in and study them**. Today it is a working prototype: course listing, course details, enrollment, an instructor dashboard (add / edit / delete) and one hand-built course module (JWT Mastery).

The goal of this project is to turn the prototype into a **production-grade, mid-level product**: real data instead of generated data, secure APIs, payments, tested and monitored releases, and a repeatable delivery process.

**Target outcome (12 weeks):** a publicly launchable v1.0 that can safely onboard real instructors and paying students.

---

## 2. Current State Assessment (Baseline)

### 2.1 What exists

| Area | Status |
|---|---|
| Public pages | Home, All Courses, Course Details |
| Auth | Login via AuthContext, `PrivateRouter` guard |
| Student | Enroll, My Enrolled Courses (progress shown) |
| Instructor | My Courses, Add Course, Update Course, Delete |
| Content | JWT Mastery course (static, 8 chapters + quizzes) |
| UI | Unified ByteSpace theme (blue grid, lime accent, Poppins) |
| Backend | Express API at `backend-olp.vercel.app` |

Known API surface: `GET /course/popular`, `GET /course/:id`, `GET /topInstructors`, `GET /enroll/check`, `POST /enroll`, `GET /myenroll/:email`, `GET /myCourses/:email`, `GET /myCourse/:id`, `POST /dashboard/addCourse`, `PUT /updatedCourse/:id`, `DELETE /delete/:id`.

### 2.2 Gaps (why it is still "small project")

| # | Gap | Risk | Priority |
|---|---|---|---|
| G1 | Rating, reviews, students and course badge are **randomly generated** when a course is created | Fake data destroys trust | Critical |
| G2 | Price, enrollment and ownership are trusted from the **client** (e.g. full course object sent on enroll; email in URL) | Fraud, data tampering | Critical |
| G3 | No evidence of server-side authorization (JWT/role/ownership check) on edit/delete endpoints | Anyone can edit or delete any course | Critical |
| G4 | No payments; "Enroll" is free for every course | No revenue | High |
| G5 | Progress is a single field; no lesson model, no video/content hosting | Students cannot actually learn | High |
| G6 | Reviews, ratings, certificates, search, filters, pagination are demo or missing | Core product value missing | High |
| G7 | API URL hardcoded in every page; no env config | Hard to run staging/prod | Medium |
| G8 | No automated tests, CI/CD, monitoring or error tracking | Regressions go unnoticed | High |
| G9 | No roles model (student / instructor / admin) | No moderation or governance | High |
| G10 | No documentation, ADRs, runbooks | Bus factor = 1 | Medium |

---

## 3. Vision, Goals and Success Metrics

**Vision:** the simplest place for an expert to teach and for a learner to finish a course.

### 3.1 SMART objectives

| ID | Objective | Measure | Target |
|---|---|---|---|
| O1 | Eliminate fake data | Share of ratings/reviews from real users | 100% |
| O2 | Secure the platform | Open critical/high security findings | 0 at launch |
| O3 | Enable revenue | Successful paid checkout flow in production | Live by week 10 |
| O4 | Deliver reliably | Deployment via CI/CD with automated tests | 100% of releases |
| O5 | Performance | Largest Contentful Paint on course list (4G) | < 2.5 s |
| O6 | Quality | Automated test coverage on critical paths | >= 70% backend, key flows e2e |
| O7 | Availability | Monthly uptime | >= 99.5% |

### 3.2 Product KPIs (post-launch)

Registration conversion, enrollment conversion (view → enroll), course completion rate, average rating, instructor retention (30-day), support tickets per 100 users.

---

## 4. Scope

### 4.1 In scope (v1.0)

Authentication and roles, course CRUD with moderation, lessons and content delivery, enrollment with payments, progress tracking, ratings and reviews, search/filter/pagination, instructor analytics, admin panel (basic), email notifications, CI/CD, monitoring, documentation.

### 4.2 Out of scope (v1.0)

Native mobile apps, live classes, subscriptions/bundles, multi-language UI, marketplace payouts automation, AI recommendations. Parked in the roadmap (section 14).

---

## 5. Stakeholders and Roles

| Role | Responsibility | Who **[A]** |
|---|---|---|
| Product Owner | Priorities, acceptance | Ashik |
| Project Manager | Plan, risks, reporting | Ashik (wearing PM hat) |
| Tech Lead / Full-stack Dev | Architecture, delivery | Ashik |
| QA | Test plans, regression | Ashik + peer reviewer |
| Instructor (user) | Publishes courses | External |
| Student (user) | Learns | External |
| Admin / Moderator | Approves courses, handles reports | Ashik initially |

### RACI (key activities)

| Activity | Product Owner | Dev | QA | Admin |
|---|---|---|---|---|
| Prioritize backlog | A/R | C | I | I |
| Implement feature | I | A/R | C | I |
| Test and sign off | A | C | R | I |
| Release to production | A | R | C | I |
| Moderate content | I | I | I | A/R |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

---

## 6. User Personas

1. **Student (Rafi, 22):** wants affordable, structured courses; needs trust signals (real reviews), progress tracking, certificates.
2. **Instructor (Nadia, 34):** wants fast publishing, clear earnings and student numbers, control over pricing.
3. **Admin:** wants to approve/reject courses, handle reports, see platform health.

---

## 7. Requirements

### 7.1 Functional (MoSCoW)

**Must**
- FR1 Register / login / logout, password reset, session refresh (JWT access + refresh token).
- FR2 Roles: `student`, `instructor`, `admin`; role-based access on every endpoint.
- FR3 Instructor creates course with sections and lessons (video URL, text, resources). Draft → Submitted → Published states.
- FR4 Only the owner can edit/delete a course; delete = soft delete (archive).
- FR5 Student enrolls; enrollment is server-verified, one per student per course.
- FR6 Payment checkout (one-time) with webhook-confirmed enrollment.
- FR7 Progress tracking per lesson; course progress derived on the server.
- FR8 Ratings and reviews only from enrolled students, one per student per course.
- FR9 Course listing with search, category filter, sort and pagination.
- FR10 Remove all randomly generated metrics; compute from real data.

**Should**
- FR11 Certificate of completion (PDF) at 100%.
- FR12 Instructor analytics (students, revenue, ratings over time).
- FR13 Email notifications (welcome, enrollment receipt, course approved).
- FR14 Admin moderation queue and user management.

**Could**
- FR15 Wishlist, coupons, instructor public profile page, quiz engine as a reusable feature (generalize the JWT module's quiz).

**Won't (v1.0)**
- Live classes, mobile apps, subscriptions.

### 7.2 Non-functional

| Category | Requirement |
|---|---|
| Performance | p95 API latency < 400 ms; LCP < 2.5 s; images lazy-loaded and sized |
| Security | OWASP Top 10 addressed; passwords hashed (bcrypt cost 12); HTTPS only; rate limiting; input validation on every endpoint |
| Reliability | 99.5% uptime; daily DB backups, tested restore |
| Scalability | Stateless API; DB indexes on query fields; pagination everywhere |
| Accessibility | WCAG 2.1 AA for core flows (keyboard, contrast, labels) |
| Maintainability | Lint + format enforced; modules documented; ADRs for major decisions |
| Observability | Structured logs, error tracking, uptime checks, basic dashboards |
| Compliance | Privacy policy, terms, cookie notice, data deletion on request |

---

## 8. Target Architecture

```
[React SPA (Vite)]  --HTTPS-->  [Express API]  -->  [PostgreSQL / MongoDB]
        |                           |  |  |
        |                           |  |  +--> [Object storage: images, files]
        |                           |  +-----> [Payment provider + webhooks]
        |                           +--------> [Email service]
        +--> [CDN for static + media]        [Error tracking + logs + uptime]
```

### 8.1 Stack decisions

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React, React Router, Tailwind, Axios (single instance), React Query | Existing stack; React Query for caching/loading states |
| Backend | Node.js + Express, layered (routes → controllers → services → repositories) | Existing; testable structure |
| Validation | Zod (or Joi) on every request body | Never trust the client |
| Auth | Firebase/own JWT; server verifies token on each protected route | Existing AuthContext; server-side enforcement is the missing part |
| Database | Keep current DB **[A: MongoDB]**; add indexes and schemas (Mongoose) | Avoid risky migration |
| Media | Cloud storage + signed URLs | No hotlinked images/videos |
| Payments | Stripe (or SSLCommerz/bKash gateway for Bangladesh **[A]**) | Webhook-based confirmation |
| Hosting | Vercel (frontend + API) **[A]** with separate staging project | Existing |
| CI/CD | GitHub Actions | Free, standard |

### 8.2 Environments

| Env | Purpose | Data |
|---|---|---|
| Local | Development | Seed data |
| Staging | QA, demos, UAT | Anonymized test data |
| Production | Real users | Real data, backups on |

All config via environment variables (`VITE_API_URL`, DB URI, JWT secrets, payment keys). **No secrets in git.**

---

## 9. Data Model (target)

| Entity | Key fields |
|---|---|
| **User** | id, name, email (unique), role, avatar, createdAt, status |
| **Course** | id, ownerId, title, slug, description, category, level, price, originalPrice, thumbnail, status (draft/submitted/published/archived), createdAt, updatedAt |
| **Section** | id, courseId, title, order |
| **Lesson** | id, sectionId, title, type (video/text/quiz), contentUrl, durationSec, order |
| **Enrollment** | id, userId, courseId, paymentId, enrolledAt, status — unique(userId, courseId) |
| **Progress** | id, enrollmentId, lessonId, completedAt |
| **Review** | id, userId, courseId, rating (1–5), comment, createdAt — unique(userId, courseId) |
| **Payment** | id, userId, courseId, amount, currency, provider, providerRef, status |
| **AuditLog** | id, actorId, action, entity, entityId, at |

**Derived on the server, never stored from client:** `rating`, `reviewCount`, `studentCount`, `lessonCount`, `duration`, `progress%`.

---

## 10. API Specification (target, v1)

Base: `/api/v1` | Auth: `Authorization: Bearer <token>` | Errors: `{ code, message, details }`

| Method | Endpoint | Role | Replaces / purpose |
|---|---|---|---|
| GET | `/courses?search=&category=&sort=&page=&limit=` | public | `/course/popular`, all courses |
| GET | `/courses/:id` | public | `/course/:id` |
| GET | `/instructors/top` | public | `/topInstructors` |
| POST | `/courses` | instructor | `/dashboard/addCourse` (server sets owner, defaults) |
| PATCH | `/courses/:id` | owner | `/updatedCourse/:id` |
| DELETE | `/courses/:id` | owner/admin | `/delete/:id` (soft delete) |
| GET | `/me/courses` | instructor | `/myCourses/:email` (identity from token, not URL) |
| GET | `/me/enrollments` | student | `/myenroll/:email` |
| POST | `/checkout` | student | creates payment session |
| POST | `/webhooks/payment` | provider | confirms payment, creates enrollment |
| GET | `/courses/:id/enrollment` | student | `/enroll/check` |
| POST | `/lessons/:id/complete` | student | progress |
| POST | `/courses/:id/reviews` | enrolled student | reviews |
| GET | `/courses/:id/reviews?page=` | public | reviews list |
| POST | `/admin/courses/:id/approve` | admin | moderation |

**Rules:** identity always comes from the verified token. Prices are read from the DB at checkout, never from the request. Every list endpoint is paginated.

---

## 11. Security Plan

| Threat | Control |
|---|---|
| Broken access control | Auth middleware + role + ownership check on every write endpoint; tests for each |
| Fake/tampered prices | Price resolved server-side; payment confirmed via signed webhook |
| Injection / bad input | Schema validation, parameterized queries, strip unknown fields |
| XSS | Sanitize rich text; keep `dangerouslySetInnerHTML` only for trusted static content; CSP via helmet |
| Token theft | Short-lived access token, refresh in HttpOnly cookie, HTTPS only |
| Brute force / abuse | Rate limiting on login, enroll, review endpoints |
| Data exposure | Return only needed fields; no emails of other users in public APIs |
| Secrets leakage | Env vars, secret scanning in CI, rotate on exposure |
| Dependency risk | `npm audit` + Dependabot weekly |

**Gate:** no production launch until a security checklist review is signed off (O2).

---

## 12. Quality Strategy

### 12.1 Test pyramid

| Level | Tooling **[A]** | Scope |
|---|---|---|
| Unit | Vitest / Jest | Services, validators, utils |
| API/integration | Supertest | Every endpoint incl. auth failures |
| Component | React Testing Library | Forms, cards, guards |
| E2E | Playwright | Signup → browse → pay → learn → review; instructor publish flow |
| Manual UAT | Test scripts | Each release on staging |

### 12.2 Definition of Ready (story can start)
Clear user value, acceptance criteria, design/API notes, estimate, no open blocker.

### 12.3 Definition of Done (story can close)
Code reviewed (1 approval), lint + tests green in CI, new logic tested, no console errors, accessibility checked, docs/API spec updated, deployed to staging and verified.

### 12.4 Bug severity

| Sev | Meaning | Response |
|---|---|---|
| S1 | Outage, data loss, security hole | Fix immediately, hotfix release |
| S2 | Core flow broken, no workaround | Within 2 working days |
| S3 | Feature degraded, workaround exists | Next sprint |
| S4 | Cosmetic | Backlog |

---

## 13. DevOps and Engineering Standards

- **Repo structure:** `frontend/`, `backend/`, `docs/`, `.github/workflows/`.
- **Branching:** trunk-based with short-lived branches: `feat/…`, `fix/…`, `chore/…`. `main` is always deployable.
- **Commits:** Conventional Commits (`feat: add review endpoint`).
- **Pull requests:** template with description, screenshots, test evidence; 1 reviewer minimum.
- **CI pipeline:** install → lint → unit/integration tests → build → (on `main`) deploy to staging → manual approval → production.
- **Releases:** semantic versioning, tagged, changelog generated per release.
- **Rollback:** previous deployment promotable in one step; DB migrations backward compatible.
- **Observability:** Sentry (frontend + backend), structured JSON logs, uptime monitor on `/health`, alert on error spike.
- **Backups:** daily DB backup, monthly restore drill.
- **Code quality:** ESLint + Prettier, pre-commit hooks, shared API client (one Axios instance with base URL from env).

---

## 14. Roadmap and Delivery Plan

Method: **Scrum-lite, 2-week sprints**, 6 sprints = 12 weeks **[A: 1–2 developers, ~25 productive hours/week each]**.

| Phase | Sprint | Weeks | Theme | Key deliverables | Exit criteria |
|---|---|---|---|---|---|
| 0 | S0 | 1 (prep) | Foundation | Repo structure, env config, CI skeleton, backlog, this document | CI runs lint + build |
| 1 | S1 | 1–2 | Secure the core | Server-side auth + roles + ownership checks, request validation, remove random metrics (G1–G3), single API client | Security tests pass; no fake data written |
| 2 | S2 | 3–4 | Real data model | Sections/lessons, derived stats, soft delete, pagination/search/filter, data migration of existing courses | Old courses migrated; lists paginated |
| 3 | S3 | 5–6 | Learning experience | Lesson player, progress tracking, enrolled dashboard with real progress | Student can complete a course end-to-end |
| 4 | S4 | 7–8 | Trust and revenue (part 1) | Reviews and ratings, payment checkout in test mode, webhooks | Paid test enrollment works on staging |
| 5 | S5 | 9–10 | Revenue (part 2) and admin | Live payments, receipts/emails, admin moderation, instructor analytics | Production payment verified with small real transaction |
| 6 | S6 | 11–12 | Harden and launch | E2E suite, performance pass, accessibility pass, security review, legal pages, monitoring, runbook, UAT | Go-live checklist signed |

**Post-v1 (parked):** certificates, coupons, wishlist, instructor public pages, quiz engine for any course, mobile app, subscriptions.

### 14.1 Milestones

| Milestone | Date (from start) |
|---|---|
| M1 Secure core complete | End of week 2 |
| M2 Learning flow complete | End of week 6 |
| M3 Payments on staging | End of week 8 |
| M4 Release candidate | End of week 11 |
| M5 **Production launch v1.0** | End of week 12 |

---

## 15. Backlog (epics → first stories)

| Epic | Stories (examples) | Est. (pts) |
|---|---|---|
| E1 Auth and roles | Verify token middleware; role guard; ownership guard; refresh flow | 13 |
| E2 Course management | Course schema + validation; draft/submit/publish; soft delete; slugs | 13 |
| E3 Content | Sections and lessons CRUD; lesson player; file/video upload | 21 |
| E4 Discovery | Search, filters, sort, pagination, empty/error states | 8 |
| E5 Enrollment and payments | Checkout session; webhook; idempotency; receipts | 21 |
| E6 Progress | Lesson completion; derived progress; resume where left | 8 |
| E7 Reviews | Create/edit review; aggregate rating; moderation flag | 8 |
| E8 Admin and analytics | Moderation queue; instructor stats; platform stats | 13 |
| E9 Quality and DevOps | CI/CD; test suites; Sentry; backups; runbook | 21 |
| E10 UX/accessibility | Skeletons, toasts, form validation, a11y audit, responsive audit | 8 |

Prioritization: **value × risk reduction ÷ effort**; security and data integrity items always outrank new features.

---

## 16. Risk Register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Unauthorized edits/deletes (G3) | High | Critical | Do E1 first; tests per endpoint | Dev |
| R2 | Payment bugs or double enrollment | Medium | High | Webhook-only confirmation, idempotency keys, unique index | Dev |
| R3 | Scope creep | High | Medium | Change control (section 17), MoSCoW, parking lot | PM |
| R4 | Single-developer bottleneck / burnout | High | High | Weekly capacity check, buffer 20%, document everything | PM |
| R5 | Data migration corrupts existing courses | Medium | High | Backup first, dry run on staging, rollback script | Dev |
| R6 | Serverless limits (cold starts, timeouts) on API | Medium | Medium | Measure early; move API to container host if p95 misses target | Tech Lead |
| R7 | Video hosting cost grows | Medium | Medium | Use external video host / signed URLs; set storage budget alerts | PM |
| R8 | Payment provider onboarding delay | Medium | High | Start account/KYC in week 1 | PM |
| R9 | Legal/privacy gaps at launch | Low | High | Privacy policy, terms, data deletion flow before launch | PM |
| R10 | Third-party outage (DB, auth, hosting) | Low | High | Status page, graceful error UI, backups | Dev |

Review the register **every sprint**; add owner and trigger for each new risk.

---

## 17. Governance and Communication

| Ritual | Cadence | Output |
|---|---|---|
| Sprint planning | Start of sprint (1 h) | Sprint goal, committed stories |
| Daily check-in | Daily (10 min, or async note) | Done / next / blocked |
| Sprint review + demo | End of sprint (45 min) | Demo on staging, feedback |
| Retrospective | End of sprint (30 min) | 1–3 improvement actions |
| Backlog refinement | Weekly (30 min) | Estimated, ready stories |
| Risk review | Every sprint | Updated register |
| Status report | Weekly | RAG status, milestones, risks, asks |

**Change control:** any request outside the sprint scope is logged, sized, and either swapped for equal-sized work or scheduled. Scope changes that affect a milestone date need Product Owner sign-off.

### Weekly status report template

```
Week N | Overall: GREEN / AMBER / RED
Done: …
Next: …
Milestone status: M1 ✔  M2 on track  M3 at risk
Top risks: R1 (mitigating), R4 …
Decisions needed: …
Metrics: velocity X | open bugs S1/S2: 0/2 | CI pass rate: 96%
```

---

## 18. Release and Go-Live Plan

### 18.1 Go-live checklist

- [ ] All Must requirements done and accepted
- [ ] 0 open S1/S2 bugs
- [ ] Security checklist signed off (section 11)
- [ ] E2E suite green on staging
- [ ] Performance targets met (O5), accessibility check on core flows
- [ ] Payment verified with a real low-value transaction and refund
- [ ] Backups enabled, restore tested
- [ ] Monitoring and alerts live; on-call contact defined
- [ ] Privacy policy, terms, cookie notice published
- [ ] Rollback procedure rehearsed
- [ ] Production seed: admin account created, test data removed

### 18.2 Launch approach
Soft launch to a small invited group (instructors first) for 1–2 weeks → fix feedback → public launch. Hypercare: daily error review for the first 14 days.

---

## 19. Operations and Support

- **Support channel:** support email + in-app contact form; target first response < 24 h.
- **Runbook (maintain in `docs/runbook.md`):** deploy, rollback, rotate secrets, restore DB, handle payment dispute, handle account deletion request.
- **Incident process:** detect → classify (S1–S4) → fix/mitigate → communicate → post-mortem (blameless) within 3 days for S1/S2.

---

## 20. Documentation Set (to maintain)

| Document | Location |
|---|---|
| This project document | `docs/PROJECT_DOCUMENTATION.md` |
| API reference (OpenAPI/Swagger) | `docs/openapi.yaml` |
| Architecture decisions (ADRs) | `docs/adr/` |
| Setup guide (local/staging/prod) | `README.md` |
| Runbook | `docs/runbook.md` |
| Test plan and UAT scripts | `docs/testing.md` |
| Changelog | `CHANGELOG.md` |

---

## 21. Budget Notes **[A]**

Monthly running cost at launch scale (estimates, verify before commitment): hosting, database, object/video storage, email, error tracking, domain, payment fees (percentage per transaction). Set billing alerts on every paid service from day one.

---

## 22. Immediate Action List (next 7 days)

1. Confirm assumptions marked **[A]** (team size, DB, payment provider).
2. Create the GitHub project board; load epics and Sprint 1 stories.
3. Set up env config (`VITE_API_URL`) and replace the hardcoded API URL with one shared Axios instance.
4. Add auth middleware to the backend and block edit/delete for non-owners (stops the biggest risk, R1).
5. Stop generating random rating/reviews/students/courseType in Add Course; default to 0 and compute later.
6. Start payment provider account/KYC.
7. Add CI: lint + build on every pull request.
8. Take a database backup before any schema change.

---

## 23. Approval

| Name | Role | Decision | Date |
|---|---|---|---|
| | Product Owner | Approve / Changes | |
| | Tech Lead | Approve / Changes | |