import Image from "next/image";
import HomePage from "./components/homePage";

export default function Home() {
  return (
    <div className="flex flex-col pt-[85px]">
      <HomePage />
    </div>
  );
}
