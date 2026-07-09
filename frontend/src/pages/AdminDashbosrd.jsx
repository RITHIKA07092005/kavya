import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const StatCard = ({ label, value }) => (
  <div className="glass p-6 text-center">
    <div className="text-3xl font-bold gradient-text">{value ?? "—"}</div>
    <div className="text-white/60 text-sm mt-1">{label}</div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [tab, setTab] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [projectRequests, setProjectRequests] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("genoid_admin_token")) {
      navigate("/admin-login");
      return;
    }
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [s, c, p, a, n] = await Promise.all([
        api.get("/dashboard"),
        api.get("/contact"),
        api.get("/project"),
        api.get("/career"),
        api.get("/notifications"),
      ]);
      setStats(s.data);
      setContacts(c.data);
      setProjectRequests(p.data);
      setApplications(a.data);
      setNotifications(n.data.notifications);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("genoid_admin_token");
        navigate("/admin-login");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("genoid_admin_token");
    navigate("/admin-login");
  };

  const exportCSV = (rows, filename) => {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]).filter((k) => !k.startsWith("_"));
    const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const deleteItem = async (type, id) => {
    await api.delete(`/${type}/${id}`);
    loadAll();
  };

  const markCompleted = async (id) => {
    await api.patch(`/project/${id}`, { status: "Completed" });
    loadAll();
  };

  const tabs = [
    { id: "contacts", label: `Contacts (${contacts.length})` },
    { id: "projects", label: `Project Requests (${projectRequests.length})` },
    { id: "careers", label: `Applications (${applications.length})` },
    { id: "notifications", label: `Notifications (${notifications.length})` },
  ];

  return (
    <div className="section pt-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-red-400">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Contacts" value={stats.totalContacts} />
        <StatCard label="Project Requests" value={stats.totalProjectRequests} />
        <StatCard label="Unread Messages" value={stats.unreadMessages} />
        <StatCard label="Completed Projects" value={stats.completedProjects} />
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-sm border ${
              tab === t.id ? "border-cyan-400 bg-cyan-400/10" : "border-white/10 hover:border-white/30"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass p-6 overflow-x-auto">
        {tab === "contacts" && (
          <>
            <button onClick={() => exportCSV(contacts, "contacts.csv")} className="btn-primary text-xs mb-4">
              Export CSV
            </button>
            <table className="w-full text-sm">
              <thead className="text-white/50 text-left">
                <tr><th className="pb-2">Name</th><th>Email</th><th>Phone</th><th>Budget</th><th></th></tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className="border-t border-white/10">
                    <td className="py-2">{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone}</td>
                    <td>{c.budget}</td>
                    <td>
                      <button onClick={() => deleteItem("contact", c._id)} className="text-red-400 hover:underline text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === "projects" && (
          <>
            <button onClick={() => exportCSV(projectRequests, "project_requests.csv")} className="btn-primary text-xs mb-4">
              Export CSV
            </button>
            <table className="w-full text-sm">
              <thead className="text-white/50 text-left">
                <tr><th className="pb-2">Request ID</th><th>Name</th><th>Type</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {projectRequests.map((p) => (
                  <tr key={p._id} className="border-t border-white/10">
                    <td className="py-2">{p.requestId}</td>
                    <td>{p.fullName}</td>
                    <td>{p.projectType}</td>
                    <td>{p.status}</td>
                    <td className="space-x-2">
                      <button onClick={() => markCompleted(p._id)} className="text-cyan-400 hover:underline text-xs">
                        Mark Done
                      </button>
                      <button onClick={() => deleteItem("project", p._id)} className="text-red-400 hover:underline text-xs">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {tab === "careers" && (
          <table className="w-full text-sm">
            <thead className="text-white/50 text-left">
              <tr><th className="pb-2">Name</th><th>Email</th><th>Position</th><th></th></tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <tr key={a._id} className="border-t border-white/10">
                  <td className="py-2">{a.fullName}</td>
                  <td>{a.email}</td>
                  <td>{a.position}</td>
                  <td>
                    <button onClick={() => deleteItem("career", a._id)} className="text-red-400 hover:underline text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {tab === "notifications" && (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li key={n._id} className={`flex justify-between p-3 rounded-lg ${n.isRead ? "bg-white/0" : "bg-cyan-400/5"}`}>
                <span>{n.message}</span>
                <div className="space-x-2 text-xs">
                  {!n.isRead && (
                    <button onClick={async () => { await api.patch(`/notifications/${n._id}`); loadAll(); }} className="text-cyan-400 hover:underline">
                      Mark Read
                    </button>
                  )}
                  <button onClick={() => deleteItem("notifications", n._id)} className="text-red-400 hover:underline">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
