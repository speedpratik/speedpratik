# Users Resource

Represents the accessible user specifications.

## User object

### User Structure

| Field               | Type   | Description                                                  |
|---------------------|--------|--------------------------------------------------------------|
| id                  | int    | the user's id                                                |
| username            | string | the user's username, may not be unique                       |
| email               | string | the user's email                                             |
| avatar              | string | the user's avatar link                                       |
| flags               | string | the user's flags                                             |
| completed_subjects  | int    | the user's amount of completed subjects                      |
| completed_exercises | int    | the user's amount of completed exercises                     |
| accumulated_time    | int    | the user's time spent doing any exercises in seconds         |
| achievements        | object | the user's [achievements](/api/users?id=achievements-object) |
| trophies            | object | the user's [trophies](/api/users?id=trophies-object)         |
| xp                  | int    | the user's experience points for leveling system             |
| level               | int    | the user's level according to their XP                       |          |

### Example user

```json
{
  "id": 36234,
  "username": "bob",
  "email": "bob@example.com",
  "avatar": "5224a2ab15b72be48eac35a9412f44e8",
  "flags": 0,
  "completed_subjects": 21,
  "completed_exercises": 45,
  "accumulated_time": 18842,
  "achievements": {},
  "trophies": {},
  "xp": 8327,
  "level": 15
}
```

### User flags

| Value    | Name  | Description             |
|----------|-------|-------------------------|
| `1 << 0` | ADMIN | Website's administrator |

## Achievements Object

TBD

## Trophies Object

TBD
