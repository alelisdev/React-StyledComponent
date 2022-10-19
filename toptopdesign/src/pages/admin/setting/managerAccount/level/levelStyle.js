import styled from "styled-components";
import { ManropeMediumGray14px, ManropeSemiboldCharade14px, ManropeSemiboldCharade16px } from '../../../../../assets/styledMixins';

export const Styles = styled.div`
    background-color: var(--white);
    width: 661px;
    margin-top: 40px;
    .parent{
        & .MuiFormControlLabel-root span{
            ${ManropeSemiboldCharade14px}
        }
        & .child .MuiFormControlLabel-root span{
            ${ManropeMediumGray14px}
        }
        & .MuiFormControlLabel-root svg{
            color: var(--ocean-blue-pearl);
        }
        & .child .MuiFormControlLabel-root span svg{
            color: var(--ocean-blue-pearl);
        }
        padding: 12px 24px;
        .child{
            padding: 4px 36px;
        }
    }
    .access-level{
        ${ManropeSemiboldCharade16px}
        padding: 24px;
    }
`;