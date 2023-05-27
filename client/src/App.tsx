import { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import PrivateRouter from './components/auth/PrivateRouter';
import PageAuthentication from "./pages/Authentication"
import PageCreateQuiz from "./pages/CreateQuiz"
import PageHome from "./pages/Home"
import PageNotFound from "./pages/NotFound"
import PagePainel from "./pages/Painel"
import PageQuiz from "./pages/Quiz"
import PageQuizzes from "./pages/Quizzes"
import PageUserCreatedQuiz from "./pages/UserCreatedQuiz"






function App() {
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [navigate])

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<PageHome />} />
      <Route path="/auth/:section" element={<PageAuthentication />} />

      <Route path="/painel" element={
        <PrivateRouter redirect='/auth/login'>
          <PagePainel />
        </PrivateRouter>
      } />

      <Route path="/painel/quizzes/:id" element={
        <PrivateRouter redirect='/auth/login'>
          <PageUserCreatedQuiz />
        </PrivateRouter>
      } />

      <Route path="/painel/create-quiz" element={
        <PrivateRouter redirect='/auth/login'>
          <PageCreateQuiz />
        </PrivateRouter>
      } />



      <Route path="/quizzes" element={<PageQuizzes />} />
      <Route path="/quizzes/:id" element={<PageQuiz />} />
    </Routes>
  )
}

export default App
