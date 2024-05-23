import { UserProvider } from "./contexts/UserContext";
import MyApp from "./components/MyApp";

const App: React.FC = () => {
  return (
    <UserProvider>
      <MyApp />
    </UserProvider>
  );
};

export default App;
