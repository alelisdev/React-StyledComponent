import styled from "styled-components";
import { ManropeSemiboldCharade16px, ManropeSemiboldCharade18px } from "../../../../assets/styledMixins";

export const Styles = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    .integration-container{
        width: 604px;
        height: 580px;
        margin-top: 32px;
        background-color: var(--white);
        padding: 24px;
        .manro-semi-18{
            ${ManropeSemiboldCharade18px}
        }
        .btn-group{
            padding: 48px 0px 24px 0px;
            display: flex;
            justify-content: space-between;
            .btn{
                display: flex;
                padding: 0px 16px;
                width: 262px;
                height: 72px;
                background: var(--white);
                border: 1px solid var(--divider);
                display: flex;
                align-items: center;
                & span{
                    padding-left: 16px;
                    ${ManropeSemiboldCharade16px}
                }
                & p{
                    margin-left: auto;
                    color: var(--ocean-blue-pearl);
                    font-family: Arial;
                    font-size: 10px;
                    font-style: italic;
                    font-weight: 400;
                }
            }
        }
    }
`;