import styled from 'styled-components';

export const Styles = styled.div`
    .search-box{
        position: relative;
        .search-input{
            font-family: var(--font-family-manrope);
            box-shadow: 4px -2px 9px 8px rgb(0 0 0 / 2%);
            background-color: var(--white);
            border: none;
            outline: none;
            height: 48px;
            display: flex;
            padding-left: 44px;
            justify-content: flex-end;
            align-items: center;
            width: calc(100% - 47px);
            background-color: var(--white);
            border-radius: 4px;
            &::placeholder {
              color: #8b939e;
              font-family: var(--font-family-manrope);
            }
            @media screen and (max-width: 650px) {
                width: 100%;
            }
            &:focus {
                border: none;
            }
          }
          .error {
            border: 1px solid #db5940;
          }
          .search-btn{
            position: absolute;
            left: 19px;
            top: 14px;
          }
        }
    }
`;