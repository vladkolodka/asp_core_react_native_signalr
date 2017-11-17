import React, { Component } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { HttpConnection, HubConnection } from '@aspnet/signalr-client';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.connection = new HubConnection(new HttpConnection("http://10.0.2.2:12345/chat"));

    this.state = {
      messages: [],
      message: '',
      error: null
    };

    this.onSend = this.onSend.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.error !== null && prevState.error === null) {
      Alert.alert("Error", this.state.error, [
        { text: 'Ok' }
      ]);

      this.setState({ error: null });
    }
  }



  addMessage(message) {
    this.setState({
      messages: [...this.state.messages,
      { key: this.state.messages.length, message: message }
      ]
    });
  }

  componentDidMount() {
    this.connection.on('Send', data => this.addMessage(data));

    this.connection.start().catch(_ => {
      this.setState({ error: "Connection can not be established!" });
    });
  }

  onSend() {
    this.connection.invoke("Send", this.state.message);

    this.setState({ message: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.messages} style={styles.container}
          renderItem={({ item }) =>
            <Text style={styles.row}>{item.message}</Text>
          } />

        <TextInput value={this.state.message} onChangeText={text => this.setState({ message: text })} />
        <Button title='Send' onPress={this.onSend} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    marginVertical: 2,
    backgroundColor: 'silver',
    color: 'red',
    padding: 5
  }
});