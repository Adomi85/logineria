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
    },
    NAND: {
        type: 'NAND',
        inputs: ['in1', 'in2'],
        outputs: ['out']
    },
    NOR: {
        type: 'NOR',
        inputs: ['in1', 'in2'],
        outputs: ['out']
    },
    XOR: {
        type: 'XOR',
        inputs: ['in1', 'in2'],
        outputs: ['out']
    },
    XNOR: {
        type: 'XNOR',
        inputs: ['in1', 'in2'],
        outputs: ['out']
    }
};