import styled from 'styled-components';
import { ManropeSemiboldCharade32px } from '../../../../assets/styledMixins';

export const Styles = styled.div`
    .category-container{
        display: flex;
        flex-direction: column;
        padding: 20px 0px 0px 32px;
        .category-header{
            height: 103px;
            width: 100%;
            display: flex;
            align-items: center;
            ${ManropeSemiboldCharade32px}
        }
        .category-card-container{
            display: flex;
            flex-wrap: wrap;
            padding-top: 32px;
        }
    }
`;