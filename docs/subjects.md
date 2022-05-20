# Subjects Resource

Represents the main topic of SpeedPratik being the exam subjects it focuses on.

## Subjects Object

### Subject Structure

| Field        | Type   | Description                                                               |
|--------------|--------|---------------------------------------------------------------------------|
| `id`         | int    | the subject's id                                                          |
| `session`    | int    | the subject's year                                                        |
| `number`     | int    | the subject's official numbering                                          |
| `link`       | string | the subject's official download link                                      |
| `difficulty` | int    | the subject's [estimated difficulty](/api/subjects?id=subject-difficulty) |
| `flags`      | int    | the subject's [flags](/api/subjects?id=subject-flags)                     |
| `exercises`  | object | the subject's [parsed exercises](/api/subjects?id=exercise-object)        |

#### Subject Example

The exercise structure in this example is later explained.

```json
{
  "id": 1,
  "session": 2022,
  "link": "https://eduscol.education.fr/document/33178/download",
  "difficulty": 1,
  "flags": 0,
  "exercises": [
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
    },
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
  ]
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

Creates new subject with the all [subject structure](/subjects?id=subject-structure) fields except for ID. Returns modified subject.

### Modify subject
#### `PUT /subjects/id/{subject.id}`

Modifies existent subject of given ID. Can match all [subject Structure](/subjects?id=subject-structure) fields except id. Returns modified subject.

### Delete subject
#### `DELETE /subjects/id/{subject.id}`

Deletes existent subject of given ID.
