# API Documentation
-
This is the official documentation for the CS3733-TeamD-Production backend server API.  It lists all valid endpoints that are accepted, their parameters, and what data they may return.

## Map
<span style="color:green">`[GET]  http://localhost:3000/api/map`</span>

**Example Response:**

```json
{
  "nodes": [
    {
      "nodeID": "CHALL004L1",
      "xcoord": 2770,
      "ycoord": 1070,
      "floor": "L1",
      "building": "45 Francis",
      "longName": "Hallway 4 Floor L1",
      "shortName": "Hallway C004L1",
      "nodeType": "HALL"
    }
  ],
  "edges": [
    {
      "startNodeID": "CCONF002L1",
      "endNodeID": "WELEV00HL1",
      "blocked": false
    }
  ]
}
```

## Service Request
<span style="color:green">`[GET]  http://localhost:3000/api/service-request`</span>

**Body Parameters**

**`type`** - <span style="color:blue">string</span> - will only return service requests of the given type (TODO)

**Example Response:**

```
[
  {
    "requestID": 1,
    "type": "MAINTENANCE",
    "notes": "note",
    "location": {
      "nodeID": "WELEV00ML1",
      "xcoord": 1820,
      "ycoord": 1284,
      "floor": "L1",
      "building": "Tower",
      "longName": "Elevator M Floor L1",
      "shortName": "Elevator ML1",
      "nodeType": "ELEV"
    },
    "maintenanceDetail": {
      "requestID": 1,
      "maintenanceType": "PLUMBING",
      "workersNeeded": 3
    },
    "flowerDetail": null
  }
]
```

`[POST]  http://localhost:3000/api/service-request`

**TODO**

**Example Response:**

```
Response
```

Some Markdown text with <span style="color:blue">some *blue* text</span>.

