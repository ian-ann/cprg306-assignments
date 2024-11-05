"use client";

import { useEffect } from 'react';
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut, googleSignIn } = useUserAuth();

  useEffect(() => {
    // You can perform any side effects here if needed
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p>
          Welcome! Please sign in to continue.
        </p>
        <button
          onClick={async () => await gitHubSignIn()}
          className="className=px-4 py-2 bg-blue-950 text-white rounded mt-4 m-2"
        >
          Login with GitHub
        </button>
        <button
          onClick={async () => await googleSignIn()}
          className="className=px-4 py-2 bg-blue-950 text-white rounded mt-4 m-2"
        >
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

        <p>
          Welcome, {user.displayName} ({user.email})
        </p>
        <div className="flex flex-col items-center justify-center py-2">
        <button
          onClick={async () => await firebaseSignOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
        <a href="/week-9/shopping-list" className="px-4 py-2 bg-green-500 text-white rounded mt-4">
          Go to Shopping List
        </a>
      </div>
    </div>
  );
}