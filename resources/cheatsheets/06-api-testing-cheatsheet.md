# 📋 API Testing & Schema Validation — Quick Cheatsheet

## Common Status Codes
```
200 OK           → GET / PUT / PATCH success
201 Created      → POST success (Resource created)
204 No Content   → DELETE success (Empty body)
400 Bad Request  → Malformed syntax / Schema error
401 Unauthorized → Missing / Expired JWT Bearer token
403 Forbidden    → Authenticated but insufficient permissions
404 Not Found    → Resource does not exist
409 Conflict     → Duplicate key / State collision
429 Rate Limited → Too many requests
500 Server Error → Unhandled backend exception
```

## Zod Schema Validation
```typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
  tags: z.array(z.string()).optional(),
});

const result = UserSchema.safeParse(responseBody);
if (!result.success) console.error(result.error.issues);
```

## Bearer Token Auth Pattern
```typescript
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};
```
