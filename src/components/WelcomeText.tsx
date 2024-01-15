import { useTelegram } from "../hooks/useTelegram";

export default function WelcomeText() {
  const { user } = useTelegram();
  return (
    <div>
      <div className="w-full flex justify-center text-center">
        <h1>
          {user ? `Welcome ${user.username}` : "Open with telegram client bot"}
        </h1>
      </div>
    </div>
  );
}
