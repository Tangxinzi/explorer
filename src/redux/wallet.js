const wallet = (state = {}, action) => {
    let wallet = action.wallet
    switch (action.type) {
        case 'add':
            return {
                ...wallet
            }
        default:
            return {
                wallet: '空的钱包'
            }
    }
}
export default wallet