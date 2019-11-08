import { connect } from "react-redux";


export const add = function (wallet) {
    return {
        type: 'add',
        wallet: wallet || { a: '1', b: '2' }
    }
}

const mapDispatchToProps = { add }


/**
 * 
 * 参数一: store 中的  state
 * 参数二: action 方法
 * 
 * 
 * 
 */
export default connect(
    state => state.wallet,
    mapDispatchToProps
    // dispatch => bindActionCreators(action, dispatch)
)