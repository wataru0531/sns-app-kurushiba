
// App.js

// BrowserRouter → 配下のコンポーネントに「ルーティングの文脈(context)」を提供すること
//                 👉 Routers、Route、Link、useNavigateなどはすべて必ずこのなかで使う
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";


function App() {

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="signin" element={ <Signin /> } />
          <Route path="signup" element={ <Signup /> } />
          {/* <Route path="/about" element={ <About /> } /> */}

          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App
