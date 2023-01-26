
import { Route, Routes } from "react-router-dom";
import ClientPortal from "./components/ClientPortal";
import GuestPortal from "./components/GuestPortal";
import MTPortal from "./components/MTPortal";
import ProfilePage from "./components/ProfilePage";
import ClientBooking from "./pages/Booking";
import BookUser from "./pages/BookUser";
import ClientReview from "./pages/ClientReview";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import SpReview from "./pages/SpReview";
import { AuthProvider } from "./providers/AuthProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";

function App() {
	return (
		<FirebaseProvider>
			<AuthProvider>
				<Routes>
					<Route element={<GuestPortal />}>
						<Route path="/" element={<Home />} />
						<Route path="/client/login" element={<Login permission={1}/>} />
						<Route path="/mt/login" element={<Login permission={2}/>} />
						<Route path="/profilepage" element={<ProfilePage />} />
					</Route>
					<Route element={<ClientPortal />}>
						<Route path="/client/booking" element={<ClientBooking />} />
						<Route path="/client/booking/:id" element={<BookUser />} />
						<Route path="/client/search" element={<Search />} />
						<Route path="/client/review" element={<ClientReview />} />
						<Route path="/client/user" element={<Details />} />
					</Route>
					<Route element={<MTPortal />}>
						<Route path="/mt/booking/:id" element={<BookUser mt={true} />} />
						<Route path="/mt/review" element={<SpReview />} />
					</Route>
				</Routes>
			</AuthProvider>
		</FirebaseProvider>
	);
}

export default App;
