/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {type PropsWithChildren, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [backgroundActive, setBackgroundActive] = useState(false);
  const [lightsInformation, setLightsInformation] = useState([]);
  const [error, setError] = useState(null);
  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: backgroundActive ? 'red' : 'green',
    height: '100%',
    // display: 'flex',
  };

  const handlePress = async () => {
    setBackgroundActive(true);
    const lightId = 9;
    const hue = 100;
    // const colorString = hue ? `&color=${(hue / 360) * 65535}` : '';

    const colorString = '';
    console.log('clicked');
    const result = await fetch(
      `http://192.168.86.229/api/hue/color-light?lightId=${lightId}${colorString}`,
      {
        mode: 'cors',
        method: 'GET',
      },
    ).catch(e => {
      setError(error);
      console.error(error);
    });

    console.log(result);
  };

  useEffect(() => {
    const getLights = async () => {
      try {
        await fetch(`http://192.168.86.229/api/hue/getall-lights`, {
          mode: 'cors',
          method: 'GET',
        })
          .then(res => res.json())
          .then(({lights}) => {
            const filtered = lights.filter((light: any) => {
              return light.state.reachable && light.state.hue;
            });

            setLightsInformation(filtered);

            // setLightId(filteredLights[0].id);
          })
          .catch(error => {
            console.error(error);
            setError(error);
          });
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    getLights();
  }, []);

  // const handleInPress = async () => {
  //   setBackgroundActive(true);
  // };

  const handleOutPress = () => {
    setBackgroundActive(false);
  };

  const handleLightPress = async (lightId: number) => {
    // TODO
    // http://192.168.86.229/api/hue/toggle-light?lightId=${lightId}
  };

  console.log(error);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        // contentContainerStyle={styles.outer}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            // backgroundColor: isDarkMode ? Colors.black : Colors.white,
            // backgroundColor: 'green',
            justifyContent: 'center',
            // flexGrow: 1,
            flex: 1,
          }}>
          <Pressable
            // onPressIn={handleInPress}
            onPressOut={handleOutPress}
            onPress={handlePress}>
            {({pressed}) => (
              <Text style={styles.highlight}>
                Hello {pressed ? 'pressed' : 'unpressed'}!
              </Text>
            )}
          </Pressable>

          {lightsInformation.map(light => {
            return (
              <Text
                key={light.id}
                style={styles.highlight}
                onPress={() => handleLightPress(light.id)}>
                {light.name} - {light.state.on ? 'on' : 'off'}
              </Text>
            );
          })}

          {/* {error && <Text style={styles.error}>{error}</Text>} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: 'cyan',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontSize: 48,
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default App;
