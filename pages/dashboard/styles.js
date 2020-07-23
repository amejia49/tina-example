import styled from 'styled-components';
import { theme } from '@cnnprivate/design-system';

export const PageHeader = styled.h1`
    font-family: ${theme.businessFont};
    font-size: 48px;

    @media screen and (max-width: 764px) {
        font-size: 42px;
    }
`;