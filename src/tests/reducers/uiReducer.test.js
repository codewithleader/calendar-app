import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';

const initialState = {
  isModalOpen: false,
};
describe('UI Reducer Tests', () => {
  test('should return the initial state', () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test('should handle UI_OPEN_MODAL and UI_CLOSE_MODAL', () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initialState, modalOpen);
    // console.log(state);
    expect(state).toEqual({
      isModalOpen: true,
    });

    const modalClose = uiCloseModal();
    const stateClose = uiReducer(state, modalClose);
    // console.log(stateClose);
    expect(stateClose).toEqual({
      isModalOpen: false,
    });
  });
});
