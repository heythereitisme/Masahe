
import { Route, Routes } from "react-router-dom";
import ClientPortal from "./components/ClientPortal";
import GuestPortal from "./components/GuestPortal";
import MTPortal from "./components/MTPortal";
import ClientBooking from "./pages/Booking";
import BookUser from "./pages/BookUser";
import ClientReview from "./pages/ClientReview";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MTSchedule from "./pages/Scheduling";
import Search from "./pages/Search";
import SpReview from "./pages/SpReview";
import ProfilePage from "./pages/ProfilePage"
import { AuthProvider } from "./providers/AuthProvider";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import Services from "./pages/Services";
import MTHome from "./components/massageTherapist/MTHome";
import ClientHome from "./pages/ClientHome";

function App() {
	return (
		<FirebaseProvider>
			<AuthProvider>
				<Routes>
					<Route element={<GuestPortal />}>
						<Route path="/" element={<Home />} />
						<Route path="/client/login" element={<Login permission={1} role="client"/>} />
						<Route path="/mt/login" element={<Login permission={2} role="mt"/>} />
						<Route path="/profile" element={<ProfilePage/>} />
					</Route>
					<Route element={<ClientPortal />}>
						<Route path="/client" element={<Home />} />
						<Route path="/client/booking" element={<ClientBooking />} />
						<Route path="/client/booking/:id" element={<BookUser />} />
						<Route path="/client/search" element={<Search />} />
						<Route path="/client/review" element={<ClientReview />} />
						<Route path="/client/services" element={<Services />} />
						<Route path="/mt/user" element={<Details />} />
						<Route path="/client/home" element={<ClientHome/>} />
						<Route path="/client/profile" element={<ProfilePage/>} />
					</Route>
					<Route element={<MTPortal />}>
						<Route path="/mt" element={<MTHome/>} />
						<Route path="/mt/schedule" element={<MTSchedule/>} />
						<Route path="/mt/schedule/:id" element={<BookUser mt={true} />} />
						<Route path="/mt/review" element={<SpReview />} />
						<Route path="/client/user" element={<Details />} />
						<Route path="/mt/profile" element={<ProfilePage/>} />
					</Route>
				</Routes>
			</AuthProvider>
		</FirebaseProvider>
	);
}

export default App;
