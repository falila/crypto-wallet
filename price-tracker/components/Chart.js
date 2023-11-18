import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import {
  ChartDot,
  ChartPathProvider,
  ChartPath,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";
const { width: SIZE } = Dimensions.get("window");
const Chart = ({
  name,
  price,
  symbol,
  priceChangePercent,
  logoUrl,
  sparkline,
}) => {
  const priceChangeColor = priceChangePercent > 0 ? "green" : "red";

  const latestCurrentPrice = useSharedValue(price);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    latestCurrentPrice.value = price;

    setTimeout(() => {
      setChartReady(true);
    }, 0);
  }, [currentPrice]);

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString(
        "en-US",
        { currency: "USD" }
      )}`;
      return formattedValue;
    }

    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    return formattedValue;
  };

  if (sparkline.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
      <View style={styles.wrapper}>
        <View style={styles.upperTitles}>
          <View style={styles.upperLeftTitle}>
            <Image source={{ uri: logoUrl }} style={styles.image} />
            <Text style={styles.subtitle}>
              {name} ({symbol.toUpperCase()})
            </Text>
          </View>
        </View>
        <View style={styles.lowTitle}>
          <Text style={[styles.title, { color: priceChangeColor }]}>
            {priceChangePercent.toFixed(2)}%
          </Text>
        </View>

        { chartReady ?
        (<View style={styles.chartLineWrapper}>
          <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
          <ChartDot style={{ backgroundColor: 'black' }} />
          </View>)

          :

          null
        
        }
      </View>
    </ChartPathProvider>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titlesWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperTitles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#A9ABB1",
  },
  lowTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 19,
  },
});

export default Chart;
