# Next.js Migration Plan: Babysitter Finder

## Summary
Migrate React 16 SPA to Next.js 16.1.1 with App Router, Zustand, and Tailwind CSS.

## Target Stack
- **Framework**: Next.js 16.1.1 with App Router
- **State**: Zustand (replacing Redux + Thunk)
- **Styling**: Tailwind CSS (replacing SCSS)
- **HTTP**: Keep axios
- **Maps**: @react-google-maps/api (replacing deprecated react-google-maps)

---

## New Project Structure

```
src/
├── app/
│   ├── (auth)/                    # Public auth pages
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── email-send/page.tsx
│   │   └── landing/page.tsx
│   ├── (protected)/               # Auth-required pages
│   │   ├── layout.tsx             # Auth wrapper
│   │   ├── page.tsx               # Home (Babysitters/Schedule)
│   │   ├── babysitter/[username]/page.tsx
│   │   ├── service/
│   │   │   ├── new/[username]/page.tsx
│   │   │   ├── resume/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── edit/page.tsx
│   │   │       └── way/page.tsx
│   │   ├── schedule/page.tsx
│   │   ├── profile/
│   │   │   ├── page.tsx
│   │   │   └── edit/page.tsx
│   │   └── review/[id]/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                        # Atoms: button, logo, stars
│   ├── forms/                     # Input, select, image-input
│   ├── cards/                     # babysitter-card, service-card
│   ├── maps/                      # Google Maps components
│   ├── organisms/                 # header, babysitter-list
│   └── providers/                 # auth-provider, store-provider
├── stores/
│   ├── user-store.ts
│   ├── babysitter-store.ts
│   ├── service-store.ts
│   └── review-store.ts
├── lib/
│   ├── api/                       # axios client + API functions
│   └── utils/                     # cookies, cn helper
├── types/                         # TypeScript interfaces
├── hooks/                         # Custom hooks
└── middleware.ts                  # Auth middleware
```

---

## Implementation Phases

### Phase 1: Project Setup
1. Initialize Next.js project with TypeScript + Tailwind
2. Configure Tailwind with design tokens from `src/styles/variables.scss`:
   - Colors: `illustration-primary` (#F582AE), `illustration-secondary` (#8BD3DD), etc.
   - Fonts: Overlock, Roboto
   - Spacing: nano (8px), micro (16px), small (24px), medium (40px)
3. Set up environment variables for API URL and Google Maps key
4. Create TypeScript interfaces for User, Babysitter, Service, Review

### Phase 2: Core Infrastructure
1. Create Zustand stores (4 separate stores):
   - `user-store.ts`: user, loading, error, popUp + auth actions
   - `babysitter-store.ts`: babysitters[], selectedBabysitter + fetch actions
   - `service-store.ts`: serviceForm, services[] + CRUD actions
   - `review-store.ts`: review submission action
2. Create axios client with auth interceptor (`lib/api/axios-client.ts`)
3. Create API service functions (`lib/api/users.ts`, `services.ts`, etc.)
4. Implement Next.js middleware for route protection
5. Create cookie utilities for server/client

### Phase 3: UI Components (Tailwind)
Migrate components in order:
1. **Atoms**: Button, Logo, StarsRate, StarsRating
2. **Forms**: Input, Select, TextArea, ImageInput, AvailabilityInput
3. **Cards**: BabysitterMiniCard, Caption, Service
4. **Organisms**: Header, Menu, BabysitterList, ServiceList
5. **Maps**: BabysittersMap, MapWithDirection, MapWithMarker (use @react-google-maps/api)
6. **Popups**: Popup, PopupArrival, PopupDeleteUser

### Phase 4: Pages (in order)
1. **Auth pages** (Client Components):
   - `/login` - Login form with Zustand
   - `/register` - PersonalInfoForm with file upload
   - `/email-send` - Static confirmation
   - `/landing` - DialogTransparent

2. **Protected layout** - Auth check wrapper

3. **Main pages** (Hybrid - SSR data + Client interactivity):
   - `/` - Babysitters list (client) or Schedule (babysitter)
   - `/babysitter/[username]` - BabysitterDetail
   - `/profile` and `/profile/edit`
   - `/schedule`

4. **Service pages** (Client Components):
   - `/service/new/[username]` - ServiceForm
   - `/service/resume` - ServiceResume
   - `/service/[id]` - ServiceDetails
   - `/service/[id]/edit` - ServiceForm (edit mode)
   - `/service/[id]/way` - MapWithDirection

5. **Review page**:
   - `/review/[id]` - Review form

### Phase 5: Final Polish
1. Add loading.tsx for loading states
2. Add error.tsx for error boundaries
3. Add metadata for SEO
4. Test all flows end-to-end
5. Remove old React SPA files

---

## Key Migration Patterns

### Redux → Zustand
```typescript
// Old: Redux action
export const loginUser = (form) => async (dispatch) => {
  dispatch({ type: LOADING });
  const { data } = await axios.post('/users/login/', form);
  dispatch({ type: LOGIN_USER, payload: data });
};

// New: Zustand action
login: async (credentials) => {
  set({ loading: true });
  const { data } = await usersApi.login(credentials);
  set({ user: data.user, loading: false });
  // Set cookies...
}
```

### PrivateRoute → Middleware
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token && !isPublicPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

### SCSS → Tailwind
```scss
// Old: .button-blue
.button {
  background-color: $color-Ilustation-Secondary;
  padding: $space-micro $space-medium;
  border-radius: $space-medium;
}
```
```tsx
// New: Tailwind
<button className="bg-illustration-secondary py-micro px-medium rounded-button">
```

---

## Critical Files Reference

| Current File | Purpose | Migration Target |
|--------------|---------|------------------|
| `src/routes/App.js` | Route definitions | `app/` folder structure |
| `src/routes/PrivateRoute.js` | Auth guard | `middleware.ts` |
| `src/reducers/*.js` | State shape | `stores/*.ts` |
| `src/actions/*.js` | API calls | `lib/api/*.ts` + store actions |
| `src/styles/variables.scss` | Design tokens | `tailwind.config.ts` |
| `src/utils/getCookie.js` | Cookie util | `lib/utils/cookies.ts` |

---

## Dependencies to Add
```json
{
  "next": "16.1.1",
  "zustand": "^4",
  "@react-google-maps/api": "^2",
  "axios": "^1",
  "date-fns": "^3",
  "clsx": "^2",
  "tailwind-merge": "^2"
}
```

## Dependencies to Remove
- react-router-dom
- redux, react-redux, redux-thunk
- react-google-maps, recompose
- sass, webpack, babel (handled by Next.js)
