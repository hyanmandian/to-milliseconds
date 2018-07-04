'use strict';

const transformers = {
	days: value => value * 864e5,
	hours: value => value * 36e5,
	minutes: value => value * 6e4,
	seconds: value => value * 1e3,
	milliseconds: value => value,
	microseconds: value => value / 1e3,
	nanoseconds: value => value / 1e6
};

module.exports = object => Object.entries(object).reduce((ms, [key, value]) => {
	if (typeof value !== 'number') {
		throw new TypeError(`Expected a \`number\` for key \`${key}\`, got \`${value}\` (${typeof value})`);
	}

	if (!transformers[key]) {
		throw new Error('Unsupported time key');
	}

	return ms + transformers[key](value);
}, 0);
