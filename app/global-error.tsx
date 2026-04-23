"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  //const router = useRouter();

  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  const reload = () => {
    reset(); // Reset the error boundary state
    window.location.reload(); // Redirect to the homepage (change as needed)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-center">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong</h1>
      <p className="text-gray-700">{error.message}</p>
      <button
        onClick={reload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Home
      </button>
    </div>
  );
}
