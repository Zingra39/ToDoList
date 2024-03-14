import { Home } from "./src/screen/Home";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
      {/* {Personalização da barra de status do celular} */}
      <StatusBar
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
      {/* {Chamada da interface Home} */}
      <Home />
    </>
  );
}
