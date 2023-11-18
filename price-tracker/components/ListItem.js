import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const ListItem = ({ name, symbol, price, priceChangePercent, logoUrl, onPress }) => {
  const priceChangeColor = priceChangePercent > 0 ? "green" : "red";
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemListWrapper}>
        <View style={styles.itemIconContainer}>
          <Image
            source={{
              uri: logoUrl,
            }}
            style={styles.itemImage}
          />
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
          </View>
        </View>

        {/**  */}
        <View style={styles.itemDetails}>
          <Text style={styles.title}>
            ${price.toLocaleString("en-US", { currency: "USD" })}
          </Text>
          <Text style={[styles.subtitle, { color: priceChangeColor }]}>
            {priceChangePercent.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemListWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemDetails: {
    alignItems: "flex-end",
  },
  itemImage: {
    height: 48,
    width: 48,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  titleWrapper: {
    marginLeft: 8,
  }, //
});
export default ListItem;
