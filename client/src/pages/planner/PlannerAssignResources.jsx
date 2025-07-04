import React, { useEffect, useState } from "react";
import axios from "axios";

const PlannerAssignResources = () => {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [resources, setResources] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedResources, setSelectedResources] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const eventRes = await axios.get(
      "http://localhost:5000/api/planner/approved-events",
      { withCredentials: true }
    );
    setApprovedEvents(eventRes.data);

    const resRes = await axios.get("http://localhost:5000/api/planner/all", {
      withCredentials: true,
    });
    setResources(resRes.data);

    const staffRes = await axios.get("http://localhost:5000/api/staff/getstaff", {
      withCredentials: true,
    });
    setStaffList(staffRes.data);
  };

  const handleQuantityChange = (eventId, resourceId, quantity) => {
    setSelectedResources((prev) => {
      const current = prev[eventId] || [];
      if (quantity === 0) {
        return {
          ...prev,
          [eventId]: current.filter((r) => r.resource !== resourceId),
        };
      }
      const exists = current.find((r) => r.resource === resourceId);
      const updated = exists
        ? current.map((r) =>
            r.resource === resourceId ? { ...r, quantity } : r
          )
        : [...current, { resource: resourceId, quantity }];
      return { ...prev, [eventId]: updated };
    });
  };

  const handleAssignStaff = async (eventId, staffId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/planner/event/${eventId}/assign-staff`,
        { staffId },
        { withCredentials: true }
      );
      alert("Staff assigned!");
      fetchData();
    } catch (err) {
      console.error("Error assigning staff:", err);
      alert("Failed to assign staff");
    }
  };

  const handleAssign = async (eventId) => {
    try {
      const payload = {
        resources:
          selectedResources[eventId]?.filter((r) => r.quantity > 0) || [],
      };
      await axios.put(
        `http://localhost:5000/api/planner/${eventId}/assign`,
        payload,
        { withCredentials: true }
      );
      alert("Resources assigned! ✅");
      fetchData();
      setSelectedResources((prev) => ({ ...prev, [eventId]: [] }));
    } catch (err) {
      console.error("Error assigning resources:", err);
      alert("Assignment failed ❌");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🗂 Assign Resources & Staff to Approved Events
      </h2>

      {approvedEvents.length === 0 ? (
        <p className="text-gray-600">No approved events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                👤 Client: {event.clientId?.email || "N/A"}
              </p>

              {/* Staff Assignment */}
              <div className="mt-4">
                <p className="font-medium text-gray-800 mb-1">👷 Assign or Update Staff:</p>
                {event.staffAssigned ? (
                  <p className="text-green-600 text-sm mb-1">
                    ✅ Assigned to:{" "}
                    <strong>
                      {
                        staffList.find((s) => s._id === event.staffAssigned)
                          ?.email
                      }
                    </strong>
                  </p>
                ) : (
                  <p className="text-red-500 text-sm mb-1">⚠️ No staff assigned yet.</p>
                )}
                <select
                  className="w-full border p-2 rounded"
                  value={event.staffAssigned || ""}
                  onChange={(e) =>
                    handleAssignStaff(event._id, e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Staff
                  </option>
                  {staffList.map((staff) => (
                    <option key={staff._id} value={staff._id}>
                      {staff.email}
                    </option>
                  ))}
                </select>
              </div>

              {/* Resource Assignment */}
              <div className="mt-4">
                <p className="font-medium text-gray-800 mb-2">
                  📦 Assign Resource Quantities:
                </p>
                <div className="space-y-2">
                  {resources.map((res) => {
                    const selectedQty =
                      selectedResources[event._id]?.find(
                        (r) => r.resource === res._id
                      )?.quantity || 0;

                    return (
                      <div key={res._id} className="flex justify-between items-center">
                        <span className="w-1/3">{res.name}</span>
                        <input
                          type="number"
                          min="0"
                          max={res.quantity}
                          value={selectedQty}
                          disabled={res.quantity === 0}
                          onChange={(e) =>
                            handleQuantityChange(
                              event._id,
                              res._id,
                              parseInt(e.target.value)
                            )
                          }
                          className="border p-1 w-20 rounded"
                        />
                        <span className="text-sm text-gray-500">
                          Available: {res.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Allocated Resources */}
              {event.resourcesAllocated?.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-green-700 mb-2">
                    🧰 Allocated Resources:
                  </p>
                  <ul className="text-sm text-gray-700 list-disc ml-5">
                    {event.resourcesAllocated.map((resObj, idx) => {
                      const matched = resources.find(
                        (r) => r._id === resObj.resource
                      );
                      return (
                        <li key={idx}>
                          {matched?.name || "Unknown Resource"} — Qty:{" "}
                          {resObj.quantity || "?"}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Assign Button */}
              <button
                className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
                onClick={() => handleAssign(event._id)}
              >
                🚀 Assign Selected Resources
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlannerAssignResources;
