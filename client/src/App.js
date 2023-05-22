import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail";
import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";

import styles from "./App.module.css";

function App(props) {
    const location = useLocation().pathname;

    return (
        <div className={styles.app}>
            {location !== "/" && <NavBar />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/create" element={<Form />} />
            </Routes>
        </div>
    );
}

export default App;
