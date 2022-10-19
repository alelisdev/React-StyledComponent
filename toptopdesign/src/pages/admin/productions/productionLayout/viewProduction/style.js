import styled from 'styled-components';
import { 
    ManropeBoldCharade18px, 
    ManropeMediumCharade14px 
} from '../../../../../assets/styledMixins';

export const Styles = styled.div`
    .view-production-container{
        margin-top: 30px;
        width: 710px;
        .production-body{
            .production-info{
                ${ManropeBoldCharade18px}
                padding-bottom: 24px;
            }
            .production-name{
                width: 100%;
                display: flex;
                .divider{
                    width: 20px;
                }
                padding-bottom: 24px;
            }
            padding-bottom: 120px;
            border-bottom: 1px solid #EBEAED;
            .word{
                padding-top: 32px;
            }
            
            
        }
        .image-upload{
            .images-info{
                ${ManropeBoldCharade18px}
                padding-bottom: 39px;
            }
            border-top: 1px solid var(--divider);
            padding-top: 48px;
        }
    }
`;