import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Search from "./pages/Search";
import ClientReview from "./pages/ClientReview";
import SpReview from "./pages/SpReview";
import ProfilePage from "./components/ProfilePage";
import { FirebaseProvider } from "./providers/FirebaseProvider";
function App() {
	return (
		<FirebaseProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/client/booking" element={<Booking />} />
				<Route path="/client/search" element={<Search />} />
				<Route path="/client/review" element={<ClientReview />} />
				<Route path="/sp/review" element={<SpReview />} />
				<Route path="/ProfilePage" element={<ProfilePage />} />
			</Routes>
		</FirebaseProvider>
	);
}

export default App;
