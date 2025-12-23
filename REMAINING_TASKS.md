# Remaining Tasks - Next.js Migration

This document outlines the remaining pages and components to complete the migration from React SPA to Next.js.

## Pages to Implement

### 1. Service Creation Flow

#### `/service/new/[username]/page.tsx`
- **Purpose**: Form to create a new service request for a specific babysitter
- **Features**:
  - Date picker for service date
  - Shift selection (morning, afternoon, evening, night)
  - Number of children input
  - Address input with optional map picker
  - Special cares textarea
- **Store**: `useServiceStore` - `setServiceForm()`
- **Navigation**: Redirects to `/service/resume` on submit

#### `/service/resume/page.tsx`
- **Purpose**: Review service details before confirmation
- **Features**:
  - Display all service form data
  - Show babysitter info
  - Calculate estimated cost
  - Confirm/Edit buttons
- **Store**: `useServiceStore` - `registerService()`
- **Navigation**: Redirects to home on confirmation

### 2. Service Management Pages

#### `/service/[id]/page.tsx`
- **Purpose**: View service details (for both client and babysitter)
- **Features**:
  - Service status display
  - Client info (if babysitter view)
  - Babysitter info (if client view)
  - Map showing service location
  - Action buttons based on status:
    - Babysitter: "Start Service", "End Service"
    - Client: "Cancel", "Leave Review" (if completed)
- **Store**: `useServiceStore` - `getService()`, `startService()`, `endService()`

#### `/service/[id]/edit/page.tsx`
- **Purpose**: Edit existing service request
- **Features**:
  - Pre-filled form with current service data
  - Same fields as service creation
- **Store**: `useServiceStore` - `getService()`, `updateService()`

#### `/service/[id]/way/page.tsx`
- **Purpose**: Show directions to service location (for babysitters)
- **Features**:
  - Leaflet map with route
  - Client address display
  - Navigation link to external maps app
- **Store**: `useServiceStore` - `editForm`

### 3. Review Page

#### `/review/[id]/page.tsx`
- **Purpose**: Leave a review for completed service
- **Features**:
  - Star rating component (1-5 stars)
  - Comment textarea
  - Submit button
- **Store**: `useReviewStore` - `registerReview()`
- **Navigation**: Redirects to home on submit

### 4. Profile Edit Page

#### `/profile/edit/page.tsx`
- **Purpose**: Edit user profile information
- **Features**:
  - Pre-filled form with current user data
  - Image upload for profile picture
  - All registration fields editable
- **Store**: `useUserStore` - `updateUserData()`

### 5. Auth Pages (Optional)

#### `/email-send/page.tsx`
- **Purpose**: Confirmation page after registration
- **Features**:
  - Success message
  - Instructions to check email
  - Link to login

#### `/landing/page.tsx`
- **Purpose**: Marketing landing page
- **Features**:
  - Hero section with background image
  - Features showcase
  - CTA buttons for login/register

---

## Components to Implement

### Map Components (`/components/maps/`)

#### `babysitters-map.tsx`
```typescript
// Features:
// - Leaflet map showing babysitter locations
// - Markers with popups showing babysitter info
// - Click marker to navigate to babysitter detail
// - Center on user location

interface BabysittersMapProps {
  babysitters: Babysitter[];
  center?: { lat: number; lng: number };
}
```

#### `map-with-marker.tsx`
```typescript
// Features:
// - Single marker on map
// - Used for service location display

interface MapWithMarkerProps {
  lat: number;
  lng: number;
  address: string;
}
```

#### `map-with-direction.tsx`
```typescript
// Features:
// - Show route from current location to destination
// - Using Leaflet Routing Machine or similar

interface MapWithDirectionProps {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
}
```

### Form Components (`/components/forms/`)

#### `image-input.tsx`
```typescript
// Features:
// - File input for images
// - Image preview
// - Drag and drop support (optional)

interface ImageInputProps {
  value?: File | string;
  onChange: (file: File) => void;
  label?: string;
}
```

#### `availability-input.tsx`
```typescript
// Features:
// - Multiple day/time range inputs
// - Add/remove availability slots
// - Used in babysitter profile

interface AvailabilityInputProps {
  value: Availability[];
  onChange: (availabilities: Availability[]) => void;
}
```

### Card Components (`/components/cards/`)

#### `babysitter-mini-card.tsx`
```typescript
// Features:
// - Compact babysitter info display
// - Used in lists and map popups

interface BabysitterMiniCardProps {
  babysitter: Babysitter;
  size?: 'small' | 'medium';
}
```

#### `service-card.tsx`
```typescript
// Features:
// - Service summary card
// - Status badge
// - Date and shift info

interface ServiceCardProps {
  service: Service;
}
```

### Popup Components (`/components/popups/`)

#### `popup.tsx`
```typescript
// Features:
// - Modal overlay
// - Close button
// - Customizable content

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

#### `popup-delete-user.tsx`
```typescript
// Features:
// - Confirmation dialog for account deletion
// - Warning message
// - Confirm/Cancel buttons
```

---

## Hooks to Implement (`/hooks/`)

#### `use-geolocation.ts`
```typescript
// Get user's current location
export function useGeolocation() {
  // Returns: { lat, lng, loading, error }
}
```

#### `use-auth.ts`
```typescript
// Convenience hook for auth state
export function useAuth() {
  // Returns: { isAuthenticated, isBabysitter, user }
}
```

---

## Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_API_URL=https://hisitter.xyz
```

---

## Testing Checklist

- [ ] Login flow works
- [ ] Registration flow works
- [ ] Babysitter list loads
- [ ] Babysitter detail page works
- [ ] Service creation flow works
- [ ] Service management works
- [ ] Review submission works
- [ ] Profile edit works
- [ ] Logout clears auth state
- [ ] Protected routes redirect to login
- [ ] Maps display correctly

---

## Notes

### Leaflet Setup
Leaflet requires the CSS to be imported and may need dynamic imports for SSR compatibility:

```typescript
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/maps/babysitters-map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});
```

### File Uploads
For image uploads, the current implementation uses FormData. Consider:
- Adding client-side image compression
- Using Next.js Image optimization
- Implementing upload progress indicator

### Date Handling
Using `date-fns` for date formatting. Common patterns:
```typescript
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

format(parseISO(dateString), 'PPP', { locale: es });
```
