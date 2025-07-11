# Migration Guide: Firebase to Backend API

Your frontend query actions have been updated to use the new NestJS backend API instead of direct Firebase calls.

## Changes Made

### 1. **Query Actions Updated**

- `useQueryUserHabits` → Now calls `GET /api/habits/:userId`
- `useQueryCheckingUserHabit` → Now calls `GET /api/habit-tracking/:userId/:timeKey`
- `useMutationMarkCheckingHabit` → Now calls `POST /api/habit-tracking/:userId/mark`
- `useMutationAddNewHabit` → Now calls `POST /api/habits/:userId`
- `useMutationEditHabit` → Now calls `PATCH /api/habits/:userId/:habitId`
- `useMutationDeleteHabit` → Now calls `DELETE /api/habits/:userId/:habitId`
- `useMutationUpdateHabitsOrder` → Now calls `PATCH /api/habits/:userId/order`

### 2. **Removed Firebase Dependencies**

- Removed all Firebase/Firestore imports
- Removed direct database calls
- Added API helper function for HTTP requests

### 3. **Enhanced Error Handling**

- Added authentication checks
- Better error messages
- Proper HTTP status code handling

## Setup Instructions

### 1. **Environment Configuration**

Create a `.env.local` file in your frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. **Start Backend First**

```bash
cd backend
yarn start:dev
```

### 3. **Start Frontend**

```bash
cd frontend
yarn dev
```

## Key Benefits

1. **Centralized Data Logic**: All habit and tracking logic is now in the backend
2. **Better Security**: Firebase rules are handled server-side
3. **Validation**: Input validation is enforced at the API level
4. **Scalability**: Easier to add business logic and features
5. **Error Handling**: Consistent error responses across all operations

## API Configuration

The API base URL is configurable through the `NEXT_PUBLIC_API_URL` environment variable:

- **Development**: `http://localhost:3001/api`
- **Production**: Set to your deployed backend URL

## Authentication Notes

- User authentication still uses Firebase Authentication
- The backend validates requests using Firebase Admin SDK
- User UID is passed in the API routes for data isolation

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure the backend is running and CORS is properly configured
2. **Network Errors**: Check that `NEXT_PUBLIC_API_URL` points to the correct backend
3. **Authentication**: Verify Firebase authentication is working and user.uid is available

### Error Messages:

- `"User not authenticated"`: User is not logged in or user.uid is null
- `"API Error: 404"`: Habit or tracking data not found
- `"API Error: 400"`: Invalid request data (check validation rules)

## Migration Checklist

- [ ] Backend API is running on port 3001
- [ ] Environment variables are set correctly
- [ ] Firebase Authentication is still working
- [ ] All habit operations work through the API
- [ ] Habit tracking (check-ins) work through the API
- [ ] Error handling is working properly

Your frontend should now work seamlessly with the new backend API while maintaining the same functionality! 🚀
