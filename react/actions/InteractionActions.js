let AppDispatcher = require('../dispatcher/AppDispatcher');
let InteractionConstants = require('../constants/InteractionConstants');

var InteractionActions = {
  newInteraction() {
    AppDispatcher.dispatch({
      actionType: InteractionConstants.NEW_INTERACTION
    });
  },

  saveFormData(data) {
    AppDispatcher.dispatch({
      actionType: InteractionConstants.SAVE,
      interaction: data
    });
  },

  start() {
    AppDispatcher.dispatch({
      actionType: InteractionConstants.START
    });
  }
};

module.exports = InteractionActions;