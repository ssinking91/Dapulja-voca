import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import QuizSession from './pages/QuizSession'
import WordList from './pages/WordList'
import Header from './components/Header'
import GlobalStyles from './GlobalStyles'

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/wordlist' element={<WordList />} />
        <Route path='/quiz' element={<QuizSession />} />
      </Routes>
    </>
  )
}
