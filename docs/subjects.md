# Subjects Resource

Represents the main topic of SpeedPratik being the exam subjects it focuses on.

## Subjects Object

### Subject Structure

| Field        | Type   | Description                                                           |
|--------------|--------|-----------------------------------------------------------------------|
| `id`         | int    | the subject's id                                                      |
| `session`    | int    | the subject's year                                                    |
| `number`     | int    | the subject's official numbering                                      |
| `link`       | string | the subject's official download link                                  |
| `difficulty` | int    | the subject's [estimated difficulty](/subjects?id=subject-difficulty) |
| `flags`      | int    | the subject's [flags](/subjects?id=subject-flags)                     |

To get the exercises from the subject, see [Exercise Structure](/exercises).

#### Subject Example

The exercise structure in this example is later explained.

```json
{
  "id": 1,
  "session": 2022,
  "link": "https://eduscol.education.fr/document/33178/download",
  "difficulty": 1,
  "flags": 0
}
```

#### Subject difficulty

The difficulty is merely an estimation and may be subjective. User feedback should be implemented.

| Value | Name           |
|:-----:|----------------|
|   0   | Easy subject   |
|   1   | Normal subject |
|   2   | Hard subject   |

#### Subject flags

| Value    | Name   | Description                                                    |
|----------|--------|----------------------------------------------------------------|
| `1 << 0` | HIDDEN | Hidden subject, to be used in case of an error found inside it |
| `1 << 1` | HEBDO  | Weekly selected subject                                        |
| `1 << 2` | DAILY  | Daily selected subject                                         |

## API Endpoints

### Get subject
#### `GET /subjects`

Returns the first 100 retrieved subjects from the database.

#### `GET /subjects/id/{subject.id}`

Returns the subject object of given ID.

#### `GET /subjects/session/{subject.session}`

Returns all subject object of given session.

#### `GET /subjects/difficulty/{subject.difficulty}`

Returns all subject object of [given difficulty](/subjects?id=subject-difficulty).

### Create subject
#### `POST /subjects`

Creates new subject with the all [subject structure](/subjects?id=subject-structure) fields except for ID. Returns newly created subject.

### Modify subject
#### `PUT /subjects/id/{subject.id}`

Modifies existent subject of given ID. Can match all [subject Structure](/subjects?id=subject-structure) fields except id. Returns modified subject.

### Delete subject
#### `DELETE /subjects/id/{subject.id}`

Deletes existent subject of given ID.
