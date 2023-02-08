import Home from "../Home";


 function Root() {
    console.log("Inside root");
    return (
      <>
        <button onClick={()=>console.log("Im pressed!")}>Press me</button>
      </>
    );
  }
  export default Root;