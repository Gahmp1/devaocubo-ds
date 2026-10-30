// Gera packages/native/assets/sounds/*.wav (PCM 16 bits, mono, 44,1 kHz) a partir das receitas do ds-core.
// Roda no `build` do ds-native, depois do ds-core compilado. Os arquivos estão no .gitignore.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SOUND_ATTACK_MS, SOUND_FILTER_HZ, SOUND_RECIPES } from '../packages/core/dist/sound.js'

const RATE = 44100
const out = fileURLToPath(new URL('../packages/native/assets/sounds/', import.meta.url))
const FLOOR = 0.0001 // o "zero" do envelope exponencial, como no Web Audio

const osc = { sine: Math.sin, triangle: (p) => (2 / Math.PI) * Math.asin(Math.sin(p)), square: (p) => (Math.sin(p) >= 0 ? 1 : -1) }

/** Soma as notas num buffer: oscilador com glissando exponencial, envelope exponencial (ataque de SOUND_ATTACK_MS) e passa-baixa de um polo. */
function render(notes) {
  const total = Math.max(...notes.map((n) => (n.at ?? 0) + n.ms))
  const buf = new Float64Array(Math.ceil((total / 1000) * RATE) + 64)
  const k = 1 - Math.exp((-2 * Math.PI * SOUND_FILTER_HZ) / RATE)
  for (const n of notes) {
    const start = Math.round(((n.at ?? 0) / 1000) * RATE)
    const len = Math.round((n.ms / 1000) * RATE)
    const att = (SOUND_ATTACK_MS / 1000) * RATE
    let phase = 0
    let lp = 0
    for (let i = 0; i < len; i++) {
      const f = n.to ? n.f * (n.to / n.f) ** (i / len) : n.f
      phase += (2 * Math.PI * f) / RATE
      const env = i < att ? FLOOR * (n.g / FLOOR) ** (i / att) : n.g * (FLOOR / n.g) ** ((i - att) / (len - att))
      lp += k * (osc[n.wave](phase) * env - lp)
      buf[start + i] += lp
    }
  }
  return buf
}

function wav(samples) {
  const data = Buffer.alloc(samples.length * 2)
  samples.forEach((v, i) => data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), i * 2))
  const h = Buffer.alloc(44)
  h.write('RIFF', 0)
  h.writeUInt32LE(36 + data.length, 4)
  h.write('WAVEfmt ', 8)
  h.writeUInt32LE(16, 16) // tamanho do bloco fmt
  h.writeUInt16LE(1, 20) // PCM
  h.writeUInt16LE(1, 22) // mono
  h.writeUInt32LE(RATE, 24)
  h.writeUInt32LE(RATE * 2, 28)
  h.writeUInt16LE(2, 32)
  h.writeUInt16LE(16, 34)
  h.write('data', 36)
  h.writeUInt32LE(data.length, 40)
  return Buffer.concat([h, data])
}

mkdirSync(out, { recursive: true })
for (const [name, notes] of Object.entries(SOUND_RECIPES)) writeFileSync(join(out, `${name}.wav`), wav(render(notes)))
console.log(`sons: ${Object.keys(SOUND_RECIPES).length} .wav em packages/native/assets/sounds`)
