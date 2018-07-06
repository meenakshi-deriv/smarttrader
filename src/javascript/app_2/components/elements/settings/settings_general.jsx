import React        from 'react';
import PropTypes    from 'prop-types';
import SettingsControl from './settings_control.jsx';
import { connect }  from '../../../store/connect';
import { get as getLanguage } from '../../../../_common/language';

class GeneralSettings extends React.Component {
    render() {
        const curr_language = getLanguage();
        return (
            <div className='tab-content'>
                <div className='general-setting-container'>
                    <SettingsControl
                        name='dark mode'
                        to_toggle={this.props.is_dark_mode}
                        toggle={this.props.toggleDarkMode}
                    />
                    <SettingsControl
                        name='language'
                        onClick={this.props.showLanguage}
                    >
                        <i className={`flag ic-flag-${(curr_language || 'en').toLowerCase()}`} />
                    </SettingsControl>
                </div>
            </div>
        );
    }
};

GeneralSettings.propTypes = {
    showLanguage  : PropTypes.func,
    is_dark_mode  : PropTypes.bool,
    toggleDarkMode: PropTypes.func,
};

export default connect(
    ({ ui }) => ({
        showLanguage  : ui.showLanguageDialog,
        is_dark_mode  : ui.is_dark_mode_on,
        toggleDarkMode: ui.toggleDarkMode,
    })
)(GeneralSettings);
