// Imports
// ------------
import React, { useState } from 'react';
import Input from '../Input';
import Button from '@parts/Button';
import Link from '@parts/Link';
import Icon from '@icon';
import Visualisation from '@parts/Visualisation';
import ProgressBar from './Progress';
import Logs from './Logs';
import { Grid } from '@waffl';
import { useBreakpoint } from '@parts/Helpers/useBreakpoint';

// Styles
// ------------
import {
    Col,
    StickyJacket,
    Header,
    Title,
    Switch,
    Tab,
    Basic,
    Block,
    StatsItem,
    FieldGroup,
    ButtonJacket,
    LinkGroup,
    CelLink,
    Terminal,
    DataJacket,
    LogJacket,
    LogScroller,
} from './styles';

// Component
// ------------
const StatusBoard = ({
    status,
    stats,
    handleInput,
    handleReload,
    eventData,
}) => {
    // NOTE • Breakpoints
    const bp = useBreakpoint();

    // NOTE • States
    const [tab, setTab] = useState(1);

    // NOTE • Handlers
    const handleTab = (tab) => () => setTab(tab);

    return (
        <>
            <Grid $noPadding>
                <Col $small="1/3" $medium="1/7" $large="1/7">
                    <StickyJacket>
                        <Grid $noPadding>
                            <Col $small="1/3" $medium="1/7" $large="1/13">
                                <Header>
                                    <Title $dark>{status}</Title>
                                    <Switch>
                                        <Tab $isActive={tab === 1} onClick={handleTab(1)} disabled={tab === 1}>Basic</Tab>
                                        <Tab $isActive={tab === 2} onClick={handleTab(2)} disabled={tab === 2}>Advanced</Tab>
                                    </Switch>
                                </Header>
                            </Col>
                        </Grid>

                        {!bp.large && (
                            <Grid $noPadding>
                                <Col $small="1/3" $medium="1/7" $large="7/13">
                                    <Visualisation data={stats} />
                                </Col>
                            </Grid>
                        )}

                        <Grid $noPadding $isCenter>
                            {tab === 1 && (
                                <Col $small="1/3" $medium="1/7" $large="1/13" style={{ height: 'auto' }}>
                                    <Basic>
                                        <Block>
                                            <div>
                                                <em>Backwards syncing:</em>
                                            </div>
                                            <div>
                                                <ProgressBar ranges={stats.storedRanges} max={stats.networkHeadHeight} window={stats.approxSyncingWindowSize} isBig />
                                            </div>
                                        </Block>

                                        <Block>
                                            <div>
                                                <em>Block Height:</em>
                                                <span className="isbig">{stats.networkHeadHeight}</span>
                                            </div>
                                            <CelLink href={`https://celenium.io/block/` + stats.networkHeadHeight} rel="noopener noreferrer" target="_blank">
                                                <Icon type="logoCelenium" />
                                                <span>View in Celenium</span>
                                            </CelLink>
                                        </Block>
                                    </Basic>
                                </Col>
                            )}

                            {tab === 2 && (
                                <Col $small="1/3" $medium="1/7" $large="1/13">
                                    <Terminal>
                                        <DataJacket>
                                            <div>
                                                <div>
                                                    <em>PeerId:</em>
                                                    <span>{stats.peerId}</span>
                                                </div>
                                            </div>
                                            <div className="break-small">
                                                <div>
                                                    <em>Sync headers:</em>
                                                </div>
                                                <ProgressBar ranges={stats.storedRanges} max={stats.networkHeadHeight} window={stats.approxSyncingWindowSize} />
                                            </div>
                                            <div className="break-small">
                                                <div>
                                                    <em>Sync window:</em>
                                                </div>
                                                <span>
                                                    {Math.max(stats.networkHeadHeight, 0)}-{Math.max(stats.networkHeadHeight - stats.approxSyncingWindowSize, 0)}
                                                </span>
                                            </div>
                                            <div className="break-small">
                                                <div>
                                                    <em>Block Height:</em>
                                                    <span>{stats.networkHeadHeight}</span>
                                                </div>
                                                <CelLink href={`https://celenium.io/block/` + stats.networkHeadHeight} rel="noopener noreferrer" target="_blank" $isDark>
                                                    <Icon type="logoCelenium" />
                                                    <span>View in Celenium</span>
                                                </CelLink>
                                            </div>
                                            <div>
                                                <div>
                                                    <em>Hash:</em>
                                                    <span>{stats.networkHeadHash}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <em>Data square size:</em>
                                                    <span>{stats.networkHeadDataSquare}</span>
                                                </div>
                                            </div>
                                            <hr />
                                        </DataJacket>
                                        <LogJacket>
                                            <Title>Event logs</Title>
                                            <LogScroller>
                                                <Logs data={eventData} />
                                            </LogScroller>
                                        </LogJacket>
                                    </Terminal>
                                </Col>
                            )}
                        </Grid>
                    </StickyJacket>
                </Col>

                {bp.large && (
                    <Col $small="1/3" $medium="1/7" $large="7/13" $isCenter>
                        <Visualisation data={stats} />
                    </Col>
                )}
            </Grid>
            <Grid $noPadding>
                <Col $small="1/3" $medium="1/7" $large="1/13">
                    <Grid $noPadding>
                        <Col $small="1/3" $medium="1/7" $large="1/13">
                            <ButtonJacket>
                                <Button icoL icon="back" label="Restart" onClick={handleReload} />
                                <LinkGroup>
                                    <Link icon="mint" label="Mint NFT" link="http://www.google.com" disabled />
                                    <Link icon="github" link="https://github.com/eigerco/lumina" rel="noopener noreferrer" />
                                    <Link icon="eiger" link="https://www.eiger.co/" rel="noopener noreferrer" />
                                </LinkGroup>
                            </ButtonJacket>
                        </Col>
                    </Grid>
                </Col>
            </Grid>
        </>
    );
}

export default StatusBoard;
