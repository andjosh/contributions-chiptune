'use strict';

//#EEEEEE - 0 (min)
//#D6E685 - 1
//#8CC665 - 2
//#44A340 - 3
//#1E6823 - 4 (max)

(function (freq, delay, waveform, audioContext) {
	'use strict';
    var pleasant,
        freqs,
        levels;

	window.chiptuneAudio = audioContext = audioContext ||
		new (window.AudioContext || window.webkitAudioContext);
	pleasant = [293.66, 329.63, 261.63, 130.81, 196];
	freqs = [
        freq * (3 / 2) * 8,
        freq * (3 / 2) * 4,
        freq * (3 / 2) * 2,
        freq * (3 / 2),
        freq
    ];
	levels = {
        '#eeeeee': freqs[4] || pleasant[4],
        '#d6e685': freqs[3] || pleasant[3],
        '#8cc665': freqs[2] || pleasant[2],
        '#44a340': freqs[1] || pleasant[1],
        '#1e6823': freqs[0] || pleasant[0]
    };

	function createOscillator(fillNodeValue) {
	    var oscillator = audioContext.createOscillator();
		var gainNode = audioContext.createGain();
		gainNode.gain.value = 0.1;
		oscillator.type = waveform;
		oscillator.frequency.value = levels[fillNodeValue];
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		return {
			start: function start() {
				return oscillator.start(0);
			},
			stop: function stop() {
				return oscillator.stop();
			}
		};
	};

	function createNotes(week) {
		return week.map(function (day) {
			var fillNodeValue = day.attributes.fill.nodeValue;
			var oscillator = createOscillator(fillNodeValue);
			return {
				play: function play() {
					day.attributes.fill.nodeValue = 'red';
					oscillator.start();
				},
				stop: function stop() {
					day.attributes.fill.nodeValue = fillNodeValue;
					oscillator.stop();
				}
			};
		});
	};

	function delayPlay(noteBar) {
		return function (iter) {
			setTimeout(function () {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					var _loop = function _loop() {
						var note = _step.value;

						note.play();
						setTimeout(function () {
							note.stop();
						}, delay);
					};

					for (var _iterator = noteBar[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						_loop();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}, delay * iter);
		};
	};

	var noteBars = [].slice.call(document.getElementsByTagName('g'))
    .slice(1).map(function (week) {
		return createNotes([].slice.call(week.getElementsByClassName('day')));
	}).map(function (day) {
		return delayPlay(day);
	});

	var i = 0;
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = noteBars[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var noteBar = _step2.value;

			noteBar(i += 1);
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}
})(432, 110, 'sine', window.chiptuneAudio);
