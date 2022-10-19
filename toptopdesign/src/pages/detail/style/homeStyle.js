import styled from 'styled-components';
import {
    PptelegrafUltraBoldBlack48px,
    PptelegrafRegularNormalBlueRibbon14,
    PptelegrafRegularNormalBlack14px,
    PptelegrafUltraBoldBlack14px,
    PptelegrafUltraBoldBlack28px,
    PptelegrafUltraBoldBlack40px,
    PptelegrafRegularNormalBlack24px
} from '../../../assets/styledMixins';

export const Styles = styled.div`
    .home-before-container {
        display: flex;
        justify-content: center;
        .home-container{
            width: 100%;
            margin: 36px 0px 0px 0px;
            padding: 0px 22px 20px 22px;
            max-width: 1156px;
            
            .xs-hide{
                display: block;
                @media screen and (max-width: 620px) {
                    display: none;
                }
            }
            .topic-txt{
                ${PptelegrafUltraBoldBlack48px}
                min-height: 106px;
                letter-spacing: 0;
                line-height: 53px;
                padding-bottom: 44px;
            }
            .des-group{
                width: 254px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                min-height: 94px;
                margin-left: auto;
                .des-item{
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    margin-left: auto;
                    .des-img{
                        width: 54px;
                        height: 54px;
                        object-fit: cover;
                    }
                    .des-txt{
                        ${PptelegrafRegularNormalBlack14px}
                        min-height: 15px;
                        letter-spacing: 0;
                    }
                    .des-color-txt{
                        ${PptelegrafRegularNormalBlueRibbon14}
                        min-height: 15px;
                        letter-spacing: 0;
                    }
                    .ms-hover{
                        cursor: pointer;
                    }
                }
            }
            .center-container{
                text-align: center;
                .view-full{
                    ${PptelegrafUltraBoldBlack14px}
                    position: relative;
                    min-height: 15px;
                    display: inline-block;
                    letter-spacing: 0;
                    text-decoration: underline;
                    padding-top: 11px;
                    &:hover {
                        color: #9b9595;
                    }
                }
                .pattern-container{
                    position: absolute;
                    top: 0px
                    left: 0px;
                    margin-top: 20px;
                    overflow-y: auto;
                    max-width: 1090px;
                    height: 196px;
                    box-shadow: 4px -2px 9px 8px rgb(0 0 0 / 2%);
                    background-color: var(--white);
                    border-radius: 16px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    flex-wrap: wrap;
                    padding: 10px 35px 20px 35px;
                    @media screen and (max-width: 800px) {
                        padding: 10px 35px 20px 35px;
                    }
                    @media screen and (max-width: 600px) {
                        padding: 10px 35px 20px 35px;
                    }
                    .pattern-item{
                        width: 140px;
                        display: flex;
                        justify-content: start;
                    }
                    z-index: 100;
                }
            }
            .center-mode{
                display: flex;
                flex-direction: row;
                justify-content: center;
                height: 53px;
                .more-button{
                }
            }
            .all-patterns{
                margin-top: 59px;
            }
            .all-searched-app{
                margin-top: 79px;
                margin-bottom: 64px;
            }
            .keyword-container{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin-top: 66px;
                margin-bottom: 44px;
                position: relative;
                .search-keyword{
                    ${PptelegrafUltraBoldBlack40px}
                    min-height: 42px;
                    margin-left: 10px;
                    letter-spacing: 0;
                    display: inline-block;
                }
            }
        }
    }
    .user-view{
        padding-top: 115px;
        @media screen and (max-width: 800px) {
            display: none;
        }
        .txt{
            ${PptelegrafUltraBoldBlack28px}
            margin-bottom: 24px;
        }
        .user-view-card-root{
            min-width: 313px;
            height: 240px;
            background: #FFFFFF;
            box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
            border-radius: 5px;
            .user-view-card{
                padding: 48px 66px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .img{
                    width: 60px;
                    height: 60px;
                    border-radius: 60px;
                    background-color: var(--mist-gray);
                }
                .card-name{
                    padding-top: 15px;
                    padding-bottom: 5px;
                    ${PptelegrafRegularNormalBlack24px}
                }
                .card-category{
                    background-color: var(--mist-gray);
                    border-radius: 5px;
                    padding: 2px 4px;
                }
            }
        }
        .ml-16{
            margin-left: 16px;
        }
    }
    
`;