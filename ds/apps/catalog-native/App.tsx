import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold, Geist_700Bold } from '@expo-google-fonts/geist'
import { IBMPlexMono_400Regular, IBMPlexMono_600SemiBold, IBMPlexMono_700Bold } from '@expo-google-fonts/ibm-plex-mono'
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold } from '@expo-google-fonts/outfit'
import { themes, type Scheme } from '@gahmp1/ds-theme'
import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { Linking, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { TokensScreen } from './src/TokensScreen'

type SchemeChoice = 'system' | Scheme

export default function App() {
  const [loaded] = useFonts({
    // Gilroy não vem para o catálogo (licença a verificar): Outfit registrada com os nomes do tema swfitness.
    'Gilroy-Regular': Outfit_400Regular,
    'Gilroy-Medium': Outfit_500Medium,
    'Gilroy-SemiBold': Outfit_600SemiBold,
    IBMPlexMono_400Regular,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
  })
  const os = useColorScheme()
  const [name, setName] = useState('swfitness')
  const [choice, setChoice] = useState<SchemeChoice>('system')
  // Deep link ...?theme=somma&scheme=dark abre direto numa combinação (QA reproduzível sem tocar na tela).
  useEffect(() => {
    const apply = (url: string | null) => {
      const q = new URLSearchParams(url?.split('?')[1] ?? '')
      const t = q.get('theme')
      const s = q.get('scheme')
      if (t && themes.some((x) => x.name === t)) setName(t)
      if (s === 'system' || s === 'light' || s === 'dark') setChoice(s)
    }
    Linking.getInitialURL().then(apply)
    const sub = Linking.addEventListener('url', (e) => apply(e.url))
    return () => sub.remove()
  }, [])
  const theme = themes.find((t) => t.name === name) ?? themes[0]
  const scheme: Scheme = choice === 'system' ? (os === 'dark' ? 'dark' : 'light') : choice
  const c = theme.color[scheme]
  if (!loaded) return null

  const chip = (label: string, on: boolean, onPress: () => void) => (
    <Pressable
      key={label}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: on }}
      style={{ paddingHorizontal: theme.density.space.sm, height: theme.density.control.sm, justifyContent: 'center', borderRadius: theme.shape.radius.full, backgroundColor: on ? c.accent : c.surface2 }}
    >
      <Text style={{ color: on ? c.onAccent : c.text, fontSize: theme.type.scale.sm.size }}>{label}</Text>
    </Pressable>
  )

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }} edges={['top']}>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <View style={{ gap: theme.density.space.xs, padding: theme.density.space.md, borderBottomWidth: theme.shape.borderWidth.thin, borderColor: c.borderMuted }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: theme.density.space.xs }}>
            {themes.map((t) => chip(t.name, t.name === name, () => setName(t.name)))}
          </ScrollView>
          <View style={{ flexDirection: 'row', gap: theme.density.space.xs }}>
            {(['system', 'light', 'dark'] as const).map((s) => chip(s, s === choice, () => setChoice(s)))}
          </View>
        </View>
        <TokensScreen theme={theme} scheme={scheme} />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
