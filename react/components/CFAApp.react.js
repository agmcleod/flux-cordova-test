var React = require('react');
var InteractionForm = require('./InteractionForm.react');
var InteractionStore = require('../stores/InteractionStore');
var InteractionActions = require('../actions/InteractionActions');
var FinishInteraction = require('./FinishInteraction.react');

class CFAApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      currentView: "welcome"
    };
  }

  componentDidMount () {
    InteractionStore.addChangeListener(this.onChange.bind(this));
  }

  componentWillUnmount () {
    InteractionStore.removeChangeListener(this.onChange.bind(this));
  }

  onChange () {
    var interaction = InteractionStore.getInteraction();
    if (interaction === null) {
      this.setState({ currentView: "welcome" });
    }
    else {
      switch (interaction.state) {
        case "new":
          this.setState({ currentView: 'form' });
          break;
        case "saved":
          this.setState({ currentView: "finish" });
          break;
      }
    }
  }

  render () {
    switch (this.state.currentView) {
      case "welcome":
        return (
          <div className="welcome">
            <h1>Welcome to my CFA</h1>
            <button onClick={this.startInteraction}>Get Started</button>
          </div>
        );
        break;
      case "form":
        return (
          <div className="form">
            <InteractionForm />
          </div>
        );
        break;
      case "finish":
        return (
          <FinishInteraction />
        );
        break;
      default:
        return null;
    }
  }

  startInteraction () {
    InteractionActions.newInteraction();
  }
}

module.exports = CFAApp;