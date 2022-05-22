# Exercise Resource - Substructure of Subjects

Represents the main topic of SpeedPratik being the exam subjects it focuses on.

## Exercise Object

Represents each exercises of a given subject. Only two instances are given in the 2022's subjects. They each focus on a peculiar topic and have different questions, them being either on the making of a new function or on an uncompleted one with gaps to fill.

### Exercise Structure

| Field      | Type   | Description                                                                |
|------------|--------|----------------------------------------------------------------------------|
| `id`       | int    | the exercise's id                                                          |
| `type`     | int    | the exercise's [question type](/exercises?id=exercise-type)                |
| `subject`  | int    | the exercise's linked subject ID                                           |
| `number`   | int    | the exercise's number within the subject                                   |
| `topic`    | string | the exercise's thematic                                                    |
| `question` | string | the exercise's markdown parsed question                                    |
| `asserts`  | array  | the exercise's [asserts](/exercises?id=asserts-sub-structure), if provided |                        
| `program`  | string | the exercise's Python parsed program, if provided                          |

#### Exercise examples

##### Example 1

```json
{
  "id": 1,
  "type": 0,
  "topic": "Algorithmes de Recherche",
  "question": "Écrire une fonction `recherche` qui prend en paramètres `caractere`, un caractère, et `mot`, une chaîne de caractères, et qui renvoie le nombre d’occurrences de `caractere` dans `mot`, c’est-à-dire le nombre de fois où `caractere` apparaît dans `mot`.",
  "asserts": [
    ["recherche('e', \"sciences\")", 2],
    ["recherche('i', \"mississippi\")", 4],
    ["recherche('a', \"mississippi\")", 0]
  ],
  "program": null
}
```

##### Example 2

```json
{
  "id": 2,
  "type": 1,
  "topic": "Algorithmes Glouton",
  "question": "On s’intéresse à un algorithme récursif qui permet de rendre la monnaie à partir d’une liste donnée de valeurs de pièces et de billets - le système monétaire est donné sous forme d’une liste `pieces=[100, 50, 20, 10, 5, 2, 1]` - (on supposera qu’il n’y a pas de limitation quant à leur nombre), on cherche à donner la liste de pièces à rendre pour une somme donnée en argument.\nCompléter le code Python ci-dessous de la fonction rendu_glouton qui implémente cet algorithme et renvoie la liste des pièces à rendre",
  "asserts": [
    ["rendu_glouton(68, [], 0)", "[50, 10, 5, 2, 1]"],
    ["rendu_glouton(291, [], 0)", "[100, 100, 50, 20, 20, 1]"]
  ],
  "program": "Pieces = [100,50,20,10,5,2,1]\ndef rendu_glouton(arendre, solution=[], i=0):\n\tif arendre == 0:\n\t\treturn ...\n\tp = Pieces[i],\n\tif p <= ... :\n\t\tsolution.append(...)\n\t\treturn rendu_glouton(arendre - p, solution, i)\n\telse :\n\t\treturn rendu_glouton(arendre, solution, ...)"
}
```

#### Exercise Type

| Value | Name                 |
|:-----:|----------------------|
|   0   | Function creation    |
|   1   | Function to complete |

#### Asserts Sub-structure

The asserts sub-structure is represented by a two-dimensional array containing a couple of values being: the function to be tested; and the return value.

## API Endpoints

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

Creates new subject with all [Exercise Structure](/exercises?id=exercise-structure) fields except for ID. Returns newly created exercise.

### Modify exercise
#### `PUT /exercises/id/{exercise.id}`

Modifies existent exercise of given ID. Can match all [Exercise Structure](/exercises?id=exercise-structure) fields except id and subject. Returns modified exercise.

### Delete exercise
#### `DELETE /exercises/id/{exercise.id}`

Deletes exercise of given ID.
