import styled from "styled-components";
import { 
    ManropeMediumCharade14px, 
    ManropeSemiboldCharade32px,
    ManropeBoldCharade18px,
} from "../../../../assets/styledMixins";

export const Styles = styled.div`
    height: 100%;
    .productions-container{
        display: flex;
        flex-direction: column;
        padding: 20px 0px 0px 32px;
        .productions-header{
            height: 103px;
            width: 100%;
            .first-line{
                ${ManropeMediumCharade14px}
            }
            .second-line{
                ${ManropeSemiboldCharade32px}

            }
        }
        .productions-body{
            display: flex;
            // padding-bottom: 83px;
            .left-panel{
                width: calc(100% - 400px);
                .left-panel-footer{
                    display: flex;
                    padding-top: 36px;
                }
                .ml-24{
                    margin-left: 24px;
                }
            }
            .right-panel{
                width: 400px;
                margin-left: 48px;
                padding: 32px;
                background-color: var(--white);
                .right-panel-header{
                    ${ManropeBoldCharade18px}
                    padding-bottom: 20px;
                }
                .form-group{
                    display: flex;
                    flex-direction: column;
                    .productions-btn{
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        height: 51px;
                        border-bottom: 1px solid #EBEAED;
                        .active{
                            color: var(--ocean-blue-pearl);
                        }
                        .icon{
                            margin-left: auto;
                        }
                    }
                    .disable{
                        background-color: #e6e5e9;
                    }
                }
            }
        }
        .label{
            ${ManropeMediumCharade14px}
            color: var(--admin-black);
            padding-bottom: 10px;
        }
    }
`;