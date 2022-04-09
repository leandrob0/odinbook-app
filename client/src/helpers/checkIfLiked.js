export const checkIfLiked = (array, id) => {
    let liked = false;

    for(let i = 0; i < array.length; i++) {
        if(array[i]._id === id) {
            liked = true;
            break;
        }
    }

    return liked;
}