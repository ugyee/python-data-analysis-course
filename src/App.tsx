import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { ProjectDetail } from './pages/ProjectDetail';
import { Learn } from './pages/Learn';
import { PracticeList } from './pages/PracticeList';
import { Practice } from './pages/Practice';
import { QuizList } from './pages/QuizList';
import { Quiz } from './pages/Quiz';
import { QuizResult } from './pages/QuizResult';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { LearningPath } from './pages/LearningPath';
import { About } from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:courseId" element={<ProjectDetail />} />
        <Route path="/learn/:courseId/:lessonId" element={<Learn />} />
        <Route path="/practice" element={<PracticeList />} />
        <Route path="/practice/:id" element={<Practice />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/quiz/:id/result" element={<QuizResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
