import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import ListItem from "./components/ListItem";
import SAMPLE_DATA from "./assets/data/sampleData";
import { useRef, useMemo, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chart from "./components/Chart";
import { getMarketData } from "./services/cryptoService";

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTile}>Assets</Text>
    </View>
    <View style={styles.ligne}></View>
  </>
);

export default function App() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const [data, setData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  const openMondal = (item) => {
    setSelectedCoin(item);
    bottomSheetModalRef.current?.present();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            ListHeaderComponent={<ListHeader />}
            keyExtractor={(item) => item.id}
            data={SAMPLE_DATA}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => openMondal(item)}
                name={item.name}
                symbol={item.symbol}
                price={item.current_price}
                priceChangePercent={item.price_change_percentage_7d_in_currency}
                logoUrl={item.image}
              />
            )}
          />
        </SafeAreaView>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          style={styles.bottomSheet}
        >
          {selectedCoin ? (
            <Chart
              name={selectedCoin.name}
              symbol={selectedCoin.symbol}
              price={selectedCoin.current_price}
              priceChangePercent={
                selectedCoin.price_change_percentage_7d_in_currency
              }
              logoUrl={selectedCoin.image}
              sparkline={selectedCoin.sparkline_in_7d.price}
            />
          ) : null}
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  ligne: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  largeTile: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  bottomSheet: {
    shadowColor: "gray",
    shadowOffset: {
      with: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
