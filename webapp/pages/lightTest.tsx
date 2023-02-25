import axios from "axios";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    axios.post("/api/lightTest").catch((error) => {
      console.log(`lightTest() failed: ${error}`);
    });
  }, []);
  return (
    <div>
      <h1>Test Page</h1>
    </div>
  );
}
