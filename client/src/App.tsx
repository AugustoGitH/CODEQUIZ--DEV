import PrivateRouter from './components/auth/PrivateRouter';
import {
  Routes,
  Route,
} from 'react-router-dom';

import PageHome from "./pages/Home"
import PageNotFound from "./pages/NotFound"
import PageAuthentication from "./pages/Authentication"

import PagePainel from "./pages/Painel"
import PageUserCreatedQuiz from "./pages/UserCreatedQuiz"

import PageCreateQuiz from "./pages/CreateQuiz"
import PageQuizzes from "./pages/Quizzes"

import PageQuiz from "./pages/Quiz"




function App() {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<PageHome />} />
      <Route path="/auth/:section" element={<PageAuthentication />} />

      <Route path="/painel" element={
        <PrivateRouter redirect='/auth/login'>
            <PagePainel/>
        </PrivateRouter>
      }/>

      <Route path="/painel/quizzes/:id" element={
        <PrivateRouter redirect='/auth/login'>
          <PageUserCreatedQuiz/>
        </PrivateRouter>
      }/>

      <Route path="/painel/create-quiz" element={
        <PrivateRouter redirect='/auth/login'>
          <PageCreateQuiz/>
        </PrivateRouter>
      }/>

      
      
       <Route path="/quizzes" element={<PageQuizzes/>}/>
       <Route path="/quizzes/:id" element={<PageQuiz/>}/>
  </Routes>
  )
}

export default App
