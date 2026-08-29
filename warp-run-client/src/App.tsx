import { useAuth } from "./context/AuthContext";
import LoginForm from "./features/auth/LoginForm";
import PlayerInfo from "./features/player/PlayerInfo";
import Ships from "./features/ships/Ships";
import Agents from "./features/agents/Agents";

function App() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <p>Logging...</p>
  } else if (!token) {
    return <LoginForm/>
  } else {
    return (
      <>
        <PlayerInfo/>
        <Ships/>
        <Agents/>
      </>
    );
  }
}

export default App;