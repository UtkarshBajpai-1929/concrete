import { RouterProvider } from "react-router-dom";
import router from "../router";
import { useEffect } from "react";
import DB from 'devdb-sdk'
const db = new DB({
  url: "http://10.136.136.39:5000",
});
// const sendData = async () => {
//   const cement = db.cement.create({
//     name: "Cement",
//     type: "UltraTech",
//     density: 3.15,
//     location: "India",
// })}
// const deleteData = async () => {
//   const cement = db.cement.delete(
//     "0c041805-075a-466c-8490-28706f705f9d"
//   )}
const App = () => {
  // useEffect(() => {
  //   sendData();
  // }, []);
  return (
    <>
      {/* <button onClick={deleteData}>Delete Data</button> */}    
      <RouterProvider router={router} />
    </>
  );
};

export default App;