import React from 'react';
import Loadable from 'react-loadable';

//通用的过场组件
function loadingComponent(props) {
    if (props.error) {
        return <div>Error!</div>;
    } else if (props.pastDelay) {
        return <div Style="width: 100%; height: 300px; line-height: 300px; text-align: center;">Loading...</div>;
    } else {
        return null;
    }
}

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader, loading = loadingComponent) => {
    return Loadable({
        loader,
        loading,
        delay: 300 // 0.3 seconds
    });
}
