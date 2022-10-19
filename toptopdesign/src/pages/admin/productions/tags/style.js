import styled from "styled-components";
import {
    ManropeNormalCharade20px,
    ManropeExtraBoldCharade36px,
    ManropeSemiboldCharade36px
} from '../../../../assets/styledMixins';
export const Styles = styled.div`
    padding: 20px 32px;
    .all-users-header{
        display: flex;
        padding-bottom: 32px;
        border-bottom: 1px solid #EBEAED;
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


export const ForgotStyle = styled.div`
    margin: 0px;
    position: relative;
    width: 866px;
    padding: 62px 139px 30px 139px;
    height: 365;
    .dialog-container{
        overflow: hidden;
        border-radius: 24px;
        background-color: white;
        .content{
            padding: 64px 125px 40px 125px;
            height: 100%;
            border: 1px solid var(--mist-gray);
            border-radius: 24px;
            .header{
                ${ManropeExtraBoldCharade36px}
                min-height: 36px;
                min-width: 243px;
                text-align: center;
                letter-spacing: 0;
                line-height: 36px;
                white-space: nowrap;
            }
            .body{
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 13px;
                .des-txt{
                    padding-bottom: 22px;
                    text-align: center;
                    ${ManropeNormalCharade20px}
                }
            }
            .footer{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        }
    }
`;