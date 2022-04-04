import styled from 'styled-components'

export const ParentContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

@media screen and (max-width: 764px){
  flex-direction: column;
}
`

export const BtnGroup = styled.div`
@media screen and (max-width: 764px){
  order: 0;
  display: flex;
}
`

export const OuterBox = styled.div`
width: 600px;
height: 600px;
background: #80808099;
display: flex;
flex-wrap: wrap;
position: relative;

@media screen and (max-width: 764px){
  width: 100vw;
  height: 100vw;
  max-height: 80vh;
  max-width: 80vh;
}
`

export const ScoreContainer = styled.div`
display: flex;
flex-direction: column;
background-color: grey;
margin: 10px;
color: white;
border-radius: 5px;
justify-content: center;
align-items: center;
`
export const ActualScore = styled.div`
  text-align: center;
  padding: 20px 5px;
`
export const GameBtn = styled.button`
  text-align: center;
  padding: 20px 5px;
`
