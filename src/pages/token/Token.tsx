import { Suspense, lazy } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { STRING_KEYS } from '@/constants/localization';
import { TokenRoute } from '@/constants/routes';

import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useStringGetter } from '@/hooks/useStringGetter';

import { layoutMixins } from '@/styles/layoutMixins';

import { Icon, IconName } from '@/components/Icon';
import { LoadingSpace } from '@/components/Loading/LoadingSpinner';
import { NavigationMenu } from '@/components/NavigationMenu';
import { WithSidebar } from '@/components/WithSidebar';

import { testFlags } from '@/lib/testFlags';

const RewardsPage = lazy(() => import('./rewards/RewardsPage'));
const StakingPage = lazy(() => import('./staking/StakingPage'));
const GovernancePage = lazy(() => import('./Governance'));

const Token = () => {
  const { isTablet } = useBreakpoints();
  const stringGetter = useStringGetter();

  const routesComponent = (
    <Suspense fallback={<LoadingSpace id="token-page" />}>
      <Routes>
        <Route path={TokenRoute.TradingRewards} element={<RewardsPage />} />
        <Route path={TokenRoute.StakingRewards} element={<StakingPage />} />
        <Route path={TokenRoute.Governance} element={<GovernancePage />} />
        <Route path="*" element={<Navigate to={TokenRoute.TradingRewards} replace />} />
      </Routes>
    </Suspense>
  );

  return (
    <WithSidebar
      sidebar={
        isTablet || testFlags.enableStaking ? null : (
          <$SideBar>
            <$NavigationMenu
              items={[
                {
                  group: 'views',
                  groupLabel: stringGetter({ key: STRING_KEYS.VIEWS }),
                  items: [
                    {
                      value: TokenRoute.TradingRewards,
                      slotBefore: (
                        <$IconContainer>
                          <Icon iconName={IconName.Token} />
                        </$IconContainer>
                      ),
                      label: stringGetter({ key: STRING_KEYS.TRADING_REWARDS }),
                      href: TokenRoute.TradingRewards,
                    },
                    {
                      value: TokenRoute.StakingRewards,
                      slotBefore: (
                        <$IconContainer>
                          <Icon iconName={IconName.CurrencySign} />
                        </$IconContainer>
                      ),
                      label: stringGetter({ key: STRING_KEYS.STAKING_REWARDS }),
                      href: TokenRoute.StakingRewards,
                      tag: stringGetter({ key: STRING_KEYS.NEW }),
                    },
                    {
                      value: TokenRoute.Governance,
                      slotBefore: (
                        <$IconContainer>
                          <Icon iconName={IconName.Governance} />
                        </$IconContainer>
                      ),
                      label: stringGetter({ key: STRING_KEYS.GOVERNANCE }),
                      href: TokenRoute.Governance,
                    },
                  ],
                },
              ]}
            />
          </$SideBar>
        )
      }
    >
      {routesComponent}
    </WithSidebar>
  );
};
export default Token;

const $SideBar = styled.div`
  ${layoutMixins.flexColumn}
  justify-content: space-between;

  height: 100%;
`;

const $NavigationMenu = styled(NavigationMenu)`
  padding: 0.5rem;
  padding-top: 0;
`;

const $IconContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-layer-4);
  border-radius: 50%;
  margin-left: -0.25rem;
`;
