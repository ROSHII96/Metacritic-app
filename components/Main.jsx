import { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getLatestGames } from "../lib/metracritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";
import { Link } from "expo-router";

import { CircleInfoIcon } from "./Icons";
import { styled } from "nativewind";
import { Screen } from "../components/Screen";

export function Main() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames()
      .then((games) => {
        setGames(Array.isArray(games) ? games : []);
      })
      .catch((err) => {
        setError(err?.message || "No se pudieron cargar los juegos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Screen>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </Screen>
  );
}
