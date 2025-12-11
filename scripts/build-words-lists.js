import {hasSomeKatakana} from 'asian-regexps'
import fs from 'node:fs'
import pathlib from 'path'
import collections from '../../jp-synonymes-dex/public/collections.json' with {type: 'json'}

const __dirname = import.meta.dirname

const punctuations = [
	// Ponctuation romane
	'[',
	'(',
	'.',
	',',
	'!',
	'?',
	'-',
	'_',
	' ',
	// Ponctuation japonaise
	'、',
	'。',
	'・',
	'･',
	'「',
	'」',
	'『',
	'』',
	'？',
	'！',
	'〜',
	'ー',
	'々',
	'※',
	'　',
]
const hasNumber = /0|1|2|3|4|5|6|7|8|9|０|１|２|３|４|５|６|７|８|９/

const lengthFilter = 10

const allItems = [
	...new Set(
		collections
			.flatMap((c) => {
				return c.items
			})
			.filter((item) => {
				if (punctuations.some((p) => item.includes(p))) return false
				if (item.length >= lengthFilter) {
					// if (item.length === lengthFilter) console.log(item)
					return false
				}
				if (hasNumber.test(item)) return false
				if (hasSomeKatakana(item)) return false
				return true
			}),
	),
]

console.log('Final length:', allItems.length)

fs.writeFileSync(
	pathlib.join(__dirname, '../jp-words.json'),
	JSON.stringify(allItems),
)
