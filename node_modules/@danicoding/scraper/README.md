# Scraper
Free scraper for WhatsApp bot or REST API

## Installing
### Using npm
```bash
$ npm i @danicoding/scraper
```
### Using yarn
```bash
$ yarn add @danicoding/scraper
```

## Example code
### Import
```javascript
const scraper = require("@danicoding/scraper")
```

### Usage
```javascript
$print = console.log

const q = "Dani Coding"

if (!q) $print("Params not found!")
scraper.downloader.youtube.playaudio(q)
.then(data => {
  let res = data
  if (!res) $print("Data not found!")
  $print(data)
})
```

### Output
```javascript
{
  title: 'Cara membuat bot WhatsApp menggunakan node.js & termux terbaru | Dani Coding',
  thumb: 'https://i.ytimg.com/vi/rz03XDsmGSg/maxresdefault.jpg',
  channel: 'Dani Coding',
  published: '2022-11-10',
  views: '892',
  url: 'https://rr4---sn-uigxxi0ujipnvo-jb36.googlevideo.com/videoplayback?expire=1682438325&ei=VaRHZJDGKtjqz7sPhruLuAs&ip=116.206.8.36&id=o-AD0YAZ0LfN2fshzOnE2W1HPOM1zpxup2iSRMJ7_GME9y&itag=251&source=youtube&requiressl=yes&mh=tc&mm=31%2C29&mn=sn-uigxxi0ujipnvo-jb36%2Csn-npoe7nes&ms=au%2Crdu&mv=m&mvi=4&pl=24&initcwndbps=256250&vprv=1&mime=audio%2Fwebm&ns=dO3khMeJbQCiR5nAe1uMsiIM&gir=yes&clen=3680702&dur=238.121&lmt=1668110943850076&mt=1682416375&fvip=3&keepalive=yes&fexp=24007246&c=WEB&txp=6211224&n=lZX3diz5Cu1PuA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgCWDaYHv_Y_GqWuDJ-0C19gvL6NU-32fgXzqOhcc3qeoCICZVgH04PF4hXCbiZsQm5aVcRw1lEg-0ZyI35NpD_P7x&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAPIl-JQrqPyw1_xqkckNzo423kuk4Pv1jOKY5fiT9L70AiEAm49gqf60NHUewDMg5w62ilpAGVLaPlDX5_DHeAXrDeg%3D'
}
```

### Example code using JavaScript
<a href="https://raw.githubusercontent.com/danikoding/scraper/main/example.js">example.js</a>

## List features
### Downloader
<ul>
  <li>YouTube Audio: scraper.downloader.youtube.audio</li>
  <li>YouTube Video: scraper.downloader.youtube.video</li>
  <li>YouTube Play Audio: scraper.downloader.youtube.playaudio</li>
  <li>YouTube Play Video: scraper.downloader.youtube.playvideo</li>
  <li>Facebook: scraper.downloader.facebook</li>
  <li>Instagram: scraper.downloader.instagram</li>
  <li>Twitter: scraper.downloader.twitter</li>
  <li>TikTok: scraper.downloader.tiktok</li>
  <li>Mediafire: scraper.downloader.mediafire</li>
  <li>SfileMobi: scraper.downloader.sfilemobi</li>
  <li>SoundCloud: scraper.downloader.soundcloud</li>
</ul>

### Search
<ul>
  <li>YouTube: scraper.search.youtube</li>
</ul>

### PhotoOxy
<ul>
  <li>PhotoOxy: scraper.photooxy</li>
</ul>

### TextPro
<ul>
  <li>TextPro: scraper.textpro</li>
</ul>

## Cape ngetik, cek aja semua fiturnya di file: /lib/index.js
