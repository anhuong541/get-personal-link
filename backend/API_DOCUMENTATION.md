# Habit Tracker API Documentation

This backend API provides endpoints for managing habits and tracking daily progress using Firebase Firestore as the database.

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Firebase Configuration
# Option 1: Service account key as JSON string (recommended for production)
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project",...}'

# Option 2: Path to service account key file (for local development)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccountKey.json

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Start the Server

```bash
# Development
yarn start:dev

# Production
yarn build
yarn start:prod
```

The API will be available at `http://localhost:3001/api`

## API Endpoints

### Habits Management

#### Get All Habits
- **GET** `/api/habits/:userId`
- **Description**: Retrieve all habits for a user
- **Response**: Array of habit objects

#### Get Single Habit
- **GET** `/api/habits/:userId/:habitId`
- **Description**: Retrieve a specific habit
- **Response**: Habit object

#### Create Habit
- **POST** `/api/habits/:userId`
- **Description**: Create a new habit
- **Body**:
  ```json
  {
    "label": "Exercise",
    "description": "Daily morning exercise",
    "goal": 1,
    "color": "#3b82f6",
    "icon": "🏃"
  }
  ```
- **Response**: Created habit object

#### Update Habit
- **PATCH** `/api/habits/:userId/:habitId`
- **Description**: Update an existing habit
- **Body**: Partial habit object
- **Response**: Updated habit object

#### Delete Habit
- **DELETE** `/api/habits/:userId/:habitId`
- **Description**: Delete a habit
- **Response**: 204 No Content

#### Update Habits Order
- **PATCH** `/api/habits/:userId/order`
- **Description**: Update the order of habits (for drag-and-drop)
- **Body**:
  ```json
  {
    "habitIds": ["habit-1", "habit-2", "habit-3"]
  }
  ```
- **Response**: 200 OK

### Habit Tracking

#### Get Habit Tracking Data
- **GET** `/api/habit-tracking/:userId/:timeKey`
- **Description**: Get habit tracking data for a specific time period
- **Parameters**: 
  - `timeKey`: Format "YYYY-MM" (e.g., "2024-01")
- **Response**: Object with day numbers as keys and habit completion data

#### Get Monthly Tracking Data
- **GET** `/api/habit-tracking/:userId/month/:year/:month`
- **Description**: Get habit tracking data for a specific month
- **Parameters**: 
  - `year`: 4-digit year (e.g., 2024)
  - `month`: Month number (1-12)
- **Response**: Monthly tracking data object

#### Mark Habit Completion
- **POST** `/api/habit-tracking/:userId/mark`
- **Description**: Mark a habit as completed/not completed for a specific day
- **Body**:
  ```json
  {
    "day": 15,
    "habitKey": "exercise",
    "value": true,
    "timeKey": "2024-01"
  }
  ```
- **Response**: 200 OK

#### Mark Habit for Today
- **POST** `/api/habit-tracking/:userId/mark-today`
- **Description**: Mark a habit for the current day
- **Body**:
  ```json
  {
    "habitKey": "exercise",
    "value": true
  }
  ```
- **Response**: 200 OK

## Data Models

### Habit Object
```typescript
interface Habit {
  id: string;
  label: string;
  description?: string;
  goal: number;
  color?: string;
  icon?: string;
  order?: number;
  created_at: string;
  updated_at: string;
}
```

### Habit Tracking Object
```typescript
interface HabitTracking {
  [day: number]: {
    [habitKey: string]: boolean;
  };
}
```

## Firebase Structure

The API uses the following Firestore structure:

```
users/
  {userId}/
    habits/
      {habitId}/
        - id: string
        - label: string
        - description?: string
        - goal: number
        - color?: string
        - icon?: string
        - order: number
        - created_at: string
        - updated_at: string
    
    habits-tracker/
      {timeKey}/ (e.g., "2024-01")
        - 1: { habitKey: boolean, ... }
        - 2: { habitKey: boolean, ... }
        - ...
        - 31: { habitKey: boolean, ... }
```

## Error Handling

The API returns standard HTTP status codes:

- **200**: Success
- **201**: Created
- **204**: No Content
- **400**: Bad Request
- **404**: Not Found
- **500**: Internal Server Error

Error responses include a message describing the error:

```json
{
  "statusCode": 404,
  "message": "Habit with ID exercise not found",
  "error": "Not Found"
}
```

## CORS Configuration

The API is configured to accept requests from `http://localhost:3000` by default. Update the `FRONTEND_URL` environment variable for different frontend URLs. 