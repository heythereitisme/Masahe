
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Search from "./pages/Search";
import ClientReview from "./pages/ClientReview";
import SpReview from "./pages/SpReview";
import ProfilePage from "./components/ProfilePage";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { AuthProvider } from "./providers/AuthProvider";
import UserDetails from "./components/userDetails/UserDetails";
import ChatBox from "./pages/ChatBox";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
	return (
		<FirebaseProvider>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/client/booking" element={<Booking />} />
					<Route path="/client/search" element={<Search />} />
					<Route path="/client/review" element={<ClientReview />} />
					<Route path="/sp/review" element={<SpReview />} />
					<Route path="/profilepage" element={<ProfilePage />} />
					<Route path="/client/user" element={<UserDetails />} />
					<Route path="/chatbox" element={<ChatBox/>} />
					<Route path="/booking" element={<Register/>} />
				</Routes>
				<Footer />
			</AuthProvider>
		</FirebaseProvider>
	);
}

export default App;
