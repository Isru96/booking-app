import { useState, useEffect } from "react";
import { api } from "../lib/api";
import Spinner from "../components/Spinner";

const Booking = () => {
  const [customer_name, setCustomerName] = useState("");
  const [customer_email, setCustomerEmail] = useState("");
  const [service_id, setServiceId] = useState("");
  const [appointment_time, setAppointmentTime] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/services");
      setServices(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/appointments", {
        customer_name,
        customer_email,
        service_id: Number(service_id),
        appointment_time,
      });
      console.log("Booked:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-white shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Book an Appointment
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
              value={service_id}
              onChange={(e) => setServiceId(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">-- Choose a service --</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Your name"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="email"
              placeholder="Your email"
              value={customer_email}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="input input-bordered w-full"
            />

            <input
              type="datetime-local"
              value={appointment_time}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
              Book appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
