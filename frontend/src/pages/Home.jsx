import { useState, useEffect } from "react";

const Booking = () => {
  const [customer_name, setCustomerName] = useState("");
  const [customer_email, setCustomerEmail] = useState("");
  const [service_id, setServiceId] = useState("");
  const [appointment_time, setAppointmentTime] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5055/services");
        const data = await response.json();

        console.log(data);

        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop the page from reloading

    try {
      const response = await fetch("http://localhost:5055/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name,
          customer_email,
          service_id: Number(service_id),
          appointment_time,
        }),
      });

      const data = await response.json();
      console.log("Booked:", data);
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
      </div>
    </div>
  );
};

export default Booking;
