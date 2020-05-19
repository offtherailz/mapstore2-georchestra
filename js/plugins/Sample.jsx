import React from 'react';
import { createPlugin } from '../../MapStore2/web/client/utils/PluginsUtils';
import {Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import { createControlEnabledSelector } from '../../MapStore2/web/client/selectors/controls';


import Message from '../../MapStore2/web/client/components/I18N/Message';

import { setControlProperty } from '../../MapStore2/web/client/actions/controls';

const isEnabled = createControlEnabledSelector('sample');

class SampleComponent extends React.Component {
    render() {
        const style = { position: "absolute", backgroundColor: this.props.color, display: this.props.display, top: "100px", left: "100px", zIndex: 10000000 };
        return <div style={style}>Sample</div>;
    }
}
const Connected = connect((state) => ({
    display: isEnabled(state) ? "block" : "none"
}))(SampleComponent);
export default createPlugin("Sample", {
    component: Connected,
    containers: {
        BurgerMenu: {
            name: 'sample',
            position: 9,
            panel: false,
            tooltip: "sample.tooltip",
            text: <Message msgId="sample.text" />,
            icon: <Glyphicon glyph="heart" />,
            action: () => setControlProperty("sample", "enabled", true)
        }
    }
});
