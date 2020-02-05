import React, { useState, useEffect } from 'react'; 
import { firebase } from '../firebase';
import moment from 'moment';
import collatedTasksExists from '../helpers';
export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]) // Array of tasks

  useEffect(() => {
    let unsubscribe = firebase
    .firestore()
    .collection('tasks')
    .where('userid', '==', '1')

    //if we have a selectedProject like music and there are no collated tasks, then unsub
    unsubscribe = selectedProject && !collatedTasksExists(selectedProject) ?
    (unsubscribe = unsubscribe.where('projectid', '==', 'selectedProject')) :
    selectedProject === 'TODAY' 
    ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
    : selectedProject === 'INBOX' || selectedProject === '0'  
    ? (unsubscribe = unsubscribe.where('date', '==', ''))
    : unsubscribe
  }, [selectedProject]) // just run once

}