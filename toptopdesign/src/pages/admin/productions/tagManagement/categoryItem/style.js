import styled from "styled-components";
import { ManropeMediumGray14px, ManropeSemiboldCharade16px } from "../../../../../assets/styledMixins";

export const Styles = styled.div`
    margin: 12px 12px 12px 0px;
    .category-item-container{
        padding: 24px;
        width: 215px;
        height: 98px;
        background-color: var(--white);
        border: 1px solid #EBEAED;
        border-radius: 4px;
        cursor: pointer;
        .category-img{
            width: 32px;
            height: 32px;
            padding-bottom: 16px;
        }
        .category-des{
            padding-top: 16px; 
            .category-name{
                ${ManropeSemiboldCharade16px}
            }
            .category-number{
                ${ManropeMediumGray14px}
            }
        }
    }
`;