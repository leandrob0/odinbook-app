const checkFriend = (friendsArr, id) => {
    
    for(let i = 0; i < friendsArr.length; i++) {
        if(friendsArr[i]._id === id) {
            return true;
        }
    }

    return false;
}

export default checkFriend;