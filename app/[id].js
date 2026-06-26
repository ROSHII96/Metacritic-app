import { Link, Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, ActivityIndicator, Image } from "react-native";
import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { getGameDetails } from "../lib/metracritic";
import { Score } from "../components/Score";

export default function Details() {
  //Se llama id, porque asi se llama esta pagina [id].js
  //si tuviera otro nombre pues este cambia
  const { id } = useLocalSearchParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    getGameDetails(id).then(setGame);
  }, [id]);

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#ffee00" },
          headerTintColor: "black",
          headerLeft: () => {},
          headerTitle: `The legend of zelda: Breath of the wild`,
          headerRight: () => {},
        }}
      />
      <View>
        {game === null ? (
          <ActivityIndicator color={"#fff"} size={"large"} />
        ) : (
          <ScrollView>
            <View className="flex-1 items-center justify-center ">
              <Image
                className="mb-4 rounded"
                source={{ uri: game.img }}
                style={{ width: 214, height: 294 }}
              />
              <Score score={game.score} maxScore={100} />
              <Text className="text-center text-2xl font-bold text-white">
                {game.title}
              </Text>
              <Text className="mb-8 mt-4 text-left text-base text-xl text-white/70">
                {game.description}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}
