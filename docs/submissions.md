# Submissions Resources

Represents users attempts at solving subjects.

## Submissions Object

### Submissions Structure

| Field         | Type  | Description                                                                     |
|---------------|-------|---------------------------------------------------------------------------------|
| `id`          | int   | the submission's id                                                             |
| `user`        | int   | the submission's linked user ID                                                 |
| `subject`     | int   | the submission's linked subject ID if applicable                                |
| `exercise`    | int   | the submission's linked exercise ID if applicable                               |
| `number`      | int   | the submission's number for the subject / exercise by the user                  |
| `start_date`  | int   | the submission's starting date as a timestamp                                   |
| `submit_date` | int   | the submission's submit date as a timestamp                                     |
| `xp_award`    | int   | the submission's XP award                                                       |
| `programs`    | array | the submission's [programs as an array](/submissions?id=programs-sub-structure) |

The submission must have either `subject` or `exercise` values but not both.

#### Submission Example

##### Example 1

```json
{
  "id": 3742,
  "user": 42,
  "subject": 27,
  "exercise": null,
  "number": 1,
  "start_time": 1653238667,
  "submit_time": 1653239373,
  "xp_award": 167,
  "programs": [
    {
      "exercise": 23,
      "program": "print(\"hello world!\")"
    },
    {
      "exercise": 24,
      "program": "def myVeryComplexFunction():\n\treturn someVeryObscureFunctionCall()"
    }
  ]
}
```

##### Example 2

```json
{
  "id": 1337,
  "user": 34594,
  "subject": null,
  "exercise": 123,
  "number": 2,
  "start_time": 1650033056,
  "submit_time": 1650037520,
  "xp_award": 12,
  "programs": [
    {
      "exercise": 348,
      "program": "print(\"42\")"
    }
  ]
}
```

#### Programs Sub-structure

Array containing all exercises programs submitted by the user.

|   Value    | Type   | Description                                         |
|:----------:|--------|-----------------------------------------------------|
| `exercise` | int    | Exercise ID *(beware, this is NOT exercise number)* |
| `program`  | string | User's Python parsed program submission             |

## API Endpoints

**Note:** Due to their nature, it is **not** possible to modify a created submission object.

### Get Submissions

#### `GET /user/{user.id}/submissions`

Fetches all submissions objects from user of given ID.

#### `GET /user/{user.id}/submissions/subject/{subject.id}`

Fetches all submissions objects from user of given ID on a given subject.

#### `GET /user/{user.id}/submissions/exercise/{exercise.id}`

Fetches all submissions objects from user of given ID on a given exercise.

#### `GET /submissions/id/{submission.id}`

Fetches submission object of given ID.

#### `GET /submissions/subject/{subject.id}`

Fetches all submissions objects of given subject ID.

#### `GET /submissions/exercise/{exercise.id}`

Fetches all submissions objects of given exercise ID.

### Create Submission

#### `POST /submissions`

Creates new submission with the below-described [Submissions Structure](/submissions?id=submissions-structure) fields. Returns newly created submission object.

| Value        | Type  | Description                                                                     |
|--------------|-------|---------------------------------------------------------------------------------|
| `user`       | int   | the submission’s linked user ID                                                 |
| `subject`    | int   | the submission’s linked subject ID if applicable                                |
| `exercise`   | int   | the submission’s linked exercise ID if applicable                               |
| `start_date` | int   | the submission’s starting date as a timestamp                                   |
| `programs`   | array | the submission's [programs as an array](/submissions?id=programs-sub-structure) |

**Note:** As specified above, there **must** be either a `subject` or an `exercise` but not both!

The awarded XP, submit date and submission number is determined by the API backend.

### Delete Submission

#### `DELETE /submissions/id/{submission.id}`

Deletes existent submission of given ID.
