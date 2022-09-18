export default {
  'cells': [
    {
      'position': {
        'x': 60,
        'y': 50,
      },
      'size': {
        'width': 120,
        'height': 64,
      },
      'visible': true,
      'shape': 'rect',
      data: {
        msg: 'node',
        initCount: 1,
      },
      'id': '5362bf96-7eab-4716-b0d1-ac1e24e4d168',
      'zIndex': 3,
      'ports': {
        'groups': {
          'in': {
            'attrs': {
              'circle': {
                'r': 6,
                'magnet': true,
                'strokeWidth': 2,
              },
            },
            'position': 'left',
          },
          'out': {
            'attrs': {
              'circle': {
                'r': 6,
                'magnet': true,
                'strokeWidth': 2,
              },
            },
            'position': 'right',
          },
        },
        'items': [
          {
            'id': 'port1',
            'group': 'in',
          },
          {
            'id': 'port2',
            'group': 'in',
          },
          {
            'id': 'port3',
            'group': 'in',
          },
          {
            'id': 'port4',
            'group': 'out',
          },
          {
            'id': 'port5',
            'group': 'out',
          },
        ],
      },
    },
    {
      'position': {
        'x': 440,
        'y': 220,
      },
      'size': {
        'width': 120,
        'height': 64,
      },
      'visible': true,
      'shape': 'rect',
      'id': 'e18c0ba0-4294-4829-8a96-2351927e9faf',
      'zIndex': 4,
      'ports': {
        'groups': {
          'in': {
            'attrs': {
              'circle': {
                'r': 6,
                'magnet': true,
                'strokeWidth': 2,
              },
            },
            'position': 'left',
          },
          'out': {
            'attrs': {
              'circle': {
                'r': 6,
                'magnet': true,
                'strokeWidth': 2,
              },
            },
            'position': 'right',
          },
        },
        'items': [
          {
            'id': 'port1',
            'group': 'in',
          },
          {
            'id': 'port2',
            'group': 'in',
          },
          {
            'id': 'port3',
            'group': 'in',
          },
          {
            'id': 'port4',
            'group': 'out',
          },
          {
            'id': 'port5',
            'group': 'out',
          },
        ],
      },
    },
    {
      'shape': 'edge',
      'id': '6ba6073d-0680-401d-ae9c-36f89492a96a',
      'source': {
        'cell': '5362bf96-7eab-4716-b0d1-ac1e24e4d168',
        'port': 'port5',
      },
      'target': {
        'cell': 'e18c0ba0-4294-4829-8a96-2351927e9faf',
        'port': 'port1',
      },
      'zIndex': 5,
    },
  ],
}
