import React from 'react';
import {firebase} from '../../firebase'

// Pass in task id into, once checkbox is clicked, archived task
export const Checkbox = (id) => {

  const archiveTask = () => {
    firebase
    .firestore()
    .collection('tasks')
    .doc(id) // imperative
      .update({
        archived: true
      })
  }

  return (
    <div 
      className="checkbox-holder" 
      datatest-id="checkbox-action" 
      onClick={() => archiveTask()}
    >
      <span className="checkbox"/>
    </div>
  )
}