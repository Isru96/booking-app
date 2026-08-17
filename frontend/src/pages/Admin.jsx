import { useState, useEffect } from "react";
import { api } from "../lib/api";
import Spinner from "../components/Spinner";

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetchAppointments lives HERE — at component level, so buttons can call it too
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await api.get("/appointments");
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  // useEffect just CALLS it once on load
  useEffect(() => {
    fetchAppointments();
  }, []);

  // ... markComplete and cancelAppointment can now call fetchAppointments()

  // 1. Total Bookings (ጠቅላላ የተያዙ ቀጠሮዎች ብዛት)
  const totalBookings = appointments.length;

  // 2. Upcoming / Booked (ገና ያልተጠናቀቁ ቀጠሮዎች)
  const upcomingBookings = appointments.filter(
    (app) => app.status === "booked",
  ).length;

  // 3. Completed (ያለቁ ቀጠሮዎች ብዛት)
  const completedBookings = appointments.filter(
    (app) => app.status === "completed",
  ).length;

  // 4. Total Revenue (የተጠናቀቁት አገልግሎቶች ጠቅላላ ገቢ)
  const totalRevenue = appointments
    .filter((app) => app.status === "completed")
    .reduce((sum, app) => sum + Number(app.service_price || 0), 0);

  const markComplete = async (id) => {
    try {
      await api.patch(`/appointments/${id}`, { status: "completed" });
      fetchAppointments(); // refresh the list so the change shows
    } catch (error) {
      console.error(error);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppointments(); // refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Barbershop Admin Dashboard</h1>



      { loading ? (
        <Spinner />
      ) : ( 
      <>
        {/* Summary stat cards */}
        <div className="stats shadow bg-white mb-6">
          <div className="stat">
            <div className="stat-title">Total Bookings</div>
            <div className="stat-value">{totalBookings}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Upcoming</div>
            <div className="stat-value text-info">{upcomingBookings}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">{completedBookings}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${totalRevenue.toFixed(2)}</div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra bg-white shadow">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Service</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customer_name}</td>
                  <td>{item.customer_email}</td>
                  <td>{item.service_name}</td>
                  <td>{item.appointment_time}</td>
                  <td>
                    <span className="badge badge-outline">{item.status}</span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => markComplete(item.id)}
                    >
                      Complete
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => cancelAppointment(item.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>


           ) }




    </div>
  );
};

export default Admin;
