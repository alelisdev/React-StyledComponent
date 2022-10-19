import styled from "styled-components";
import { ManropeSemiboldCharade16px } from "../../../../assets/styledMixins";

export const Styles = styled.div`
    .monetization{
        height: 815px;
        background-color: var(--white);
        margin-top: 32px;
        padding: 24px 72px 32px 24px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .monetization-item{
            width: 491px;
            height: 132px;
            .title{
                ${ManropeSemiboldCharade16px}
            }
            .image{
                width: 100%;
                height: 96px;
                border: 1px solid var(--divider);
            }
        }
    }
    .left-panel-footer{
        display: flex;
        margin-top: 32px;
        padding-top: 36px;
        border-top: 1px solid var(--divider);
    }
    .ml-24{
        margin-left: 24px;
    }
`;