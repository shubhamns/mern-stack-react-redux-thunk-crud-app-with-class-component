import React from "react";
import { connect } from "react-redux";
import { getUserById, updateUserById } from "./../actions/user";

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      errors: {},
      submitted: false,
    };
  }

  componentDidMount() {
    this.props.getUserById(this.props.match.params.id);
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.item !== undefined) {
      this.setState({ prevState, ...nextProps.item });
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { firstName, lastName, email } = this.state;
      this.handleValidate({ firstName, lastName, email });
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const { firstName, lastName, email } = this.state;
    if (this.handleValidate({ firstName, lastName, email })) {
      this.props.updateUser(
        this.props.match.params.id,
        {
          firstName,
          lastName,
          email,
        },
        this.props.history
      );
    }
  };

  handleValidate = (values) => {
    let errors = {};
    let isValid = true;
    if (!values["firstName"]) {
      isValid = false;
      errors["firstName"] = "Please enter first name";
    }
    if (!values["lastName"]) {
      isValid = false;
      errors["lastName"] = "Please enter last name.";
    }
    if (!values["email"]) {
      isValid = false;
      errors["email"] = "Please enter email address";
    }
    this.setState({ errors: errors });
    return isValid;
  };

  render() {
    const { loading, item } = this.props;
    const { firstName, lastName, email, errors, submitted } = this.state;
    return (
      <React.Fragment>
        <h1 style={{ textAlign: "center" }}>Update User</h1>
        <div className="row">
          <form className="col-md-6 offset-md-3" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">FirstName</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (submitted && !!errors.firstName ? " is-invalid" : "")
                }
                name="firstName"
                value={firstName}
                onChange={this.handleChange}
              />
              {submitted && !!errors.firstName && (
                <div className="invalid-feedback">FirstName is required</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">LastName</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (submitted && !!errors.lastName ? " is-invalid" : "")
                }
                name="lastName"
                value={lastName}
                onChange={this.handleChange}
              />
              {submitted && !!errors.lastName && (
                <div className="invalid-feedback">LastName is required</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className={
                  "form-control" +
                  (submitted && !!errors.email ? " is-invalid" : "")
                }
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {submitted && !!errors.email && (
                <div className="invalid-feedback">Email is required</div>
              )}
            </div>
            <div className="form-group my-2">
              <button className="btn btn-primary">Submit</button>
              {loading && (
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { loading, item } = state.users;
  return { loading, item };
}

const actionCreators = {
  getUserById: getUserById,
  updateUser: updateUserById,
};

const connected = connect(mapState, actionCreators)(Update);
export { connected as UpdatePage };
