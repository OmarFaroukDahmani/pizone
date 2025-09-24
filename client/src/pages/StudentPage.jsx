import { UserButton, useSession } from "@clerk/clerk-react";

export default function StudentPage() {
  const { session } = useSession();

  const userId = session?.claims?.id;        // from "id": "{{user.id}}"
  const username = session?.claims?.username; // from "username": "{{user.username}}"

  return (
    <div>
      <UserButton/>
      <p>User ID: {userId}</p>
      <p>Username: {username}</p>
    </div>
  );
}
