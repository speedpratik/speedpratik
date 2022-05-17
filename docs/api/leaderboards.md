# Leaderboards Resource

Represents the different leaderboards.

## Leaderboard Object

### Leaderboard Structure

| Field         | Type   | Description                                                                                            |
|---------------|--------|--------------------------------------------------------------------------------------------------------|
| `id`          | int    | the leaderboard's id                                                                                   |
| `frequency`   | int    | the leaderboard's [frequency](/api/leaderboards?id=frequencies) (daily, weekly or special)             |
| `type`        | int    | the leaderboard's [type](/api/leaderboards?id=types) (time based, amount of exercises...)              |
| `title`       | string | the leaderboard's display name for special events (`null` otherwise)                                   |
| `subject`     | int    | the subject's ID if applicable (`null` otherwise, see [types](/api/leaderboards?id=types) for details) |
| `start_date`  | int    | the leaderboard's starting timestamp                                                                   |
| `end_date`    | int    | the leaderboard's ending timestamp                                                                     |
| `active`      | bool   | is the leaderboard active?                                                                             |
| `rewards`     | object | the leaderboard's reward (achievements, points, xp...)                                                 |
| `contestants` | array  | the leaderboard's sorted contestants objects array                                                     |

### Leaderboard Example

The following example describes a daily leaderboard which is calculated based on the time performance of contestants in the subject 34. Here there are only two contestants, the first one being the user of ID 36234, the second with ID 37588.

```json
{
  "id": 21,
  "frequency": 1,
  "type": 0,
  "title": null,
  "subject": 34,
  "start_date": 1652644942,
  "end_date": 1652731342,
  "active": false,
  "rewards": {},
  "contestants": [
    {
      "id": 36234,
      "time": 273
    },
    {
      "id": 37588,
      "time": 381
    }
  ]
}
```

### Frequencies

| Value | Description                            |
|:-----:|----------------------------------------|
|  `0`  | Special event set up by administrators |
|  `1`  | Automatic daily leaderboard            |
|  `2`  | Automatic weekly leaderboard           |

### Types

These types will affect the value of `subject` as it will only be non-null on time-based leaderboards. `Contestants` objects are also affected by the type of leaderboard.

| Value | Description                                                       |
|:-----:|-------------------------------------------------------------------|
|  `0`  | Time-based leaderboard, the lower the better                      |
|  `1`  | Amount of exercises done based leaderboard, the higher the better |

## Contestant Object

### Contestant Structures

There are two different structures with slight changes according to the [type of leaderboard](/api/leaderboards?id=types).

#### Time-based leaderboard

| Field  | Type | Description                                                                        |
|--------|------|------------------------------------------------------------------------------------|
| `id`   | int  | the contestant's id corresponding to their [user ID](/api/users?id=user-structure) |
| `date` | int  | the contestant attempt's date as a timestamp                                       |
| `time` | int  | the contestant attempt's time in seconds                                           |

#### Amount of exercises done based leaderboard

| Field       | Type  | Description                                                                                         |
|-------------|-------|-----------------------------------------------------------------------------------------------------|
| `id`        | int   | the contestant's id corresponding to their [user ID](/api/users?id=user-structure)                  |
| `exercices` | array | the contestant's array of completed attempts IDs in crescendo order while the leaderboard is active |
