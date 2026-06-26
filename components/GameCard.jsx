import {
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
  Pressable,
} from "react-native";
import { useRef, useEffect } from "react";
import { Score } from "./Score";
import { Link } from "expo-router";

export function GameCard({ game }) {
  return (
    <Link href={`/${game.slug}`} asChild>
      <Pressable
        className="rounded-xl border
      border-black bg-gray-500/10 bg-gray-500/10 p-4 p-4 active:border-white/50 active:opacity-70"
      >
        <View className="flex-row gap-4" key={game.slug}>
          <Image source={{ uri: game.image }} style={styles.image} />
          <View className="flex-shrink ">
            <Text className="mb-1" style={styles.title}>
              {game.title}
            </Text>
            <Score score={game.score} maxScore={100} />
            <Text className="mt-2 flex-shrink" style={styles.description}>
              {game.description.slice(0, 100)} ...
            </Text>
            <Text style={styles.publisher}>Editor: {game.publisher}</Text>
            <Text style={styles.genre}>Género: {game.genre}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export function AnimatedGameCard({ game, index }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: index * 250,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

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
