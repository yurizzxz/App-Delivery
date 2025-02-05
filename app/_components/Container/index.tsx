import { ScrollView } from "react-native";
import Constants from "expo-constants";

const statusBarHeight: number = Constants.statusBarHeight;
interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <ScrollView className="px-2.5" style={{ marginTop: statusBarHeight, paddingTop: 15, paddingBottom: 40, flex: 1 }}>
      {children}
    </ScrollView>
  );
};

export default Container;
