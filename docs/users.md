# Users Resource

Represents the accessible user specifications.

## User object

### User Structure

| Field                 | Type   | Description                                                  |
|-----------------------|--------|--------------------------------------------------------------|
| `id`                  | int    | the user's id                                                |
| `username`            | string | the user's username, may not be unique                       |
| `email`               | string | the user's email                                             |
| `avatar`              | string | the user's avatar link                                       |
| `flags`               | int    | the user's flags                                             |
| `oauth2`              | string | the user's Oauth methods as a string                         |
| `account_creation`    | int    | the user's account creation timestamp                        |
| `completed_subjects`  | array  | the user's array of their completed subjects attempts IDs    |
| `completed_exercises` | array  | the user's array of their completed exercises attempts IDs   |
| `accumulated_time`    | int    | the user's time spent doing any exercises in seconds         |
| `achievements`        | object | the user's [achievements](/api/users?id=achievements-object) |
| `trophies`            | object | the user's [trophies](/api/users?id=trophies-object)         |
| `xp`                  | int    | the user's experience points for leveling system             |
| `level`               | int    | the user's level according to their XP                       |

#### Example user

```json
{
  "id": 36234,
  "username": "bob",
  "email": "bob@example.com",
  "avatar": "https://example.com/avatar.png",
  "flags": 0,
  "account_creation": 1652817097,
  "completed_subjects": 21,
  "completed_exercises": 45,
  "accumulated_time": 18842,
  "achievements": {},
  "trophies": {},
  "xp": 8327,
  "level": 15
}
```

#### User flags

| Value    | Name  | Description             |
|----------|-------|-------------------------|
| `1 << 0` | ADMIN | Website's administrator |


### Get user
#### `GET /users/{user.id}`

Returns the user object of given ID.

### Create user
#### `POST /users`

Creates non-existent user (if the mail is unique) with the following JSON parameters:

| Value      | Type   | Description              |
|------------|--------|--------------------------|
| `username` | string | the user's username      |
| `email`    | string | the user's email         |
| `oauth2`   | object | the user's Oauth methods |
| `avatar`   | string | the user's avatar link   |

The created (or not) user is then returned as the user structure previously mentioned.

### Modify user
#### `PUT /users/{user.id}`

Modifies existent user of given ID. Can match all User Structure fields except id and email. Returns updated user object.

### Delete user
#### `DELETE /users/{user.id}`

Deletes existent user of given ID.
