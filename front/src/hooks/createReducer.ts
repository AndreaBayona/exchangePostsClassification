type Action<Actions> = {
  type: keyof Actions;
  payload: any;
};

export const createReducer = <
  State,
  Actions extends { [key: string]: (state: State, payload?: any) => State }
>(
  initialState: State,
  actionsHandlers: Actions
) => {
  return (state = initialState, action: Action<Actions>) => {
    const reduceFn = actionsHandlers[action.type];
    if (!reduceFn) {
      return state;
    }
    return {
      ...state,
      ...reduceFn(state, action.payload),
    };
  };
};
