import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';
import { extractLastPartAfterSlash } from '../services/utils';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Character,
  Avatar,
  Name,
  ProfileButton,
  ProfileButtonText,
  Status,
} from './style';

export default class Main extends Component {
  state = {
    newCharacter: '',
    characters: [],
    loading: false,
  };

  async componentDidMount() {
    const characters = await AsyncStorage.getItem('characters');

    if (characters) {
      this.setState({ characters: JSON.parse(characters) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { characters } = this.state;

    if (prevState.characters !== characters) {
      await AsyncStorage.setItem('characters', JSON.stringify(characters));
    }
  }

  handleAddCharacter = async () => {
    try {

      const { characters, newCharacter } = this.state;

      this.setState({ loading: true });

      const raw_response = await api.get(`api/character/?name=${newCharacter}&count=3`);

      const response = raw_response.data

      const first = response.results[0];

      const data = {
        id: first.id.toString(),
        name: first.name,
        image: first.image || 'Unknown',
        status: first.status || 'Unknown',
        episode: extractLastPartAfterSlash(first.episode[0]) || 'Unknown',
        species: first.species || 'Unknown',
        type: first.type || 'Unknown',
        gender: first.gender || 'Unknown',
        origin: first.origin.name || 'Unknown',
        location: first.location.name || 'Unknown',
      };
      console.log(data)

      if (characters.some(character => character.id === data.id)) {
        throw new Error('Data already exists in characters.');
      }
      this.setState({
        characters: [...characters, data],
        newCharacter: '',
        loading: false,
      });

      Keyboard.dismiss();
    } catch (error) {
      alert('Algo deu errado, verifique o nome do personagem!');
      this.setState({ loading: false });
    }

  };

  render() {
    const { characters, newCharacter, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar personagem"
            value={newCharacter}
            onChangeText={text => this.setState({ newCharacter: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddCharacter}
          />
          <SubmitButton loading={loading} onPress={this.handleAddCharacter}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={characters}
          keyExtractor={character => character.id}
          renderItem={({ item }) => (
            <Character key={item.id}>
              <Name>{item.name}</Name>
              <Avatar source={{ uri: item.image }} />
              <Status>{item.status}</Status>

              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate('detail', { character: item });
                }}
              >
                <ProfileButtonText>See Card</ProfileButtonText>
              </ProfileButton>

              <ProfileButton
                onPress={() => {
                  this.setState({
                    characters: this.state.characters.filter(
                      character => character.id !== item.id,
                    ),
                  });
                }}
                style={{ backgroundColor: '#DE3737', borderRadius: 10 }}>
                <ProfileButtonText>Delete Card</ProfileButtonText>
              </ProfileButton>
            </Character>
          )}
        />
      </Container>
    );
  }
}