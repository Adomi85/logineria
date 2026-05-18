export const NODE_TYPES = {
    INPUT: {
        type: 'INPUT',
        inputs: [],
        outputs: ['out']
    },
    OUTPUT: {
        type: 'OUTPUT',
        inputs: ['in'],
        outputs: []
    },
    AND: {
        type: 'AND',
        inputs: ['in1', 'in2'],
        outputs: ['out']
    },
    OR: {
        type: 'OR',
        inputs: ['in1', 'in2'],
        outputs: ['out']
    },
    NOT: {
        type: 'NOT',
        inputs: ['in'],
        outputs: ['out']
    }
};