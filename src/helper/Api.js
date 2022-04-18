import axios from "axios";


const BASE_URL = 'http://127.0.0.1:8000/api';

const getUsers = async () => {
    var usersData = [];
    let users = []
    fetch(`${BASE_URL}/users`).then((response) => {
        response.json()
    }).then((response) => {
        users = response
    })
    console.log(users)

    return users;
}




export {getUsers}