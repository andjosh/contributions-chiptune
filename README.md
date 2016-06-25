# contributions-chiptune
What does your contributions graph sound like? Find out with this script! It works iterating through the contributions graph one week at a time and assigning each day of the week a frequency based on its color value. The frequencies for the week are then overlayed and played by a Web Audio API oscillator, creating a neat chiptune.

##How to use
1. Navigate to your git profile page and open up the dev console.
2. Paste [`makenoise.js`](https://raw.githubusercontent.com/andjosh/contributions-chiptune/master/makenoise.js) into the console.
3. Lower your volume a lil' bit.
3. Press enter if you haven't already.

You can also change up the charasteristics of the chiptune via its function arguments found on the last line.

`(audioContext, freq, delay, waveform)`
- audioContext: Actually, you can't change this one
- freq: The fundamental frequency. Higher number = higher pitch
- delay: The time in `ms` between notes. Up is faster
- waveform: The type of waveform oscillators generate. Proper values are `sine`, `square`, `sawtooth`, and `triangle`


