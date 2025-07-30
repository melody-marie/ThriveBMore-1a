"use client"

import { useEffect, useRef } from "react"

interface SoundEffectsProps {
  isEnabled: boolean
}

export function SoundEffects({ isEnabled }: SoundEffectsProps) {
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (isEnabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [isEnabled])

  const playTone = (frequency: number, duration = 200, volume = 0.1) => {
    if (!isEnabled || !audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContextRef.current.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration / 1000)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
  }

  const playChord = (frequencies: number[], duration = 500, volume = 0.05) => {
    if (!isEnabled || !audioContextRef.current) return

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playTone(freq, duration, volume)
      }, index * 50)
    })
  }

  const playHealingFrequency = (frequency: number, duration = 3000) => {
    if (!isEnabled || !audioContextRef.current) return

    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    const filter = audioContextRef.current.createBiquadFilter()

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = "sine"

    filter.type = "lowpass"
    filter.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
    filter.Q.setValueAtTime(1, audioContextRef.current.currentTime)

    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.5)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + duration / 1000 - 0.5)
    gainNode.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + duration / 1000)

    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
  }

  const playBinauralBeat = (baseFreq: number, beatFreq: number, duration = 5000) => {
    if (!isEnabled || !audioContextRef.current) return

    // Left ear
    const leftOsc = audioContextRef.current.createOscillator()
    const leftGain = audioContextRef.current.createGain()
    const leftPanner = audioContextRef.current.createStereoPanner()

    leftOsc.connect(leftGain)
    leftGain.connect(leftPanner)
    leftPanner.connect(audioContextRef.current.destination)

    leftOsc.frequency.setValueAtTime(baseFreq, audioContextRef.current.currentTime)
    leftPanner.pan.setValueAtTime(-1, audioContextRef.current.currentTime)
    leftGain.gain.setValueAtTime(0.05, audioContextRef.current.currentTime)

    // Right ear
    const rightOsc = audioContextRef.current.createOscillator()
    const rightGain = audioContextRef.current.createGain()
    const rightPanner = audioContextRef.current.createStereoPanner()

    rightOsc.connect(rightGain)
    rightGain.connect(rightPanner)
    rightPanner.connect(audioContextRef.current.destination)

    rightOsc.frequency.setValueAtTime(baseFreq + beatFreq, audioContextRef.current.currentTime)
    rightPanner.pan.setValueAtTime(1, audioContextRef.current.currentTime)
    rightGain.gain.setValueAtTime(0.05, audioContextRef.current.currentTime)

    leftOsc.start(audioContextRef.current.currentTime)
    rightOsc.start(audioContextRef.current.currentTime)

    leftOsc.stop(audioContextRef.current.currentTime + duration / 1000)
    rightOsc.stop(audioContextRef.current.currentTime + duration / 1000)
  }

  const playNatureSound = (type: "rain" | "ocean" | "forest" | "wind", duration = 10000) => {
    if (!isEnabled || !audioContextRef.current) return

    const bufferSize = audioContextRef.current.sampleRate * (duration / 1000)
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate)
    const data = buffer.getChannelData(0)

    // Generate procedural nature sounds
    for (let i = 0; i < bufferSize; i++) {
      switch (type) {
        case "rain":
          data[i] = (Math.random() * 2 - 1) * 0.1 * Math.sin(i * 0.001)
          break
        case "ocean":
          data[i] = Math.sin(i * 0.01) * 0.1 + (Math.random() * 2 - 1) * 0.05
          break
        case "forest":
          data[i] = (Math.random() * 2 - 1) * 0.05 * (1 + Math.sin(i * 0.0001))
          break
        case "wind":
          data[i] = (Math.random() * 2 - 1) * 0.08 * Math.sin(i * 0.0005)
          break
      }
    }

    const source = audioContextRef.current.createBufferSource()
    const gainNode = audioContextRef.current.createGain()
    const filter = audioContextRef.current.createBiquadFilter()

    source.buffer = buffer
    source.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)

    filter.type = "lowpass"
    filter.frequency.setValueAtTime(2000, audioContextRef.current.currentTime)
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)

    source.start(audioContextRef.current.currentTime)
  }

  // Expose sound functions globally for use by other components
  useEffect(() => {
    if (typeof window !== "undefined") {
      ;(window as any).thriveBMoreSounds = {
        notification: () => playTone(800, 150),
        success: () => playChord([523, 659, 784], 300),
        error: () => playTone(200, 500),
        healingChime: () => playHealingFrequency(432),
        solfeggio528: () => playHealingFrequency(528),
        solfeggio741: () => playHealingFrequency(741),
        binauralAlpha: () => playBinauralBeat(200, 10),
        binauralTheta: () => playBinauralBeat(200, 6),
        binauralDelta: () => playBinauralBeat(200, 2),
        rain: () => playNatureSound("rain"),
        ocean: () => playNatureSound("ocean"),
        forest: () => playNatureSound("forest"),
        wind: () => playNatureSound("wind"),
        emergencyAlert: () => {
          // Emergency alert pattern
          for (let i = 0; i < 3; i++) {
            setTimeout(() => {
              playTone(1000, 200, 0.2)
              setTimeout(() => playTone(800, 200, 0.2), 250)
            }, i * 500)
          }
        },
        spiritualBell: () => {
          // Tibetan singing bowl simulation
          playTone(432, 2000, 0.1)
          setTimeout(() => playTone(648, 1500, 0.08), 200)
          setTimeout(() => playTone(864, 1000, 0.06), 400)
        },
        quantumResonance: () => {
          // Quantum field resonance pattern
          const frequencies = [111, 222, 333, 444, 555, 666, 777, 888, 999]
          frequencies.forEach((freq, index) => {
            setTimeout(() => playTone(freq, 100, 0.05), index * 100)
          })
        },
        azizaContact: () => {
          // Special tone for Aziza's contact number
          playChord([432, 528, 741], 800, 0.08)
          setTimeout(() => {
            playTone(963, 400, 0.06) // 963Hz - Crown Chakra frequency
          }, 500)
        },
      }
    }
  }, [isEnabled])

  return null
}

export default SoundEffects
