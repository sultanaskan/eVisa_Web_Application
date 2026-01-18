import { useEffect, useState } from "react";
import api from "../../api/axios.js";

// Helper functions for initial state
const userFromSessionStorage = () => {
    const userList = localStorage.getItem("UsersList");
    return userList ? JSON.parse(userList) : [];
};

const requestFromSessionStorage = () => {
    const visaRequestList = localStorage.getItem("visaRequestList");
    return visaRequestList ? JSON.parse(visaRequestList) : [];
};

const Dashboard = () => {
    const [userList, setUserList] = useState(() => userFromSessionStorage());
    const [visaRequestList, setVisaRequestList] = useState(() => requestFromSessionStorage());
    const [selectedRequest, setSelectedRequest] = useState({});
    const [activeUserId, setActiveUserId] = useState(null);
    const [document, setDocuments] = useState({});


    

    // Load user list from server
    useEffect(() => {
        const getUsersFromServer = async () => {
            try {
                const res = await api.get("/auth/users");
                if (res.data) {
                    const onlyUsers = res.data.filter(user => user.isAdmin !== true);
                    setUserList(onlyUsers); // Overwrite with fresh data
                    localStorage.setItem("UsersList", JSON.stringify(onlyUsers));
                }
            } catch (error) {
                console.log("Users not fetch from server: ", error);
            }
        };
        getUsersFromServer();
    }, []);



    // Load Request list from server
    const loadRequests = async (userId) => {
        setActiveUserId(userId);
        setSelectedRequest(null); // Clear detail view when switching users
        try {
            const res = await api.get(`/visa/visa-request/find-list/${userId}`);
            if (res.data) {
                setVisaRequestList(res.data.visaRequestList);
                localStorage.setItem("visaRequestList", JSON.stringify(res.data.visaRequestList));
            }
        } catch (error) {
            alert("Error loading user visaRequestList");
        }
    };

     const loadDocsFromServer = async (req) => {
        try{
            const res = await api.get(`/visa/visa-request/documents/${req._id}`);
            if(res.data){
                setDocuments(res.data.documents);
                localStorage.setItem("documents", JSON.stringify(res.data.documents));
            }
        }catch(error){
            console.log("Fail to lead Documents from server: " ,error)
        }
    }

    const selectRequest  = (req) =>{
        setSelectedRequest(req);
        loadDocsFromServer(req);
    }

    const updateVisaRequest = async (req, action) => {
    try {
        let sts = "";
        
        // 1. Handle Deletion
        if (action === 3) {
            const res = await api.delete(`/visa/visa-request/delete-one/${req._id}`);
            if (res) alert("Request Deleted successfully..");
            return; // Exit early since there's no status to update
        }

        // 2. Determine the new status string
        if (action === 1) sts = "Approved";
        else if (action === 2) sts = "Rejected";

        if (sts) {
            // 3. Prepare the data to send to the server
            // Use the SPREAD operator on 'req' and manually overwrite the status
            const updatedDataForServer = { ...req, status: sts };

            // 4. Update the server immediately with the fresh variable
            const res = await api.put(`/visa/visa-request/${req._id}`, updatedDataForServer);

            if (res?.data) {
                // 5. Update the UI state so the screen reflects the change
                setSelectedRequest(updatedDataForServer);
                alert(`Successfully ${sts}`);
            }
        }
    } catch (error) {
        console.error("Failed to update visa Request...", error);
        alert("Action failed. Check console for details.");
    } finally {
        // 6. Reload the middle list to keep everything in sync
        if (activeUserId) {
            loadRequests(activeUserId);
        }
    }
};

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans overflow-hidden">
            {/* --- HEADER --- */}
            <header className="flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm z-10">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    <p className="text-xs text-gray-500 font-medium">Republic of Serbia Visa Portal</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input 
                            type="search"
                            placeholder="Search requests..."
                            className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-72 bg-gray-50"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                </div>
            </header>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex flex-1 overflow-hidden">
                
                {/* COLUMN 1: Users List (Sidebar) */}
                <aside className="w-1/5 bg-white border-r flex flex-col h-full p-1">
                    {/* Header: This stays fixed at the top of the sidebar */}
                    <div className="p-4 border-b bg-gray-50/50 sticky top-0 z-10">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Applicants</h2>
                    </div>

                    {/* Scrollable Area: Only this part scrolls */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <ul className="divide-y divide-gray-100">
                            {userList.map((user) => (
                                <li key={user._id}>
                                    <button
                                        onClick={() => loadRequests(user._id)}
                                        className={`w-full flex flex-col items-start p-4 transition-all ${
                                            activeUserId === user._id 
                                            ? "bg-blue-50 border-r-4 border-blue-600" 
                                            : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <span className="text-sm font-bold text-gray-900 capitalize">
                                            {user.fname} {user.lname}
                                        </span>
                                        <span className="text-xs text-gray-500 truncate w-full text-left">
                                            {user.email}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* COLUMN 2: Visa Requests (Middle) */}
                <section className="w-1/4 bg-gray-50 border-r flex flex-col">
                    <div className="p-4 border-b bg-white">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Active Requests</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {visaRequestList.length > 0 ? (
                            <div className="p-2 space-y-2">
                                {visaRequestList.map((req) => (
                                    <button 
                                        key={req._id} 
                                        onClick={() => selectRequest(req)}
                                        className={`w-full p-4 rounded-xl border text-left transition-all shadow-sm ${
                                            selectedRequest?._id === req._id 
                                            ? "bg-white border-blue-500 ring-1 ring-blue-500" 
                                            : "bg-white border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-mono font-bold text-blue-600">#{req.request_number}</span>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                                req.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                                            }`}>
                                                {req.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800">{req.visa_type || "Type D Visa"}</p>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 text-center">
                                <span className="text-3xl mb-2">📂</span>
                                <p className="text-sm italic">Select an applicant to view their requests</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* COLUMN 3: Details (Right) */}
                <section className="flex-1 bg-white flex flex-col">
                    <div className="p-4 border-b bg-blue-900 text-white flex justify-between items-center">
                        <h2 className="font-semibold text-sm">Application Dossier</h2>
                        {selectedRequest && (
                            <span className="text-xs bg-blue-800 px-2 py-1 rounded">
                                ID: {selectedRequest._id}
                            </span>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {!selectedRequest ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-300">
                                <div className="p-10 border-4 border-dashed border-gray-100 rounded-full mb-4">
                                    <span className="text-6xl">📄</span>
                                </div>
                                <p className="font-medium text-gray-400">No application selected for review</p>
                            </div>
                        ) : (
                            <div className="p-8 max-w-3xl mx-auto w-full">
                                <div className="flex items-center gap-6 mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                    <img 
                                        src={`${document?.photography?.url}`} 
                                        alt="Passport" 
                                        className="h-32 w-28 object-cover rounded-lg shadow-md border-2 border-white"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">Request Data</h3>
                                        <p className="text-sm text-gray-500">Please verify all information before action</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <table className="w-full text-sm text-left border-collapse">
                                        <tbody className="divide-y divide-gray-100">
                                            <DetailRow label="Request Number" value={selectedRequest.request_number} />
                                            <DetailRow label="Visa Category" value={selectedRequest.visa_type} />
                                            <DetailRow label="Submission Date" value={new Date(selectedRequest.createdAt).toLocaleDateString()} />
                                            <DetailRow label="Current Status" value={selectedRequest.status} isStatus />
                                        </tbody>
                                    </table>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-10 flex gap-4">
                                    <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-100" 
                                    onClick={() => updateVisaRequest(selectedRequest, 1)}
                                    >
                                        Approve Visa
                                    </button>
                                    <button className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors"
                                    onClick={() => updateVisaRequest(selectedRequest, 2)}
                                    >
                                        Reject
                                    </button>
                                    <button className="px-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200"
                                    onClick={() => updateVisaRequest(selectedRequest, 3)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="bg-white border-t px-8 py-3 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <span>System Status: Operational</span>
                <span>© 2026 Republic of Serbia Admin Panel</span>
            </footer>
        </div>
    );
};

// UI Helper for Table Rows
const DetailRow = ({ label, value, isStatus }) => (
    <tr className="hover:bg-gray-50">
        <td className="py-4 font-semibold text-gray-500 w-1/3">{label}</td>
        <td className={`py-4 font-bold ${isStatus ? "text-orange-600" : "text-gray-900"}`}>
            {value || "N/A"}
        </td>
    </tr>
);

export default Dashboard;