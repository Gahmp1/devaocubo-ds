import { Stack, Text, TextField } from '@gahmp1/ds-web'
import { GlowBorder } from '@gahmp1/ds-web/motion'
import type { Meta, StoryObj } from '@storybook/react-native-web-vite'
import { useState } from 'react'

const meta: Meta = { title: 'Movimento/GlowBorder' }
export default meta

const pad = { padding: 48 } as const
const box = { padding: 24, borderRadius: 'var(--ds-radius-lg)', background: 'var(--ds-color-surface1)' } as const

/** Ativo gira em `ai.beamPeriodMs` do tema; movimento reduzido (barra Movimento) deixa a borda estática. */
export const AtivoEInativo: StoryObj = {
  render: () => (
    <Stack direction="row" gap="xxxl" style={pad}>
      {[true, false].map((active) => (
        <Stack key={String(active)} gap="md" align="center">
          <GlowBorder active={active}>
            <div style={box}>
              <Text>{active ? 'ativo' : 'inativo'}</Text>
            </div>
          </GlowBorder>
        </Stack>
      ))}
    </Stack>
  ),
}

export const EntrandoESaindo: StoryObj = {
  render: function Render() {
    const [active, setActive] = useState(false)
    return (
      <Stack gap="lg" style={pad}>
        <GlowBorder active={active}>
          <button type="button" onClick={() => setActive((a) => !a)} style={{ ...box, border: 0, font: 'inherit', color: 'var(--ds-color-text)' }}>
            {active ? 'Desligar' : 'Ligar'}
          </button>
        </GlowBorder>
      </Stack>
    )
  },
}

export const SobreTextField: StoryObj = {
  render: function Render() {
    const [value, setValue] = useState('')
    const [focused, setFocused] = useState(false)
    return (
      <div style={pad} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
        <GlowBorder active={focused} radius="xl">
          <TextField label="Pergunte à IA" value={value} onChangeText={setValue} />
        </GlowBorder>
      </div>
    )
  },
}

export const Periodo: StoryObj = {
  render: () => (
    <Stack direction="row" gap="xxxl" style={pad}>
      {[1500, 4000].map((periodMs) => (
        <Stack key={periodMs} gap="md" align="center">
          <GlowBorder active periodMs={periodMs}>
            <div style={box}>
              <Text variant="xs" color="textMuted">{periodMs} ms</Text>
            </div>
          </GlowBorder>
        </Stack>
      ))}
    </Stack>
  ),
}
