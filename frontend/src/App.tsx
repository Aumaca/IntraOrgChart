import Info from "./pages/Info"
import Login from "./pages/Login"
import Home from "./pages/Home/Home"
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
