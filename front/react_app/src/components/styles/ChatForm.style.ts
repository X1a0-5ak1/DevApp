import styled from "styled-components";

export const HeaderItems = styled.header`
  display: flex;
  justify-content: flex-end;
  background-color: #1f1e33;
  margin: 10px;
  padding: 10px;
  color: white;
`;

export const ActionButton = styled.button`
  width: auto;
  padding: 10px;
  margin-left: 10px;
  background-color: #007bff; /* ボタンの背景色 */
  color: white; /* テキストの色 */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* トランジション効果 */

  &:hover {
    background-color: #0056b3; /* ホバー時の背景色変更 */
  }
`;

export const ErrorMessages = styled.p`
  font-size: 8px;
  color: red;
  display: flex;
`;