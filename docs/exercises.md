# Exercise Resource - Substructure of Subjects

Represents the main topic of SpeedPratik being the exam subjects it focuses on.

## Exercise Object

Represents each exercises of a given subject. Only two instances are given in the 2022's subjects. They each focus on a peculiar topic and have different questions, them being either on the making of a new function or on an uncompleted one with gaps to fill.

### Exercise Structure

| Field      | Type   | Description                                                                   |
|------------|--------|-------------------------------------------------------------------------------|
| `id`       | int    | the exercise's id                                                             |
| `type`     | int    | the exercise's [question type](/api/subjects?id=exercise-type)                |
| `subject`  | int    | the exercise's linked subject ID                                              |
| `number`   | int    | the exercise's number within the subject                                      |
| `topic`    | string | the exercise's thematic                                                       |
| `question` | string | the exercise's markdown parsed question                                       |
| `asserts`  | array  | the exercise's [asserts](/api/subjects?id=asserts-sub-structure), if provided |                        
| `program`  | string | the exercise's Python parsed program, if provided                             |

#### Exercise Type

| Value | Name                 |
|:-----:|----------------------|
|   0   | Function creation    |
|   1   | Function to complete |

#### Asserts Sub-structure

The asserts sub-structure is represented by a two-dimensional array containing a couple of values being: the function to be tested; and the return value.

### Get exercise
#### `GET /subjects/id/{subject.id}/exercises`

Returns all exercises objects matching subject of given ID.

#### `GET /subjects/id/{subject.id}/exercises/{exercise.number}`

Returns specific exercise object with given number matching subject of given ID.

#### `GET /exercises`

Returns the first 100 retrieved exercises objects from the database.

#### `GET /exercises/id/{exercise.id}`

Returns exercise object of given ID.

#### `GET /exercises/type/{exercise.type}`

Returns the first 100 retrieved exercises objects of given type from the database.

### Create exercise
#### `POST /exercises`

Creates new subject with the all [Exercise Structure](/subjects?id=exercise-structure) fields except for ID. Returns newly created exercise.

### Modify exercise
#### `PUT /exercises/id/{exercise.id}`

Modifies existent exercise of given ID. Can match all [Exercise Structure](/subjects?id=exercise-structure) fields except id and subject. Returns modified exercise.

### Delete exercise
#### `DELETE /exercises/id/{exercise.id}`

Deletes exercise of given ID.
