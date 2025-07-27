import { toast } from "react-toastify";

<button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 1500,
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }}
  className="mt-8 block text-red-400 hover:text-red-600"
>
  Logout
</button>;
