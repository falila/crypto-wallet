import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import ListItem from "./components/ListItem";
import SAMPLE_DATA from "./assets/data/sampleData";

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTile}>Assets</Text>
    </View>
    <View style={styles.ligne}></View>
  </>
)

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ListHeader />}
        keyExtractor={(item) => item.id}
        data={SAMPLE_DATA}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            price={item.current_price}
            priceChangePercent={item.price_change_percentage_7d_in_currency}
            logoUrl={item.image}
          />
        )}
      />
    </SafeAreaView>
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
});
