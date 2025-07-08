import BtcIndicators from "@/components/BtcIndicators";
import BtcPrice from "@/components/BtcPrice";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center h-screen bg-">
      <BtcPrice />
      <BtcIndicators />
    </div>
  );
}
