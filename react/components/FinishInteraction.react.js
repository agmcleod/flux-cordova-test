let React = require('react');
let InteractionActions = require('../actions/InteractionActions');
let InteractionStore = require('../stores/InteractionStore');
let InteractionView = require('./InteractionView.react');

class FinishInteraction extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      interaction: null
    };
  }

  componentDidMount () {
    this.setState({
      interaction: InteractionStore.getInteraction()
    });
  }

  finishInteraction (e) {
    e.preventDefault();
    InteractionActions.start();
  }

  render () {
    var interaction = this.state.interaction;
    return (
      <div className="finish">
        <InteractionView interaction={interaction} />
        <button onClick={this.finishInteraction}>Finish</button>
      </div>
    );
  }
}

module.exports = FinishInteraction;