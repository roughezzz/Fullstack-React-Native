import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";
import uuidv4 from "uuid/v4";
import { newTimer } from "./utils/TimerUtils";

export default class App extends React.Component {
  state = {
    timers: [
      {
        id: uuidv4(),
        title: "Mow the lawn",
        project: "House Chores",
        elapsed: 5456099,
        isRunning: true
      },
      {
        id: uuidv4(),
        title: "Bake squash",
        project: "Kitchen Chores",
        elapsed: 1273998,
        isRunning: false
      }
    ]
  };

  handleCreateFormSubmit = timer => {
    const { timers } = this.state;

    this.setState({
      timers: [newTimer(timer), ...timers]
    });
  };

  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
          {timers.map(({ id, title, project, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timerList: {
    paddingBottom: 15
  }
});
