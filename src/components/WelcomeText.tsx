import { useTelegram } from "../hooks/useTelegram";

export default function WelcomeText() {
  const { user } = useTelegram();
  return (
    <div className="w-full from-neutral-900">
      <div className="flex ml-2">
        <h1 className="font-heading text-primary text-2xl">
          {user ? `Hey, ${user.username}!` : "Open with telegram client bot"}
        </h1>
      </div>
    </div>
  );
}
