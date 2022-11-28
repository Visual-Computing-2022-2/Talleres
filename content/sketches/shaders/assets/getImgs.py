import requests

for i in range(1,31):
    ans = requests.get(f'https://visualcomputing.github.io/sketches/shaders/paintings/p{i}.jpg')
    with open(f'i{i}.jpg', 'wb') as f:
        f.write(ans.content)