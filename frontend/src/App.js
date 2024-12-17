import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import HomePage from "./pages/HomePage";
import HeaderLayout from "./components/HeaderLayout";
import MyGroupsPage from "./pages/MyGroupsPage";
import FindGroupsPage from "./pages/FindGroupsPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import StudyGroupPage from "./pages/StudyGroupPage";
import ConversationsPage from "./pages/ConversationsPage";
import ConversationPage from "./pages/ConversationPage";
import MeetingsPage from "./pages/MeetingsPage";
import MyProfilePage from "./pages/MyProfilePage";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HeaderLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="my-groups" element={<MyGroupsPage />} />
                        <Route path="find-group" element={<FindGroupsPage />} />
                        <Route
                            path="create-group"
                            element={<CreateGroupPage />}
                        />
                        <Route
                            path="study-group/:groupId"
                            element={<StudyGroupPage />}
                        />
                        <Route
                            path="conversation/:groupId"
                            element={<ConversationPage />}
                        />
                        <Route
                            path="messages"
                            element={<ConversationsPage />}
                        />
                        <Route path="meetings" element={<MeetingsPage />} />
                        <Route path="my-profile" element={<MyProfilePage />} />
                    </Route>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/create-account"
                        element={<CreateAccountPage />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
