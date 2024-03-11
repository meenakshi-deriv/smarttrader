import React from 'react';
import Notification from '../components/notification.jsx';
import MobileMenu from '../components/mobile_menu.jsx';

const WalletHeader = () => (
    <div className='wallet__header' id='wallet__header'>
        <div id='platform__dropdown' className='platform__dropdown'>
            <div id='platform__list' className='platform__dropdown-list' />
        </div>
        <div className='wallet__header-menu-items'>
            <div className='wallet__header-menu-left'>
                <img id='header__hamburger' className='header__hamburger mobile-show' />
                <div className='wallet__header-menu-item wallet__header-menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-deriv-com' target='_blank' rel='noopener noreferrer' href='https://deriv.com'>
                        <img className='deriv-com-logo' />
                    </a>
                </div>
                <div className='wallet__header-menu-item wallet__header-menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-wallet-apps'>
                        <img className='wallet-apps-logo' />
                    </a>
                </div>
                <div id='platform__switcher' className='header__menu-item platform__switcher mobile-hide'>
                    <img className='header__logo' />
                    <img id='platform__switcher-expand' className='header__icon header__expand' />
                </div>
                <div className='header__menu-links client_logged_in invisible mobile-hide'>
                    <a className='url-reports-positions header__menu-links-item'>
                        <span>
                            <img className='header__icon-text reports-icon' />
                            {it.L('Reports')}
                        </span>
                    </a>
                </div>
            </div>
            <div id='wallet__header-menu-right' className='wallet__header-menu-right client_logged_in invisible'>
                <Notification />
                <a className='url-account-details header__account header__menu-item mobile-hide'>
                    <img className='header__icon-button' id='header__account-settings' />
                </a>
                <div className='header__divider mobile-hide' />
                <div className='header__menu-item header__menu-acc' id='wallet_switcher'>
                    <div className='header__acc-info'>
                        <img src='/images/pages/header/wallets/ic-wallets-deriv-apps.svg' className='mobile-hide' />
                        <img id='header__acc-icon-mobile-currency' className='mobile-show header__acc-icon-mobile-currency' />
                        <img id='header__acc-icon--currency' className='header__acc-icon--currency mobile-hide' />
                        <span className='header__acc-display'>
                            <div id='header__acc-balance' className='header__acc-balance header__acc-balance-wallet' />
                        </span>
                        <img id='header__acc-expand' className='header__icon header__expand' />
                    </div>
                    <div className='wallet__switcher' id='wallet__switcher'>
                        <div id='wallet__switcher-dropdown' className='wallet__switcher-dropdown'>
                            <div className='wallet__switcher-header'>
                                <h4 className='wallet__switcher-header--text'>
                                    {it.L('Deriv Apps accounts')}
                                </h4>
                                <img id='wallet__switcher-close' className='btn__close mobile-show' />
                            </div>
                            <div className='wallet__switcher-accounts-container'>
                                <div id='wallet__switcher-accounts-list' className='wallet__switcher-accounts-list' />
                            </div>
                            <div className='wallet__footer-wrapper'>
                                <div className='wallet__switcher-accounts-btn-container'>
                                    <a id='wallet__switcher-accounts-btn' className='url-wallets-deposit btn btn--primary wallet__switcher-accounts-btn mobile-show'>
                                        {it.L('Manage funds')}
                                    </a>
                                </div>
                                <div className='wallet__switcher-footer'>
                                    <div>
                                        {it.L('Looking for CFDs? Go to Trader\'s hub')}
                                    </div>
                                    <a className='url-wallet-apps'>
                                        <img src='/images/pages/header/ic-chevron-right.svg' />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className='url-wallets-deposit btn btn--primary header__deposit mobile-hide'>{it.L('Manage funds')}</a>
            </div>
        </div>
        <MobileMenu />
    </div>
);

export default WalletHeader;
