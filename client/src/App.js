import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import BlogPage from './pages/BlogPage';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router basename='/'>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/update-blog' element={<UpdateBlog />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
