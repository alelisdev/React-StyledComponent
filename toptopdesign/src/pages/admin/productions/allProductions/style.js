import styled from "styled-components";
import {
    ManropeSemiboldCharade36px
} from '../../../../assets/styledMixins';
export const Styles = styled.div`
    padding: 20px 32px;
    .all-productions-header{
        display: flex;
        .topic{
            ${ManropeSemiboldCharade36px}
        }
        .action-group{
            display: flex;
            align-items: center;
            margin-left: auto;
        }
    }
`;