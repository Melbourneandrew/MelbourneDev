import json

f = open('1000words.txt', 'r+')
lines = [line for line in f.readlines()]
f.close()

words = []
for line in lines:
    words.append(line.strip("\n"))

j = json.dumps(words)

with open("1000words.json", 'w') as outfile:
    json.dump(words, outfile)
