let React = require('react');

class InteractionView extends React.Component {
  render () {
    var interaction = this.props.interaction;
    if (interaction) {
      return (
        <div>
          <p>First Name: {interaction.first_name}</p>
          <p>Last Name: {interaction.last_name}</p>
          <p>Email: {interaction.email}</p>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

module.exports = InteractionView;