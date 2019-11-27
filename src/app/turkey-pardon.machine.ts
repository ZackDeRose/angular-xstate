import { Machine, assign } from 'xstate';

export const turkeyPardonMachine = Machine({
  id: 'turkey-pardon',
  initial: 'init',
  context: {
    undecided: [] as string[],
    eaten: [] as string[],
    pardoned: [] as string[]
  },
  states: {
    init: {
      on: {
        INITIAL_LOAD: { target: 'initial loading', actions: 'loadTurkeyState' }
      }
    },
    'initial loading': {
      on: { LOADED: { target: 'prestine form' } }
    },
    'prestine form': {
      on: {
        FORM_VALID: {
          target: 'valid form'
        },
        FORM_INVALID: {
          target: 'invalid form'
        }
      }
    },
    'valid form': {
      on: {
        FORM_VALID: {
          target: 'valid form'
        },
        FORM_INVALID: {
          target: 'invalid form'
        },
        SUBMIT: {
          target: 'submit pending'
        }
      }
    },
    'invalid form': {
      on: {
        FORM_VALID: {
          target: 'valid form'
        },
        FORM_INVALID: {
          target: 'invalid form'
        }
      }
    },
    'submit pending': {
      on: {
        SUBMIT_SUCCESS: {
          target: 'prestine form',
          actions: ['newTurkeyState']
        },
        SUBMIT_FAILURE: {
          target: 'valid form'
        }
      }
    }
  }
});
