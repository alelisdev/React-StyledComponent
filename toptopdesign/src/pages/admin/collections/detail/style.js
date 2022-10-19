import styled from "styled-components";
import { 
    ManropeMediumCharade14px, 
    ManropeSemiboldCharade32px,
    ManropeNormalCharade20px,
    ManropeExtraBoldCharade36px,
} from "../../../../assets/styledMixins";

export const Styles = styled.div`
    .collection-detail-container{
        display: flex;
        flex-direction: column;
        padding: 20px 32px 0px 32px;
        .collection-detail-header{
            height: 103px;
            .first-line{
                ${ManropeMediumCharade14px}
            }
            .second-line{
                ${ManropeSemiboldCharade32px}

            }
        }
        .action-group{
            display: flex;
            margin-left: auto;
        }
        .collection-detail-body{
            padding-top: 32px;
        }
    }
`;

export const ConfirmStyle = styled.div`
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