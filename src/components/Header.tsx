import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { BiArrowBack } from 'react-icons/bi'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <HeaderComponent>
      {location.pathname !== '/' && (
        <button onClick={() => navigate('/')}>
          <BiArrowBack size='40' fill='#ff8450' />
        </button>
      )}
      <p>🧻 다풀자 영단어</p>
    </HeaderComponent>
  )
}
const HeaderComponent = styled.header`
  width: 100%;
  height: 56px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2% 1%;
  position: relative;
  top: 0;
  left: 0;
  border-radius: 10px;
  button {
    position: absolute;
    color: #5b5555;
    top: 50%;
    left: 5%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    width: 50px;
    height: 50px;
    font-size: 22px;
    font-weight: 500;
  }
  p {
    width: 70%;
    height: 26px;
    color: #5b5555;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    line-height: 26px;
  }
`
