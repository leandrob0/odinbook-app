const checkFriend = (friendsArr, email) => {
    
    for(let friend in friendsArr) {
        if(friend.email === email) {
            return true;
        }
    }

    return false;
}

export default checkFriend;