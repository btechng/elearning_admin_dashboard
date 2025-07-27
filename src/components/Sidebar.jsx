<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="mt-8 block text-red-400 hover:text-red-600"
>
  Logout
</button>;
