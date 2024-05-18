import React, { Suspense } from "react";
import JoinPage from "./components/JoinPage";
import { Routes, Route } from "react-router-dom";

const MessageRoomLazy = React.lazy(() => import("./components/MessageRoom"));

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/chat"
          element={
            <Suspense>
              <MessageRoomLazy />
            </Suspense>
          }
        />
        <Route path="/" element={<JoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
