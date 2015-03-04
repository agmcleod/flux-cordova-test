let React = require('react');
let InteractionActions = require('../actions/InteractionActions');

class InteractionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: null,
      last_name: null,
      email: null
    };
  }

  back(e) {
    e.preventDefault();
    InteractionActions.start();
  }

  handleChange(key) {
    return ((e) => {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }).bind(this);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.saveData.bind(this)}>
          <div className="field">
            <label htmlFor="first_name">First Name:</label>
            <input type="text" id="first_name" onChange={this.handleChange("first_name")} />
          </div>
          <div className="field">
            <label htmlFor="last_name">Last Name:</label>
            <input type="text" id="last_name" onChange={this.handleChange("last_name")} />
          </div>
          <div className="field">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={this.handleChange("email")} />
          </div>
          <div className="field field-submit">
            <input type="submit" value="Submit" />
          </div>
        </form>

        <a onClick={this.back} className="navlink" href="#">Back</a>
      </div>
    );
  }

  saveData(e) {
    e.preventDefault();
    InteractionActions.saveFormData(this.state);
  }
}

module.exports = InteractionForm;
