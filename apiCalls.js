import {showStatus} from './errorHandling'

// Your fetch requests will live here
const base = 'http://localhost:3000/api/v1/'

const checkForError = async (response) => {
  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.errors || 'Unknown error occurred');
  }
}

function fetchData(endpoint) {
  return fetch(base + endpoint)
    .then(response => checkForError(response))  
    .catch(error => {
      console.log(error)
      showStatus(error, false)
    })
}

function postData(endpoint, body) {
  return fetch(base + endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => checkForError(response))  
    .catch(error => {
      console.log(error)
      showStatus(error, false)
    })
}

function deleteData(endpoint) {
  return fetch(base + endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  })  
  .catch(error => {
    console.log(error)
    showStatus('Failed to delete merchant. Try again later.', false)
  })
}

function editData(endpoint, body) {
  return fetch(base + endpoint, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => checkForError(response))  
    .catch(error => {
      console.log(error)
      showStatus(error, false)
    })
}

export {
  fetchData,
  postData,
  deleteData,
  editData
}

