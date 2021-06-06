import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUsers, deleteUserById } from "./../actions/user";

class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleDelete = (id) => {
    const result = window.confirm("Are you sure to delete?");
    if (result) {
      this.props.deleteUserById(id);
    }
  };

  render() {
    const { items } = this.props;
    return (
      <React.Fragment>
        <h5 style={{ textAlign: "center" }} className="my-4">
          ReactJs CRUD App With React Redux Thunk
        </h5>
        <div className="col-md-6 offset-md-3">
          <Link to={`/create`} className="btn btn-success">
            Create
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>
                      <Link
                        to={`/update/${item._id}`}
                        className="btn btn-success mx-1"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger mx-1"
                        onClick={() => this.handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { items } = state.users;
  return { items };
}

const actionCreators = {
  getUsers: getUsers,
  deleteUserById: deleteUserById,
};

const connected = connect(mapState, actionCreators)(Read);
export { connected as ReadPage };
