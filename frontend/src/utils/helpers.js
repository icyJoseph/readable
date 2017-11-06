// Changes first letter of a word from lower case to upper case. Returns a new word.
export const capitalizer = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
