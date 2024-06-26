/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import parse from 'html-react-parser';
import { SegmentedControlSingleChoice } from '@deriv-com/quill-ui';
import { contractExplanationData } from './explanation_data.js';
import { getElementById } from '../../../_common/common_functions';
import WebtraderChart from '../trade/charts/webtrader_chart';
import { useContractChange, useMarketChange } from '../../hooks/events';
import Defaults, { PARAM_NAMES } from '../trade/defaults';
import Language from '../../../_common/language';
import Url from '../../../_common/url';
import { localize } from '../../../_common/localize.js';

const Explanation = () => {
    const language = Language.get();
   
    const [formName,setFormName] = useState('');

    const hasContractChanges = useContractChange();

    useEffect(() => {
        const contractObject = {
            matchdiff   : 'digits',
            callputequal: 'risefall',
            callput     : 'higherlower',
        };

        const newFormName = Defaults.get(PARAM_NAMES.FORM_NAME) || 'risefall';
        const finalFormName =  contractObject[newFormName] || newFormName;
       
        setFormName(finalFormName);
       
    },[hasContractChanges]);

    const image_path = Url.urlForStatic(
        `images/pages/trade-explanation/${language}/`
    );

    const images = {
        risefall: {
            image1: 'rises.svg',
            image2: 'falls.svg',
        },
        higherlower: {
            image1: 'higher.svg',
            image2: 'lower.svg',
        },
        touchnotouch: {
            image1: 'touch.svg',
            image2: 'no-touch.svg',
        },
        endsinout: {
            image1: 'ends-between.svg',
            image2: 'ends-outside.svg',
        },
        staysinout: {
            image1: 'stays-between.svg',
            image2: 'goes-outside.svg',
        },
        digits: {
            image1: 'matches.svg',
            image2: 'differs.svg',
        },
        evenodd: {
            image1: 'even.svg',
            image2: 'odd.svg',
        },
        overunder: {
            image1: 'over.svg',
            image2: 'under.svg',
        },
        lookbackhigh: {
            image1: 'high-close.svg',
        },
        lookbacklow: {
            image1: 'close-low.svg',
        },
        lookbackhighlow: {
            image1: 'high-low.svg',
        },
        reset: {
            image1: 'reset-call.svg',
            image2: 'reset-put.svg',
        },
        highlowticks: {
            image1: 'high-tick.svg',
            image2: 'low-tick.svg',
        },
        runs: {
            image1: 'only-ups.svg',
            image2: 'only-downs.svg',
        },
    };

    if (formName){
        return (
            <div className='tab-explanation'>
                {/* ========== Winning ========== */}
                <div id='explanation_winning'>
                    <div id={`winning_${formName}`}>
                        <h3>{localize('Winning the contract')}</h3>
                        {contractExplanationData.winning[formName].content.map(
                            (data, idx) => (
                                <p key={idx}>{parse(data)}</p>
                            )
                        )}
                    </div>
                </div>

                {/* ========== Image ========== */}
                {images[formName] && (
                    <div id='explanation_image'>
                        <div className='gr-row'>
                            <div className='gr-2 hide-mobile' />
                            <div
                                className='gr-4 gr-12-m padding-right'
                                style={{ margin: 'auto' }}
                            >
                                <img
                                    id='explanation_image_1'
                                    className='responsive'
                                    src={`${image_path}${images[formName].image1}?${process.env.BUILD_HASH}`}
                                />
                            </div>
                            <div className='gr-4 gr-12-m padding-left'>
                                <img
                                    id='explanation_image_2'
                                    className='responsive'
                                    src={`${image_path}${images[formName].image2}?${process.env.BUILD_HASH}`}
                                />
                            </div>
                            <div className='gr-2 hide-mobile' />
                        </div>
                    </div>
                )}

                {/* ========== Explain ========== */}
                <div id='explanation_explain' className='gr-child'>
                    <div id={`explain_${formName}`}>
                        <h3>{contractExplanationData.explain[formName].title}</h3>
                        {contractExplanationData.explain[formName].content.map(
                            (data, idx) => (
                                <p key={idx}>{parse(data)}</p>
                            )
                        )}
                        {contractExplanationData.explain[formName].title_secondary && (
                            <h3 className='secondary-title'>
                                {contractExplanationData.explain[formName].title_secondary}
                            </h3>
                        )}
                        {contractExplanationData.explain[formName].content_secondary &&
            contractExplanationData.explain[formName].content_secondary.map(
                (data, idx) => <p key={idx}>{parse(data)}</p>
            )}
                    </div>
                </div>

                {/* ========== Note ========== */}
                {contractExplanationData.note[formName] && (
                    <p className='hint'>
                        <strong>{localize('Note')}: </strong>
                        {contractExplanationData.note[formName].content.map((data, idx) => (
                            <span key={idx}>{parse(data)}</span>
                        ))}
                    </p>
                )}
            </div>
        );
    }

    return <></>;
};

const Graph = () => (
    <div id='tab_graph'>
        <p className='error-msg' id='chart-error' />
        <div id='trade_live_chart'>
            <div id='webtrader_chart' />
        </div>
    </div>
);

const BottomTabs = () => {
    const hasMarketChange = useMarketChange();
    const [selectedTab, setSelectedTab] = useState(1);
    const [showGraph, setShowGraph] = useState(true);

    const renderGraph = (callback) => {
        setTimeout(() => {
            WebtraderChart.cleanupChart();
            WebtraderChart.showChart();

            if (typeof callback === 'function') {
                callback();
            }
        }, 100);
    };

    const resetGraph = () => {
        setShowGraph(false);

        renderGraph(() => {
            setShowGraph(true);
        });
    };

    useEffect(() => {
        resetGraph();
    }, [hasMarketChange]);

    useEffect(() => {
        if (selectedTab === 0) {
            renderGraph();
        }
    }, [selectedTab]);

    return (
        <>
            <div className='quill-container-centered'>
                <SegmentedControlSingleChoice
                    options={[{ label: 'Chart' }, { label: 'Explanation' }]}
                    selectedItemIndex={selectedTab}
                    onChange={(e) => setSelectedTab(e)}
                />
            </div>

            {selectedTab === 0 && showGraph && <Graph />}

            {selectedTab === 1 && (
                <div className='explanation-container'>
                    <Explanation />
                </div>
            )}
        </>
    );
};

export const init = () => {
    ReactDOM.render(
        <BottomTabs />,
        getElementById('trading_bottom_content_tabs')
    );
};

export default init;
