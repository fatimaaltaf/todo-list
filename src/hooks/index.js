import React, { useState, useEffect } from 'react'; 
import { firebase } from '../firebase';
import moment from 'moment';
import { collatedTasksExist } from '../helpers';

export const useTasks = selectedProject => {

  const [tasks, setTasks] = useState([]) // Array of tasks
  const [archivedTasks, setArchivedTasks] = useState([])

  // This runs live and keeps checking when user selects a project
  // Calling new tasks all the time
  useEffect(() => {
    let unsubscribe = firebase
    .firestore()
    .collection('tasks')
    .where('userid', '==', '1')

    //if we have a selectedProject like music and there are no collated tasks, then unsub
    unsubscribe = selectedProject && !collatedTasksExist(selectedProject) ?
    (unsubscribe = unsubscribe.where('projectid', '==', 'selectedProject')) :
    selectedProject === 'TODAY' 
    ? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
    : selectedProject === 'INBOX' || selectedProject === '0'  
    ? (unsubscribe = unsubscribe.where('date', '==', ''))
    : unsubscribe

    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }))

      // Set tasks hook 
      setTasks(
        selectedProject === 'NEXT_7'
        ? newTasks.filter(
          task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
          task.archived !== true
        )
        : newTasks.filter(task => task.archived !== true)
      );

      // Give all the tasks that true 
      setArchivedTasks(newTasks.filter(task => task.archived !== false))
    })

    //This will ensure not checking for projects all the time. Only when a new selected project is selected
    return () => unsubscribe();

  }, [selectedProject]) // just run once

  return { tasks, archivedTasks }
}

// For projects hook, we are only calling it once and that is why use .get()
// Will not be polling all the time
export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  // . firebase methods available
  useEffect(() => {
    firebase 
      .firestore() 
      .collection('projects')
      .where('userId', '==', '1')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id, // to delete always need to pass doc id
        }))

        // This prevents infinite loop everytime project changes
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects)
        } 
      })
    }, [projects]) // want to check each time the project is changing 

    return [projects, setProjects];
}

// pass in selected Project, if it does not exist in inbox, today, or next 7 days (collated tasks)
// go get that specific projectid and check the task