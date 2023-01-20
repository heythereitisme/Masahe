
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";
import ClientBooking from "./pages/Booking";
import BookUser from "./pages/BookUser";
import ChatBox from "./pages/ChatBox";
import ClientReview from "./pages/ClientReview";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Search from "./pages/Search";
import SpReview from "./pages/SpReview";
import { AuthProvider } from "./providers/AuthProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";

function App() {
	return (
		<FirebaseProvider>
			<AuthProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/client/booking" element={<ClientBooking />} />
					<Route path="/client/booking/:id" element={<BookUser />} />
					<Route path="/mt/booking/:id" element={<BookUser mt={true} />} />
					<Route path="/client/search" element={<Search />} />
					<Route path="/client/review" element={<ClientReview />} />
					<Route path="/mt/review" element={<SpReview />} />
					<Route path="/profilepage" element={<ProfilePage />} />
					<Route path="/client/user" element={<Details />} />
					<Route path="/chatbox" element={<ChatBox/>} />
					<Route path="/booking" element={<Register/>} />
				</Routes>
				<Footer />
			</AuthProvider>
		</FirebaseProvider>
	);
}

export default App;
