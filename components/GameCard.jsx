import { Image, StyleSheet, Text, View, Animated } from "react-native";
import { useRef, useEffect } from "react";

export function GameCard({ game }) {
  return (
    <View key={game.slug} style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.image} />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.description}>{game.description}</Text>
      <Text style={styles.publisher}>Editor: {game.publisher}</Text>
      <Text style={styles.genre}>Género: {game.genre}</Text>
    </View>
  );
}

export function AnimatedGameCard({ game, index }) {
const opacity = useRef(new Animated.Value(0)).current
useEffect(() => {
  Animated.timing(opacity, {
    toValue: 1,
    duration: 1000,
    delay: index * 250,
    useNativeDriver: true
  }).start();
  }, [opacity, index])

  return (
    <Animated.View style={{ opacity }}>
      <GameCard game={game} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  list: {
    alignItems: "center",
    paddingBottom: 24,
  },
  card: {
    marginBottom: 42,
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  publisher: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  genre: {
    fontSize: 12,
    color: "yellow",
    marginTop: 10,
  },
  description: {
    fontSize: 10,
    color: "blue",
    marginTop: 10,
  },
  info: {
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    color: "#ffd6d6",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 16,
  },
});