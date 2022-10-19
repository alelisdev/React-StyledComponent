import styled from "styled-components";

export const Styles = styled.div`
  .close-button {
    position: absolute;
    right: 16px;
    top: 8px;
    background: white;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    box-shadow: -5px 13px 20px rgb(0 0 0 / 8%);
    background: rgba(0, 0, 0, 0.7);
    &:hover {
      color: white;
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;
