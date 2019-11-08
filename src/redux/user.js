const user = (state = {}, action) => {
    let user = action.user
    switch (action.type) {
        case 'add':
            return {
                ...user
            }
        default:
            return {
                user: '空的用户对象'
            }
    }
}
export default user