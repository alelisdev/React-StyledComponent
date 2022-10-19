import styled from "styled-components";
import { ManropeNormalCharade14px, ManropeSemiboldCharade14px } from "../../../../../../assets/styledMixins";

export const Styles = styled.div`
    .image-tag-container{
        padding-bottom: 28px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        .image-preview{
            background-color: var(--white);
            width: 152px;
            height: 24px;
            padding: 12px 16px;
            display: flex;
            .image{
                width: 24px;
                object-fit: cover;
            }
            .image-name{
                ${ManropeSemiboldCharade14px}
                padding-left: 8px;
            }  
        }
        .tag-container{
            width: 454px;
            height: 48px;
            background-color: var(--white);
        }
        .manro-normal-14{
            ${ManropeNormalCharade14px}
        }
    }
`;