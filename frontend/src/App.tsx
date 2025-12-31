import Info from "./pages/info/Info"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/info"
						element={<Info />}
					/>
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
