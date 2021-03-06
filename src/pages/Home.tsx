import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { State } from './QuizSession'

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [storedQuizItem, setStoredQuizItem] = useLocalStorage<State[] | []>('quiz', [])
  const [state, setState] = useState<State | null>(null)

  useEffect(() => {
    if (storedQuizItem.length > 0) {
      setState(storedQuizItem[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <BoxWrapper>
        <Link to='/wordlist' className='link'>
          <Box>π λ¨μ΄ λͺ©λ‘ λ³΄κΈ°</Box>
        </Link>
        <Link to='/quiz' className='link'>
          <Box>π‘ ν΄μ¦ λ³΄κΈ°</Box>
        </Link>
      </BoxWrapper>
      {state && (
        <ResultBox>
          <div>π ν΄μ¦ κ²°κ³Ό!</div>
          <div>π₯ μλ£ μ¬λΆ: {state.isCompleted ? 'μλ£' : 'λ―Έμλ£'}</div>
          <div>π λ§μ κ°μ : {state.correctCount}</div>
          <div>π€’ νλ¦° κ°μ : {state.inCorrectCount}</div>
        </ResultBox>
      )}
    </>
  )
}

const BoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  .link {
    text-decoration: none;
    color: #ff8450;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  cursor: pointer;
  background-color: #fff;
  width: 300px;
  height: 250px;
  left: calc(50% - 300px);
  top: 0px;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  border-radius: 4px;
  flex: 1;
  order: 1;
  font-size: 18px;
  font-weight: 700;

  &:hover {
    background-color: #ffe0d3;
    transition: all 0.35s ease;
  }
  &:not(:hover) {
    background-color: #fff;
    transition: all 0.35s ease;
    color: #000;
    transition: all 0.35s ease;
  }
`
const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 250px;
  padding: 24px;
  margin: 0 auto;
  gap: 12%;
  background-color: #fff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  flex: 1;
  order: 1;
  font-size: 18px;
  font-weight: 700;

  &:hover {
    background-color: #ffe0d3;
    transition: all 0.35s ease;
  }
  &:not(:hover) {
    background-color: #fff;
    transition: all 0.35s ease;
    color: #000;
    transition: all 0.35s ease;
  }
`
