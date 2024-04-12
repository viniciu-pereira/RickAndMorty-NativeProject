import { StyleSheet } from "react-native";

export const container = StyleSheet.create({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
})

export const input = StyleSheet.create({
  borderWidth: 1,
  borderColor: '#1C1C1C',
  borderRadius: 5,
  padding: 10,
  marginVertical: 10,
  width: '80%',
  backgroundColor: '#fff',
  alignSelf: 'center',
  color: '#555'
})

export const Button = StyleSheet.create({
  button: {
    backgroundColor: '#0062A7',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
})

export const addButton = StyleSheet.create({
  width: '70%',
  padding: '15%',
  color: '#0062A7',
  alignItems: 'center'
})

