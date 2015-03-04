var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var InteractionConstants = require('../constants/InteractionConstants');

var CHANGE_EVENT = 'change';

var _interaction = null;

function newInteraction () {
  _interaction = {
    state: 'new'
  };
}

function saveInteraction (interaction) {
  _interaction = interaction;
  _interaction.state = 'saved';
}

function start () {
  _interaction = null
}

var InteractionStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  getInteraction() {
    return _interaction;
  },

  removeChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case InteractionConstants.NEW_INTERACTION:
      newInteraction();
      break;
    case InteractionConstants.FORM_SAVE:
      saveInteraction(action.interaction);
      break;
    case InteractionConstants.START:
      start();
      break;
    default:
      return false;
  }

  InteractionStore.emitChange();
});

module.exports = InteractionStore;