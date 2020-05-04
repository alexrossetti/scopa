import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  /* background: red; */
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  /* border: 2px solid #333; */
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /* background: green; */
  margin: auto;
  width: 300px;
  flex: 2;
`;

export const DeckContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const Deck = styled.div`
  margin: 0px 20px;
  width: 100px;
  height: 150px;
  border: 5px solid darkred;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: red;
  color: #fff;
  text-align: center;
  font-weight: 800;
`;

export const BoardContainer = styled.div`
  border: 2px solid #333;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: green;
  margin: auto;
  width: 300px;
`;
