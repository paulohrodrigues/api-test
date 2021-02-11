define({ "api": [
  {
    "type": "post",
    "url": "/parking",
    "title": "",
    "name": "CreateReservation",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plate",
            "description": "<p>license plate.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>uid Reservation.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"0x2343r7Tv23eD343\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Invalid Plate\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"There is already an open reserve for this plate\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/reservation.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "get",
    "url": "/parking/:plate",
    "title": "",
    "name": "HistoricReservationPerPlate",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>limit find.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "offset",
            "description": "<p>pagination.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>uid Reservation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plate",
            "description": "<p>license plate.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>opening time until payment.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "paid",
            "description": "<p>if it's paid.</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "left",
            "description": "<p>if already left.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"0x2343r7Tv23eD343\",\n  \"plate\": \"AAA-1234\",\n  \"time\": \"2 minutes\",\n  \"paid\": true,\n  \"left\": true\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/reservation.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "patch",
    "url": "/parking/:id/out",
    "title": "",
    "name": "OutReservation",
    "group": "Reservation",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Bad Request\n{\n  \"message\": \"Reservation not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Car can only be released after payment\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"This reserve is already released\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/reservation.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "patch",
    "url": "/parking/:id/pay",
    "title": "",
    "name": "PayReservation",
    "group": "Reservation",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK\n{\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Bad Request\n{\n  \"message\": \"Reservation not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"This reservation is already paid\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/reservation.js",
    "groupTitle": "Reservation"
  }
] });
