import React from "react";
import FormData from "./Components/FormData";
import DeviceList from "./Components/DeviceList";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <main>
        <FormData />
        <DeviceList />
      </main>
      <Footer />
    </>
  );
}
export default App;
