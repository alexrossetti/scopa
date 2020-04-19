import React from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../styles';

export default function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      hello world
    </AppContainer>
  );
}

const AppContainer = styled.div``;
