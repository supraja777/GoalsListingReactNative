import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, TextInput,Button,FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState(false)

  const [enteredGoalText, setEnteredGoalText] = useState("");
  const [goalsList, setGoalsList] = useState([])


  function startAddGoalHandler() {
      setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
}

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText)
  }

  function addGoalHandler() {
    setGoalsList((currentGoals) => [...currentGoals, {text: enteredGoalText, id: Math.random().toString() },] )
    setEnteredGoalText('')
    endAddGoalHandler()
  }

  function deleteGoalHandler(id) {
     setGoalsList(currentGoal => {
      return currentGoal.filter((goal) => goal.id!== id)
     })
  }

  return (
    <View style={styles.appContainer}>
      <Button title='Add new goal' color="#5e0acc" onPress={startAddGoalHandler}></Button>
       <GoalInput visible={modalIsVisible} goalInputHandler = {goalInputHandler} addGoalHandler = {addGoalHandler} endAddGoalHandler = {endAddGoalHandler}/>
      <View style={styles.goalsContainer}>
      <FlatList data={goalsList} renderItem={itemData=> {
       return <GoalItem text={itemData.item.text} keyIndex={itemData.item.id} deleteGoalHandler = {deleteGoalHandler}/>}}/>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    appContainer: {
      flex:1,
      padding: 50,
      backgroundColor: '#1e085a'
    },
    
    goalsContainer: {
      flex:4
    },
});
