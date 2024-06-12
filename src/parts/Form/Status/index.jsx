// Imports
// ------------
import React from 'react';
import Input from '../Input';
import Button from '@parts/Button';
import Link from '@parts/Link';
import Icon from '@icon';
import Visualisation from '@parts/Visualisation';
import ProgressBar from './Progress';
import { Grid } from '@waffl';
import { useBreakpoint } from '@parts/Helpers/useBreakpoint';

// Styles
// ------------
import { Col, StickyJacket, Header, Title, Progress, StatsItem, FieldGroup, ButtonJacket, LinkGroup, CelLink } from './styles';

// Component
// ------------
const StatusBoard = ({
    status,
    stats,
    handleInput,
    handleReload,
}) => {
    // NOTE • Breakpoints
    const bp = useBreakpoint();

    return (
        <>
            <Grid $noPadding>
                <Col $small="1/3" $medium="1/7" $large="1/7">
                    <StickyJacket>
                        <Grid $noPadding>
                            <Col $small="1/3" $medium="1/7" $large="1/13">
                                <Header>
                                    <Title $dark>Status</Title>
                                    <Progress>
                                        <Icon type="logoGrad" />
                                        <span>{status}&hellip;</span>
                                    </Progress>
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

                        <Grid $noPadding>
                            <Col $small="1/3" $medium="1/7" $large="1/13">
                                <StatsItem>
                                    <label>
                                        <span>PeerId:</span>
                                        <Input name="peerId" value={stats.peerId} onChange={(e) => handleInput(e)} placeholder="..." light />
                                    </label>
                                </StatsItem>
                                <StatsItem>
                                    <label>
                                        <span>
                                            <em>Synchronizing headers:</em>
                                            <ProgressBar data={stats.syncInfo} />
                                        </span>
                                        <Input name="syncInfo" value={stats.syncInfo} onChange={(e) => handleInput(e)} placeholder="..." light />
                                    </label>
                                </StatsItem>
                            </Col>
                        </Grid>

                        <Grid $noPadding>
                            <Col $small="1/3" $medium="1/7" $large="1/13">
                                <FieldGroup>
                                    <StatsItem>
                                        <label>
                                            <span>
                                                <em>Block Height:</em>
                                                <CelLink href={`https://celenium.io/block/` + stats.networkHeadHeight} rel="noopener noreferrer" target="_blank">
                                                    <Icon type="logoCelenium" />
                                                    <span>View in Celenium</span>
                                                </CelLink>
                                            </span>
                                            <Input name="networkHeadHeight" value={stats.networkHeadHeight} onChange={(e) => handleInput(e)} placeholder="..." light />
                                        </label>
                                    </StatsItem>
                                    {/* <StatsItem>
                                        <label>
                                            <span>Data square size:</span>
                                            <Input name="networkHeadDataSquare" value={stats.networkHeadDataSquare} onChange={(e) => handleInput(e)} placeholder="..." light />
                                        </label>
                                    </StatsItem> */}
                                </FieldGroup>
                                <StatsItem>
                                    <label>
                                        <span>Hash:</span>
                                        <Input name="networkHeadHash" value={stats.networkHeadHash} onChange={(e) => handleInput(e)} placeholder="..." light />
                                    </label>
                                </StatsItem>
                            </Col>
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
                                    <Link icon="celestia" label="Learn more" link="https://celestia.org/run-a-light-node/" rel="noopener noreferrer" />
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