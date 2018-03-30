import React from 'react';
import { Container, Header, Input, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSubmit = async () => {
    try {
      const response = await this.props.mutate({
        variables: this.state,
      });
      console.log(response);
    } catch (err) {
      console.log('ERROR REGISTERING: ', err);
    }
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input name="username" onChange={this.onChange} value={username} placeholder="username" fluid />
        <Input name="email" onChange={this.onChange} value={email} placeholder="email" fluid />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          password="username"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!){
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);