import { Activity, useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";
import { getLatestGames } from "../lib/metracritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";

export function Main() {
  const [games, setGames] = useState([]);
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
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <Logo />
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => <AnimatedGameCard game={item} index={index} />}
        />
      )}
    </View>
  );
}
