var addFriendButtonDOM = document.getElementById('addFriendButton');
console.log(addFriendButtonDOM);
addFriendButtonDOM.addEventListener('click', (e) => {
    console.log(e.target);
});