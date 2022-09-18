export default {
  'nodes': [
    {
      'id': 'node_id_1',
      'type': 'component-node',
      'x': 820,
      'y': 140,
      'properties': {
        'tableName': 'Users',
        'fields': [
          {
            'key': 'id',
            'type': 'string',
          },
          {
            'key': 'name',
            'type': 'string',
          },
          {
            'key': 'age',
            'type': 'integer',
          },
        ],
      },
    },
    {
      'id': 'node_id_2',
      'type': 'component-node',
      'x': 1200,
      'y': 260,
      'properties': {
        'tableName': 'Settings',
        'fields': [
          {
            'key': 'id',
            'type': 'string',
          },
          {
            'key': 'key',
            'type': 'integer',
          },
          {
            'key': 'value',
            'type': 'string',
          },
        ],
      },
    },
  ],
  'edges': [
    {
      'id': 'e48a6e2c-6eb6-444e-8f2f-6df293fafeeb',
      'type': 'component-edge',
      'sourceNodeId': 'node_id_1',
      'targetNodeId': 'node_id_2',
      'startPoint': {
        'x': 910,
        'y': 134,
      },
      'endPoint': {
        'x': 1110,
        'y': 254,
      },
      'properties': {},
      'pointsList': [
        {
          'x': 910,
          'y': 134,
        },
        {
          'x': 1020,
          'y': 134,
        },
        {
          'x': 1000,
          'y': 254,
        },
        {
          'x': 1110,
          'y': 254,
        },
      ],
    },
  ],
}
