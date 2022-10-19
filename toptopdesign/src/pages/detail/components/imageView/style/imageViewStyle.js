import styled from "styled-components";
import {
    PptelegrafUltraBoldCharade28px,
    PptelegrafRegularNormalBlack20px,
    PptelegrafRegularNormalGray14px,
    PptelegrafRegularNormalBlack17px,
    PptelegrafUltraBoldBlack36px,
    PptelegrafRegularNormalGray16px
} from '../../../../../assets/styledMixins';


export const Styles = styled.div`
    .image-container{
        position: relative;
        height: 473px;
        padding: 10px;
        box-shadow: 4px -2px 9px 8px rgb(0 0 0 / 2%);
        background-color: var(--white);
        border-radius: 16px;
        @media screen and (max-width: 892px) {
            height: 596px;
        }
        @media screen and (max-width: 600px) {
            height: 275px;
        }
        .favourite{
            position: absolute;
            top: 33px;
            right: 18px;
            .icon{
                width: 20px;
                height: 20px;
            }
        }
        .image-viewer{
            padding: 50px 20px 20px 20px;
            width: 80%;
            height: 80%;
            object-fit: cover;
        }
    }
`;

export const ViewCollectionDlgStyle = styled.div`
    margin: 0px;
    position: relative;
    padding-top: 30px;
    background-color: rgba(0, 0, 0, 0.7);
    .dialog-container{
        height: 917px;
        width: 1400px;
        overflow-x: hide;
        overflow-y: auto;
        border-radius: 24px;
        background-color: white;
        display: flex;
        @media screen and (max-width: 1200px) {
            width: 1000px;
        }
        @media screen and (max-width: 900px) {
            width: 800px;
        }
        @media screen and (max-width: 800px) {
            width: 600px;
            flex-direction: column;
        }
        @media screen and (max-width: 600px) {
            width: 344px;
            flex-direction: column;
        }
        
        .left-panel{
            width: calc(100% - 340px);
            @media screen and (max-width: 800px) {
                width: 100%;
            }
        }
        .right-panel{
            width: 340px;
            @media screen and (max-width: 800px) {
                width: 100%;
            }
            .header{
                border-bottom: 1px solid #E8E8E8;
                .txt{
                    ${PptelegrafUltraBoldBlack36px}
                    padding: 86px 24px 24px 24px;
                }
            }
            .body{
                padding: 24px 24px 34px 24px;
                .date-container{
                    .txt{
                        ${PptelegrafRegularNormalGray14px}
                    }
                    .date{
                        padding-top: 16px;
                        ${PptelegrafRegularNormalBlack17px}
                    }
                }
                .version-container{
                    padding-top: 28px;
                    .txt{
                        ${PptelegrafRegularNormalGray14px}
                    }
                    .version{
                        padding-top: 16px;
                        ${PptelegrafRegularNormalBlack17px}
                        margin-right: 32px;
                    }
                }
                .category-container{
                    padding-top: 28px;
                    .txt{
                        ${PptelegrafRegularNormalGray14px}
                    }
                    .category{
                        padding-top: 16px;
                        ${PptelegrafRegularNormalBlack17px}
                        margin-right: 24px;
                    }
                }
                .color-container{
                    padding-top: 28px;
                    .txt{
                        ${PptelegrafRegularNormalGray14px}
                    }
                    .left-radius{
                        width: 42px;
                        height: 30px;
                        background: #00C7A3;
                        border-radius: 15px 0px 0px 15px;
                    }
                    .right-radius{
                        width: 42px;
                        height: 30px;
                        background: #00C7A3;
                        border-radius: 15px 0px 0px 15px;
                        transform: matrix(-1, 0, 0, 1, 0, 0);
                    }
                }
                .area{
                    width: 290px;
                    height: 290px;
                    background: rgba(196, 196, 196, 0.2);
                    border: 1px solid #808080;
                    box-sizing: border-box;
                    border-radius: 5px;
                }
            }
            
        }
    }
`;
